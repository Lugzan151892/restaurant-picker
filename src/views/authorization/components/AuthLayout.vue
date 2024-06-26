<template>
	<section
		class="r-vw-80 r-hp-100 r-m-auto r-grid"
		:class="$style[className]"
	>
		<div
			class="r-h-120 r-w-240 r-m-auto"
			:class="$style[`${className}-logo`]"
			:style="{ 'background-image': `url(${logo})` }"
		/>
		<div
			class="r-grid r-hp-100"
			:class="$style[`${className}-wrapper`]"
		>
			<h2
				class="r-mb-36"
				:class="$style[`${className}-wrapper--title`]"
			>
				{{ title }}
			</h2>
			<slot />
			<RButton
				v-if="actionFunc"
				:class="$style[`${className}-wrapper--button`]"
				class="r-p-16 r-mb-16"
				:text="actionText"
				:disabled="actionDisabled"
				@click="actionFunc"
			/>
		</div>
	</section>
</template>
<script lang="ts" setup>
import RButton from '@/components/ui/RButton.vue';
import logo from '@/assets/logo.svg';
const className = 'auth-layout';

withDefaults(
	defineProps<{
		title?: string;
		actionText: string;
		actionFunc?: () => void;
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
	align-content: space-between;

	&-logo {
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		margin-top: 5vh;
	}

	&-wrapper {
		grid-template-rows: max-content max-content max-content;
		&--title {
			font-size: 36px;
			font-weight: 600;
			color: var(--main-color);

			@media (max-width: 424px) {
				font-size: 28px;
			}
		}

		&--button {
			margin-top: 10vh;
		}
	}
}
</style>
