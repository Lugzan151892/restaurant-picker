<template>
	<AuthLayout
		title="Зарегистрироваться"
		:action-func="createUser"
		action-text="Сохранить и продолжить"
	>
		<form>
			<RInput
				class="r-mb-16"
				placeholder="Введите имя"
				v-model="name"
			/>
			<RInput
				class="r-mb-16"
				placeholder="Введите e-mail"
				v-model="email"
			/>
			<RInput
				placeholder="Введите номер телефона"
				v-model="phone"
			/>
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

const className = 'sign-up-view';

const router = useRouter();
const authStore = useAuth();

const name = ref('');
const email = ref('');
const phone = ref('');

const createUser = () => {
	if (!name.value || !email.value) {
		return;
	}

	authStore.setUser(name.value, email.value, phone.value);

	if (authStore.user.isAuth) {
		router.push({ name: 'restaurants' });
	}
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
