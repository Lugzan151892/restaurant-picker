<template>
	<div>
		<transition
			name="fade"
			appear
		>
			<div
				class="wrapper"
				v-if="opened"
				@click="$emit('close')"
			></div>
		</transition>
		<transition
			name="pop"
			appear
		>
			<div v-if="opened">
				<slot />
			</div>
		</transition>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const showModal = ref(false);

const props = defineProps<{
	opened: boolean;
}>();
const componentName = 'RBackground';
const className = 'r-background';
</script>

<style lang="scss" scoped>
.wrapper {
	position: absolute;
	min-height: 100%;
	min-width: 100%;
	top: 0;
	left: 0;
	background-color: black;
	opacity: 0.5;
	z-index: 10;
	display: grid;
	align-items: center;
	justify-content: center;
}

/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.4s linear;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
	transition:
		transform 0.4s cubic-bezier(0.5, 0, 0.5, 1),
		opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
	opacity: 0;
	transform: scale(0.3) translateY(-50%);
}
</style>
