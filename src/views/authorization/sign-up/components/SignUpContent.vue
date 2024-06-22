<template>
	<AuthLayout
		title="Зарегистрироваться"
		:action-func="createUser"
		action-text="Сохранить и продолжить"
		:action-disabled="!isValid"
	>
		<form @submit.prevent>
			<RInput
				class="r-mb-16"
				placeholder="Введите имя"
				:error="errors.username"
				v-model="userData.username"
				@input="clearError(EVALIDATION_FIELDS.USERNAME)"
			/>
			<RInput
				placeholder="Введите пароль"
				class="r-mb-16"
				v-model="password"
			/>
			<RInput
				v-if="emailView"
				class="r-mb-16"
				placeholder="Введите e-mail"
				:error="errors.email"
				v-model="userData.email"
				@input="clearError(EVALIDATION_FIELDS.EMAIL)"
			/>
			<RInput
				v-else
				placeholder="Введите номер телефона"
				:error="errors.phone"
				v-model="userData.phone"
				@input="clearError(EVALIDATION_FIELDS.PHONE)"
			/>
			<div
				:class="$style[`${className}-login`]"
				class="r-pointer r-link r-my-16 r-wp-100 r-text--center"
				@click="emailView = !emailView"
			>
				{{ emailView ? 'Войти по номеру телефона?' : 'Войти через e-mail?' }}
			</div>
			<div class="r-mt-10 r-text--center">
				Уже зарегистрированы?
				<span
					:class="$style[`${className}-login`]"
					class="r-pointer r-link"
					@click="handleLogin"
				>
					Войти.
				</span>
			</div>
			<RButton
				text="test login"
				@click="handleLoginTest()"
			/>

			<RButton
				text="test auth"
				@click="handleAuthTest()"
			/>
		</form>
	</AuthLayout>
</template>

<script lang="ts" setup>
import { useAuth } from '@/stores/authStore';
import { type IErrorObject, useValidation, EVALIDATION_FIELDS } from '@/utils/validation';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthLayout from '@/views/authorization/components/AuthLayout.vue';
import RInput from '@/components/ui/RInput.vue';
import RButton from '@/components/ui/RButton.vue';

const className = 'sign-up-content';

const emit = defineEmits(['send-code']);

const router = useRouter();
const authStore = useAuth();

const isValid = ref(true);
const emailView = ref(true);

const userData = ref<IErrorObject>({
	username: 'testUsernaem',
	email: 'adasdad@gmail.com',
	phone: '',
});

const password = ref('aasdsadadasdasdadad');

const errors = ref<IErrorObject>({
	username: '',
	email: '',
	phone: '',
});

const createUser = async () => {
	const data = {
		username: userData.value.username,
		...(emailView.value ? { email: userData.value.email } : { phone: userData.value.phone }),
	} as IErrorObject;
	const validation = useValidation(data);
	isValid.value = validation.isValid;

	if (!validation.isValid) {
		Object.assign(errors.value, validation.errors);
		return;
	}
	const test = await fetch('http://localhost:8080/api/user/all');
	console.log(test);
	const response = await fetch('http://localhost:8080/api/user/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			userName: userData.value.username,
			email: userData.value.email,
			password: password.value,
		}),
	});

	const result = await response.json();

	if (result.access_token) {
		localStorage.setItem('access_token', result.access_token);
	}

	if (result.data.refreshToken) {
		localStorage.setItem('refresh_token', result.data.refreshToken);
	}

	console.log(result);

	// authStore.setUser(userData.value.username, userData.value.email, userData.value.phone);

	if (emailView.value) {
		emit('send-code', true);
		console.log('email');
	}

	// if (authStore.user.isAuth) {
	// 	router.push({ name: 'restaurants' });
	// }
};

const clearError = (field: EVALIDATION_FIELDS) => {
	isValid.value = true;
	errors.value[field] = '';
};

const handleLoginTest = async () => {
	const response = await fetch('http://localhost:8080/api/user/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			userName: userData.value.username,
			password: password.value,
		}),
	});

	const result = await response.json();

	if (result.access_token) {
		localStorage.setItem('access_token', result.access_token);
	}

	console.log(result);
};

const handleAuthTest = async () => {
	const accessToken = localStorage.getItem('access_token');

	if (accessToken) {
		const response = await fetch('http://localhost:8080/api/user/checkLogin', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken,
			},
		});
		const result = await response.json();

		console.log(result);
	}
};

const handleLogin = () => {
	router.push({ name: 'login' });
};
</script>

<style lang="scss" module>
$component: 'sign-up-content';
.#{$component} {
	&-login {
		color: var(--main-color);
	}
}
</style>
