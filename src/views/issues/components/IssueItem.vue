<template>
	<div
		class="r-pointer"
		:class="$style[className]"
	>
		<div :class="$style[`${className}-text`]">
			<h3
				class="r-mb-4"
				:class="$style[`${className}-text--title`]"
			>
				{{ issue.title }}
			</h3>
			<p>
				{{ issue.description }}
			</p>
		</div>
		<div :class="$style[`${className}-status`]">
			<p>Статус:</p>
			<p :style="{ color: issueStatusColor }">
				{{ getIssueStatusText(issue.status) }}
			</p>
		</div>
		<div :class="$style[`${className}-priority`]">
			<p>Приоритет:</p>
			<p :style="{ color: issuePriorityColor }">
				{{ getIssuePriorityText(issue.priority) }}
			</p>
		</div>
		<div :class="$style[`${className}-actions`]">
			<RButton
				full-width
				text="Изменить"
				@click="$emit('edit', issue.id)"
			/>
			<RButton
				full-width
				text="Удалить"
				@click="$emit('delete', issue.id)"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {
	getIssueStatusText,
	getIssuePriorityText,
	getIssuePriorityColors,
	getIssueStatusColors,
} from '@/views/issues/utils';
import { computed } from 'vue';

const props = defineProps<{
	issue: ISSUE.IIssue;
}>();

defineEmits(['edit', 'delete']);

const componentName = 'IssueItem';
const className = 'issue-item';

const issueStatusColor = computed(() => getIssueStatusColors(props.issue.status));
const issuePriorityColor = computed(() => getIssuePriorityColors(props.issue.priority));
</script>

<style lang="scss" module>
$component: 'issue-item';
.#{$component} {
	border: 1px solid var(--main-color);
	border-radius: 10px;
	padding: 4px 8px;
	display: grid;
	grid-template-columns: 35% 25% 25% max-content;
	justify-content: space-between;
	color: var(--color-text);
	height: 60px;

	&-text {
		overflow: hidden;
		&--title {
			color: var(--main-color);
		}
	}

	&-status {
		display: grid;
		grid-template-rows: min-content min-content;
		align-content: space-around;
	}

	&-priority {
		display: grid;
		grid-template-rows: min-content min-content;
		align-content: space-around;
	}

	&-actions {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: max-content max-content;
		row-gap: 4px;
		align-content: center;
	}
}
</style>
