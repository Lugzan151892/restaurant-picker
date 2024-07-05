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
			<div
				v-else
				class="r-pr-16"
			>
				<IssueGroup
					:status="EISSUE_STATUS.WAITING"
					:issues="waitingIssues"
					@delete="handleDeleteIssue($event)"
					@edit="handleEditIssue($event)"
					@open-issue="handleOpenIssue($event)"
				/>
				<IssueGroup
					:status="EISSUE_STATUS.IN_PROGRESS"
					:issues="inProgressIssues"
					@delete="handleDeleteIssue($event)"
					@edit="handleEditIssue($event)"
					@open-issue="handleOpenIssue($event)"
				/>
				<IssueGroup
					:status="EISSUE_STATUS.COMPLETED"
					:issues="completedIssues"
					@delete="handleDeleteIssue($event)"
					@edit="handleEditIssue($event)"
					@open-issue="handleOpenIssue($event)"
				/>
			</div>
		</div>

		<RButton
			class="r-h-30"
			:class="$style[`${className}-new`]"
			:text="authStore.user.isAuth ? 'Новая ошибка' : 'Войти'"
			@click="handleCreateOrLogin"
		/>
		<IssueCreateModal
			v-if="issueCreateModal"
			:is-edit="isEditModal"
			:issue="currentIssue"
			v-model="issueCreateModal"
			@change-issue="handleUpdateIssue($event)"
		/>
		<IssueItemModal
			v-if="currentIssue"
			:issue="currentIssue"
			v-model="issueViewModal"
		/>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useAuth } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import IssueCreateModal from '@/views/issues/components/IssueCreateModal.vue';
import IssueItemModal from '@/views/issues/components/IssueItemModal.vue';
import { useIssues } from '@/views/issues/store';
import { EISSUE_STATUS } from '@/views/issues/interfaces';
import IssueGroup from '@/views/issues/components/IssueGroup.vue';

const className = 'issues-view';

const authStore = useAuth();
const issuesStore = useIssues();
const router = useRouter();

const issueCreateModal = ref(false);
const isEditModal = ref(false);
const issueViewModal = ref(false);
const currentIssue = ref<ISSUE.IIssue | null>(issuesStore.issues[0]);

const waitingIssues = computed(() =>
	issuesStore.issues.filter((issue) => issue.status === EISSUE_STATUS.WAITING),
);
const inProgressIssues = computed(() =>
	issuesStore.issues.filter((issue) => issue.status === EISSUE_STATUS.IN_PROGRESS),
);
const completedIssues = computed(() =>
	issuesStore.issues.filter((issue) => issue.status === EISSUE_STATUS.COMPLETED),
);

const handleOpenIssue = (issueId: number) => {
	const clickedIssue = issuesStore.issues.find((issue) => issue.id === issueId);

	if (clickedIssue) {
		currentIssue.value = clickedIssue;
		issueViewModal.value = true;
	}
};

const handleDeleteIssue = (issueId: number) => {
	issuesStore.deleteIssue(issueId);
};

const handleEditIssue = (issueId: number) => {
	const clickedIssue = issuesStore.issues.find((issue) => issue.id === issueId);

	if (clickedIssue) {
		currentIssue.value = clickedIssue;
		isEditModal.value = true;
		issueCreateModal.value = true;
	}
};

const handleCreateOrLogin = () => {
	if (authStore.user.isAuth) {
		isEditModal.value = false;
		issueCreateModal.value = true;
	} else {
		router.push('/login');
	}
};

const handleUpdateIssue = async (data: ISSUE.TIssueCreated) => {
	try {
		if (isEditModal.value) {
			issuesStore.editIssue(data);
		} else {
			issuesStore.createIssue(data);
		}
	} catch (err: any) {
		console.log(err);
	}
};

issuesStore.getIssuesList();
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
