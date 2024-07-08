<template>
	<Teleport to="#app">
		<div>
			<transition
				name="fade"
				appear
			>
				<div
					class="wrapper"
					v-if="opened"
					@click="handleClose"
				/>
			</transition>
			<transition
				name="fade"
				appear
			>
				<slot />
			</transition>
		</div>
	</Teleport>
</template>

<script lang="ts" setup>
const props = withDefaults(
	defineProps<{
		opened: boolean;
		closable?: boolean;
	}>(),
	{
		closable: false,
	},
);

const emit = defineEmits(['close']);

defineOptions({
	inheritAttrs: false,
});

const handleClose = () => {
	if (props.closable) {
		emit('close');
	}
};
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
</style>
