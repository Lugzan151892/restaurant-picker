<template>
	<div>
		<h3 class="r-mb-8">{{ statusText }}:</h3>
		<div>
			<IssueItem
				v-for="(issue, index) in issues"
				:key="issue.id"
				:issue="issue"
				:class="{
					'r-mt-4': index,
				}"
				@edit="$emit('edit', $event)"
				@delete="$emit('delete', $event)"
				@click="$emit('open-issue', issue.id)"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { getIssueStatusText } from '@/views/issues/utils';
import type { EISSUE_STATUS } from '@/views/issues/interfaces';
import { computed } from 'vue';
import IssueItem from '@/views/issues/components/IssueItem.vue';

const props = defineProps<{
	status: EISSUE_STATUS;
	issues: Array<ISSUE.IIssue>;
}>();

defineEmits(['edit', 'delete', 'open-issue']);

const statusText = computed(() => getIssueStatusText(props.status));
</script>
