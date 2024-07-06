<template>
	<div :class="$style[className]">
		<div
			:style="{ 'background-image': `url(${props.image})` }"
			:class="$style[`${className}-image`]"
			class="r-w-80 r-h-80"
		/>
		<div :class="$style[`${className}-description`]">
			<h3 :class="$style[`${className}-description--title`]">{{ title }}</h3>
			<p :class="$style[`${className}-description--desc`]">{{ description }}</p>
			<p :class="$style[`${className}-description--dist`]">{{ distance }}</p>
			<div
				:class="$style[`${className}-description--rating`]"
				class="r-px-4 r-py-2"
			>
				<div
					:style="{ 'background-image': `url(${star})` }"
					class="r-w-12 r-h-12"
					:src="image"
					alt="Restaurant image"
				/>
				<p>
					{{ rating }}
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import noImage from '@/assets/icons/no-image.svg';
import star from '@/assets/icons/star.svg';

const componentName = 'RestaurantCard';
const className = 'restaurant-card';

const props = withDefaults(
	defineProps<{
		title?: string;
		description?: string;
		distance?: string;
		image?: string;
		rating?: string | number;
	}>(),
	{
		title: '',
		description: 'test descr',
		distance: 'mnogo kilometrov',
		image: noImage,
		rating: 4.7,
	},
);
</script>

<style lang="scss" module>
$component: 'restaurant-card';
.#{$component} {
	display: grid;
	grid-template-columns: max-content 1fr auto;
	column-gap: 8px;

	&-image {
		border-radius: 10px;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}

	&-description {
		display: grid;
		grid-template-columns: 1fr max-content;
		grid-template-rows: min-content min-content min-content;
		row-gap: 4px;
		align-content: center;

		&--title {
			font-size: 16px;
			font-weight: 600;
			grid-area: 1 / 1 / 2 / 2;
		}

		&--desc {
			grid-area: 2 / 1 / 3 / 2;
		}

		&--dist {
			grid-area: 3 / 1 / 4 / 2;
		}

		&--rating {
			display: grid;
			grid-template-columns: max-content min-content;
			column-gap: 2px;
			grid-area: 1 / 2 / 4 / 3;
			background: var(--main-color);
			height: max-content;
			border-radius: 4px;
			font-size: 12px;
			color: var(--main-white);
		}
	}
}
</style>
