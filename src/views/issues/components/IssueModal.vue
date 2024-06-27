<template>
	<RModal
		v-model="opened"
		title="Создать задачу на ошибку"
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
				<RInput />
			</RLabel>
			<RLabel
				class="r-mt-16"
				caption="Приоритет ошибки"
			>
				<RSelect />
			</RLabel>
		</div>
		<template #footer>
			<div class="r-wp-100 r-grid r-mb-16">
				<RButton
					class="r-h-30"
					text="Создать"
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

const componentName = 'IssueModal';
const className = 'issue-modal';

const opened = defineModel({ default: false });

const issueTitle = ref('');
const issueDescription = ref('');
</script>

<style lang="scss" module>
$component: 'issue-modal';
.#{$component} {
}
</style>
