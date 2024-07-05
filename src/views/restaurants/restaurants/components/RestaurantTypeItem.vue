<template>
	<div
		class="r-h-100 r-w-120 r-grid r-p-8 r-pointer"
		:class="$style[className]"
		:style="{ 'background-image': `url(${props.image})` }"
	>
		<div
			class="r-h-100 r-w-120"
			:class="$style[`${className}-background`]"
			:style="{ background: props.background }"
		/>
		<p :class="$style[`${className}-text`]">
			{{ text }}
		</p>
	</div>
</template>
<script lang="ts" setup>
const className = 'restaurant-type-item';

const props = defineProps<{
	text?: string;
	background?: string;
	image?: string;
}>();
</script>
<style lang="scss" module>
$component: restaurant-type-item;

.#{$component} {
	border-radius: 10px;
	position: relative;
	align-items: center;
	text-align: center;
	color: var(--main-white);
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;

	&-text {
		font-size: 16px;
		font-weight: 600;
		z-index: 2;
	}

	&-background {
		position: absolute;
		border-radius: 10px;
		top: 0;
		left: 0;
		opacity: 0.6;
	}

	&:hover {
		transform: scale(0.95);
		border: 1px solid var(--main-color);
	}
}
</style>
