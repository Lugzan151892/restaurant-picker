<template>
	<section
		class="r-vw-60 r-hp-100 r-m-auto r-grid"
		:class="$style[className]"
	>
		<img
			class="r-h-240 r-w-240 r-m-auto r-mt-100"
			src="../../../assets/logo.svg"
			alt="Rerstaurant Finder"
		/>
		<div
			class="r-grid"
			:class="$style[`${className}-wrapper`]"
		>
			<h2
				class="r-mb-36"
				:class="$style[`${className}-title`]"
			>
				{{ title }}
			</h2>
			<slot />
			<RButton
				class="r-mt-88 r-p-16 r-mb-16"
				:text="actionText"
				:disabled="actionDisabled"
				@click="actionFunc"
			/>
		</div>
	</section>
</template>
<script lang="ts" setup>
import RButton from '@/components/ui/RButton.vue';
const className = 'auth-layout';

withDefaults(
	defineProps<{
		title?: string;
		actionText: string;
		actionFunc: () => void;
		actionDisabled?: boolean;
	}>(),
	{
		title: '',
		actionDisabled: false,
	},
);
</script>
<style lang="scss" module>
$component: auth-layout;
.#{$component} {
	grid-template-rows: 1fr 1fr;

	&-wrapper {
		grid-template-rows: max-content max-content max-content;
	}

	&-title {
		font-size: 36px;
		font-weight: 600;
		color: var(--main-color);
	}
}
</style>
