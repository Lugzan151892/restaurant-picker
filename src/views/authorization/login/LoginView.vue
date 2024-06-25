<template>
	<AuthLayout
		title="Войти"
		action-text="Войти"
		:action-func="handleLogin"
	>
		<div>
			<RInput
				class="r-mb-16"
				placeholder="Введите имя пользователя"
				:error="errors.username"
				v-model="userData.username"
				@input="clearError(ELOGIN_FIELDS.USERNAME)"
			/>
			<RInput
				class="r-mb-16"
				placeholder="Введите пароль"
				:error="errors.password"
				v-model="userData.password"
				@input="clearError(ELOGIN_FIELDS.PASSWORD)"
			/>
			<div class="r-mt-10 r-text--center">
				Нет аккаунта?
				<span
					:class="$style[`${className}-login`]"
					class="r-pointer r-link"
					@click="goToSignup"
				>
					Зарегистрироваться.
				</span>
			</div>
		</div>
	</AuthLayout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/stores/authStore';
import AuthLayout from '@/views/authorization/components/AuthLayout.vue';
import RInput from '@/components/ui/RInput.vue';
import { useValidation, ELOGIN_FIELDS, type IErrorObject } from '@/utils/validation';

const className = 'login-view';
const authStore = useAuth();
const router = useRouter();
const isValid = ref(true);

const userData = ref<IErrorObject<ELOGIN_FIELDS>>({
	username: '',
	password: '',
});

const errors = ref<IErrorObject<ELOGIN_FIELDS>>({
	username: '',
	password: '',
});

const goToSignup = () => {
	router.push({ name: 'signup' });
};

const clearError = (field: ELOGIN_FIELDS) => {
	isValid.value = true;
	errors.value[field] = '';
};

const handleLogin = async () => {
	const data = {
		username: userData.value.username,
		password: userData.value.password,
	} as IErrorObject<ELOGIN_FIELDS>;
	const validation = useValidation(data);
	isValid.value = validation.isValid;

	if (!validation.isValid) {
		Object.assign(errors.value, validation.errors);
		return;
	}

	const result = await authStore.login(userData.value.username, userData.value.password);

	if (result) {
		router.push({ name: 'restaurants' });
	}
};
</script>
<style lang="scss" module>
$component: 'login-view';

.#{$component} {
	&-login {
		color: var(--main-color);
	}
}
</style>
