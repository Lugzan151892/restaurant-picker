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
			<RInput
				placeholder="Введите пароль"
				class="r-mb-16"
				v-model="userData.password"
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

const className = 'sign-up-content';

const router = useRouter();
const authStore = useAuth();

const isValid = ref(true);
const emailView = ref(true);

const userData = ref<IErrorObject<EVALIDATION_FIELDS>>({
	username: '',
	email: '',
	phone: '',
	password: '',
});

const errors = ref<IErrorObject<EVALIDATION_FIELDS>>({
	username: '',
	email: '',
	phone: '',
	password: '',
});

const createUser = async () => {
	const data = {
		username: userData.value.username,
		password: userData.value.password,
		...(emailView.value ? { email: userData.value.email } : { phone: userData.value.phone }),
	} as IErrorObject<EVALIDATION_FIELDS>;
	const validation = useValidation(data);
	isValid.value = validation.isValid;

	if (!validation.isValid) {
		Object.assign(errors.value, validation.errors);
		return;
	}

	const signUpResult = await authStore.registerNewUser(
		userData.value.username,
		userData.value.email,
		userData.value.password,
	);

	if (signUpResult) {
		router.push('/');
	}
};

const clearError = (field: EVALIDATION_FIELDS) => {
	isValid.value = true;
	errors.value[field] = '';
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
