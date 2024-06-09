<template>
	<div :class="$style[className]">
		<div :class="$style[`${className}-iconbefore`]">
			<slot name="icon-before" />
		</div>
		<input
			:placeholder="placeholder"
			:type="type"
			:class="$style[`${className}-input`]"
			v-model="value"
		/>
	</div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

const className = 'r-input';

const emit = defineEmits(['update:modelValue']);
const props = withDefaults(
	defineProps<{
		type?: string;
		modelValue: string;
		placeholder: string;
	}>(),
	{
		type: 'text',
		modelValue: '',
		placeholder: 'Введите ...',
	},
);

const value = computed({
	get() {
		return props.modelValue;
	},
	set(val) {
		emit('update:modelValue', val);
	},
});
</script>
<style lang="scss" module>
$component: r-input;
.#{$component} {
	min-height: 52px;
	background-color: #e7e7e7;
	border-radius: 10px;
	display: grid;
	grid-template-columns: 30px 1fr;
	column-gap: 5px;

	&:has(input:focus) {
		border: 2px solid var(--main-color);
	}

	&-input {
		border: none;
		background: transparent;
		font-size: 16px;
		grid-area: 1 / 2 / 2 / 3;

		&::placeholder {
			color: var(--color-text);
			text-align: left;
			opacity: 1;
		}

		&:focus {
			border: none;
			outline: none;
		}
	}
}
</style>
