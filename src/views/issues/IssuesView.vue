<template>
	<div :class="$style[className]">
		content tut issues

		<RButton
			class="r-h-30"
			:class="$style[`${className}-new`]"
			:text="authStore.user.isAuth ? 'Новая ошибка' : 'Войти'"
			@click="handleCreateOrLogin"
		/>
		<IssueModal v-model="issueModal" />
	</div>
</template>

<script lang="ts" setup>
import RButton from '@/components/ui/RButton.vue';
import IssueModal from '@/views/issues/components/IssueModal.vue';
import { useAuth } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const className = 'issues-view';

const authStore = useAuth();
const router = useRouter();

const issueModal = ref(true);

const handleCreateOrLogin = () => {
	if (authStore.user.isAuth) {
		console.log('create');
	} else {
		router.push('/login');
	}
};
</script>

<style lang="scss" module>
$component: 'issues-view';
.#{$component} {
	position: relative;
	&-new {
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
