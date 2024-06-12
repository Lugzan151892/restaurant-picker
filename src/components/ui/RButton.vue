<template>
	<button
		:class="$style[className]"
		class="r-pointer r-m-auto"
		v-bind="$attrs"
		:style="styles"
		@click="$emit('click')"
	>
		<div
			:class="{
				[$style[`${className}-prepend`]]: true,
				'r-mr-10': $slots.default,
			}"
			v-if="$slots.prepend"
		>
			<slot name="prepend" />
		</div>
		<slot>
			<div
				v-if="text"
				:class="$style[`${className}-text`]"
			>
				{{ text }}
			</div>
		</slot>
		<div
			v-if="$slots.append"
			class="r-ml-10"
		>
			<slot name="append" />
		</div>
	</button>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

const className = 'r-button';
defineEmits(['click']);
const props = withDefaults(
	defineProps<{
		text?: string;
		fullWidth?: boolean;
		transparent?: boolean;
	}>(),
	{
		text: '',
		fullWidth: false,
		transparent: false,
	},
);

const styles = computed(() => ({
	...(props.fullWidth ? { width: '100%', 'max-width': '100%' } : {}),
	...(props.transparent ? { 'background-color': 'transparent' } : {}),
}));
</script>
<style lang="scss" module>
$component: r-button;

.#{$component} {
	border-radius: 10px;
	min-width: 0;
	min-height: 0;
	border: none;
	background-color: var(--background-orange);
	font-size: 16px;
	color: var(--main-white);
	max-width: fit-content;

	&-prepend {
		display: grid;
		align-items: center;
		justify-content: center;
	}

	&-text {
		font-size: 16px;
		font-weight: 500;
	}
}
</style>
