<template>
	<RModal
		v-model="opened"
		prevent-close
		:title="isEdit ? 'Изменить заявку на ошибку' : 'Создать задачу на ошибку'"
	>
		<div
			class="r-p-16"
			:class="$style[className]"
		>
			<RLabel
				label-id="title"
				caption="Название ошибки"
			>
				<RInput
					id="title"
					v-model="issueData.title"
				/>
			</RLabel>

			<RLabel
				label-id="description"
				class="r-mt-16"
				caption="Описание ошибки"
			>
				<RInput
					id="description"
					v-model="issueData.description"
				/>
			</RLabel>
			<RLabel
				class="r-mt-16"
				caption="Приоритет ошибки"
			>
				<RSelect
					:items="selectList"
					v-model="issueData.priority"
				/>
			</RLabel>
		</div>
		<template #footer>
			<div class="r-wp-100 r-grid r-my-8">
				<RButton
					class="r-h-30"
					:text="isEdit ? 'Изменить' : 'Создать'"
					@click="$emit('change-issue', issueData)"
				/>
			</div>
		</template>
	</RModal>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { EISSUE_PRIORITY } from '@/views/issues/interfaces';
import { getIssuePriorityText } from '../utils';

const className = 'issue-modal';

const opened = defineModel({ default: false });

defineEmits(['change-issue']);
const props = withDefaults(
	defineProps<{
		isEdit?: boolean;
		issue?: ISSUE.IIssue | null;
	}>(),
	{
		isEdit: false,
		issue: null,
	},
);

const issueData = ref<ISSUE.TIssueCreated>({
	id: 0,
	title: 'test api 1',
	description: 'test api 1',
	priority: EISSUE_PRIORITY.DEFAULT,
});

const selectList = [
	{
		id: EISSUE_PRIORITY.URGENT,
		text: getIssuePriorityText(EISSUE_PRIORITY.URGENT),
	},
	{
		id: EISSUE_PRIORITY.DEFAULT,
		text: getIssuePriorityText(EISSUE_PRIORITY.DEFAULT),
	},
	{
		id: EISSUE_PRIORITY.UNIMPORTANT,
		text: getIssuePriorityText(EISSUE_PRIORITY.UNIMPORTANT),
	},
];

onMounted(() => {
	if (props.isEdit && props.issue) {
		Object.assign(issueData.value, props.issue);
	}
});
</script>

<style lang="scss" module>
$component: 'issue-modal';
.#{$component} {
}
</style>
