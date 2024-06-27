<template>
	<div
		class="r-grid r-pointer"
		:class="$style[className]"
	>
		<img
			class="r-h-30 r-w-30 r-mb-2"
			:src="image"
			alt="Icon"
		/>
		<p :class="$style[`${className}-text`]">{{ text }}</p>
	</div>
</template>
<script lang="ts" setup>
const className = 'footer-menu-item';
defineProps<{
	text?: string;
	image: string;
}>();
</script>
<style lang="scss" module>
$component: footer-menu-item;

.#{$component} {
	grid-template-rows: min-content min-content;
	justify-items: center;

	&-text {
		color: var(--main-white);
	}
}
</style>
