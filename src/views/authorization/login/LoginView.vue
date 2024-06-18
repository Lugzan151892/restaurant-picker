<template>
	<AuthLayout
		title="Войти"
		action-text="Войти"
		:action-func="handleLogin"
	>
		<form>
			<RInput
				class="r-mb-16"
				placeholder="Введите e-mail"
				v-model="email"
			/>
			<RInput
				class="r-mb-16"
				placeholder="Введите пароль"
				v-model="password"
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
		</form>
	</AuthLayout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/stores/authStore';
import AuthLayout from '@/views/authorization/components/AuthLayout.vue';
import RInput from '@/components/ui/RInput.vue';

const className = 'login-view';
const authStore = useAuth();
const router = useRouter();

const email = ref('');
const password = ref('');

const goToSignup = () => {
	router.push({ name: 'signup' });
};

const handleLogin = () => {
	authStore.user.email = email.value;
	authStore.user.isAuth = true;
	router.push({ name: 'restaurants' });
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
