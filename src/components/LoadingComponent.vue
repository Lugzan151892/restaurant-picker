<template>
	<div :class="$style[className]">
		<img
			:class="$style[`${className}-image`]"
			:src="loading"
			alt="loading-animation"
		/>
	</div>
</template>

<script lang="ts" setup>
import loading from '@/assets/icons/loading.gif';

const className = 'loading-component';
</script>

<style lang="scss" module>
$component: 'loading-component';
.#{$component} {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1000;
	background: rgba(0, 0, 0, 0.6);
	display: grid;
	justify-content: center;
	align-items: center;
	&-image {
		width: 80px;
		height: 80px;
	}
}
</style>
