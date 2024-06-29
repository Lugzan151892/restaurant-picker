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
					v-model="issueTitle"
				/>
			</RLabel>

			<RLabel
				label-id="description"
				class="r-mt-16"
				caption="Описание ошибки"
			>
				<RInput
					id="description"
					v-model="issueDescription"
				/>
			</RLabel>
			<RLabel
				class="r-mt-16"
				caption="Приоритет ошибки"
			>
				<RSelect
					:items="selectList"
					v-model="issuePriority"
				/>
			</RLabel>
		</div>
		<template #footer>
			<div class="r-wp-100 r-grid r-my-8">
				<RButton
					class="r-h-30"
					:text="isEdit ? 'Изменить' : 'Создать'"
				/>
			</div>
		</template>
	</RModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import RModal from '@/components/ui/RModal.vue';
import RLabel from '@/components/ui/RLabel.vue';
import RInput from '@/components/ui/RInput.vue';
import RButton from '@/components/ui/RButton.vue';
import RSelect from '@/components/ui/RSelect.vue';
import { EISSUE_PRIORITY } from '@/views/issues/interfaces';
import { getIssuePriorityText } from '../utils';

const className = 'issue-modal';

const opened = defineModel({ default: false });

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

const issueTitle = ref(props.isEdit && props.issue ? props.issue.title : '');
const issueDescription = ref(props.isEdit && props.issue ? props.issue.description : '');
const issuePriority = ref<EISSUE_PRIORITY>(
	props.isEdit && props.issue ? props.issue.priority : EISSUE_PRIORITY.DEFAULT,
);

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
</script>

<style lang="scss" module>
$component: 'issue-modal';
.#{$component} {
}
</style>
