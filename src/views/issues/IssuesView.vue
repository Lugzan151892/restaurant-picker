<template>
	<div :class="$style[className]">
		<h1
			class="r-mt-16"
			:class="$style[`${className}-title`]"
		>
			Нашли ошибку на сайте? Создайте задачу и она будет исправлена.
		</h1>
		<div
			class="r-mt-16"
			:class="$style[`${className}-issues`]"
		>
			<h2>Созданные задачи:</h2>
			<div
				:class="$style[`${className}-issues--empty`]"
				v-if="!issuesStore.issues.length"
			>
				Задачи не найдены. Вы можете создать задачу нажатием на кнопку ниже
			</div>
		</div>

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
import { ref } from 'vue';
import { useAuth } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import RButton from '@/components/ui/RButton.vue';
import IssueModal from '@/views/issues/components/IssueModal.vue';
import { useIssues } from '@/views/issues/store';

const className = 'issues-view';

const authStore = useAuth();
const issuesStore = useIssues();
const router = useRouter();

const issueModal = ref(false);

const handleCreateOrLogin = () => {
	if (authStore.user.isAuth) {
		issueModal.value = true;
	} else {
		router.push('/login');
	}
};
</script>

<style lang="scss" module>
$component: 'issues-view';
.#{$component} {
	position: relative;

	&-title {
		font-size: 24px;
		color: var(--main-color);
	}
	&-issues {
		color: var(--main-color);
		&--empty {
			display: grid;
			height: 40vh;
			align-content: center;
			text-align: center;
			color: var(--color-text);
			font-weight: 600;
		}
	}
	&-new {
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
