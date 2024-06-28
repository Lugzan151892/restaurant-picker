<template>
	<RModal
		v-model="opened"
		prevent-close
		title="Задача"
	>
		<div
			class="r-px-24"
			:class="$style[className]"
		>
			<div
				class="r-mt-16 r-mb-24"
				:class="$style[`${className}-title`]"
			>
				<h2
					class="r-mb-8"
					:class="$style[`${className}-title--caption`]"
				>
					Название:
				</h2>
				<div>
					{{ issue.title }}
				</div>
			</div>
			<div class="r-mb-8">
				<h2 class="r-mb-4">Описание</h2>
				<div>
					{{ issue.description }}
				</div>
			</div>
			<div class="r-mb-8">
				<h2 class="r-mb-4">Статус:</h2>
				<div :style="{ color: statusColor }">
					{{ statusText }}
				</div>
			</div>
			<div class="r-mb-24">
				<h2 class="r-mb-4">Приоритет:</h2>
				<div :style="{ color: priorityColor }">
					{{ priorityText }}
				</div>
			</div>
		</div>
		<template #footer>
			<div class="r-wp-100 r-grid r-grid-row r-h-30 r-my-8">
				<RButton text="Изменить" />
				<RButton text="Удалить" />
			</div>
		</template>
	</RModal>
	<div :class="$style[className]">content</div>
</template>

<script lang="ts" setup>
import RModal from '@/components/ui/RModal.vue';
import {
	getIssuePriorityColors,
	getIssuePriorityText,
	getIssueStatusColors,
	getIssueStatusText,
} from '@/views/issues/utils';
import RButton from '@/components/ui/RButton.vue';
import { computed } from 'vue';

const componentName = 'IssueItemModal';
const className = 'issue-item-modal';

const opened = defineModel({ default: false });

const props = withDefaults(
	defineProps<{
		issue: ISSUE.IIssue;
	}>(),
	{},
);

const statusText = computed(() => getIssueStatusText(props.issue.status));
const statusColor = computed(() => getIssueStatusColors(props.issue.status));
const priorityText = computed(() => getIssuePriorityText(props.issue.priority));
const priorityColor = computed(() => getIssuePriorityColors(props.issue.priority));
</script>

<style lang="scss" module>
$component: 'issue-item-modal';
.#{$component} {
	max-width: 440px;
	min-width: 250px;

	&-title {
		&--caption {
			color: var(--main-color);
		}
	}
}
</style>
