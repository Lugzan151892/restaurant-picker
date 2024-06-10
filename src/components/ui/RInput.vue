<template>
	<div 
    :class="$style[className]" 
    :style="inputStyles"
  >
		<div 
      v-if="$slots['icon-before']"
      class="r-ml-8"
      :class="$style[`${className}-iconbefore`]"
    >
			<slot name="icon-before" />
		</div>
		<input
			:placeholder="placeholder"
      :style="{ color: props.color }"
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
    backgroundColor?: string;
    color?: string;
	}>(),
	{
		type: 'text',
		modelValue: '',
		placeholder: 'Введите ...',
    backgroundColor: '#e7e7e7',
    color: 'var(--color-text)'
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

const inputStyles = computed(() => ({
  ...(props.backgroundColor && { 'background-color': props.backgroundColor }),
  ...(props.color && { color: `${props.color} !important` }),
}));

</script>
<style lang="scss" module>
$component: r-input;
.#{$component} {
	min-height: 52px;
	border-radius: 10px;
	display: grid;
	grid-template-columns: 30px 1fr;
  align-items: center;
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
			color: inherit;
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
