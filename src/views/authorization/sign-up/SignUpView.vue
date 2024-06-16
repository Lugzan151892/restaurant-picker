<template>
	<AuthLayout
		title="Зарегистрироваться"
		:action-func="createUser"
		action-text="Сохранить и продолжить"
		:action-disabled="!isValid"
	>
		<form>
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
import { ref } from 'vue';
import RInput from '@/components/ui/RInput.vue';
import { useAuth } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import AuthLayout from '@/views/authorization/components/AuthLayout.vue';
import { EVALIDATION_FIELDS, useValidation } from '@/utils/validation';

const className = 'sign-up-view';

const router = useRouter();
const authStore = useAuth();

const isValid = ref(true);
const emailView = ref(true);

const userData = ref({
	username: '',
	email: '',
	phone: '',
});

const errors = ref({
	username: '',
	email: '',
	phone: '',
});

const createUser = () => {
	const data = {
		username: userData.value.username,
		...(emailView.value ? { email: userData.value.email } : { phone: userData.value.phone }),
	};
	const validation = useValidation(data);
	isValid.value = validation.isValid;

	if (!validation.isValid) {
		Object.assign(errors.value, validation.errors);
		return;
	}

	authStore.setUser(userData.value.username, userData.value.email, userData.value.phone);

	if (authStore.user.isAuth) {
		router.push({ name: 'restaurants' });
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
$component: sign-up-view;
.#{$component} {
	&-login {
		color: var(--main-color);
	}
}
</style>
