<template>
	<div
		class="r-pt-40 r-px-16 r-mb-16 r-grid"
		:class="$style[className]"
	>
		<RBackground
			:opened="menuOpened"
			@close="menuOpened = false"
		>
			<MenuComponent v-model="menuOpened" />
		</RBackground>
		<img
			class="r-pointer"
			:class="{
				[$style[`${className}-icon`]]: true,
				[$style[`${className}-icon--active`]]: menuOpened,
			}"
			src="@/assets/icons/nav.svg"
			alt="Logo"
			@click="menuOpened = !menuOpened"
		/>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import MenuComponent from '@/components/menu/MenuComponent.vue';
import RBackground from '../ui/RBackground.vue';

const className = 'header-component';

const menuOpened = ref(false);
</script>
<style lang="scss" module>
$component: header-component;
.#{$component} {
	position: relative;

	&-icon {
		transition: all 0.25s;
		-webkit-transition: all 0.25s;
	}

	&-icon--active {
		transform: rotate(90deg);
	}
}
</style>
