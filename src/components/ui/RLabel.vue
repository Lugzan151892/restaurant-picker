<template>
	<div
		class="r-grid"
		:class="inLine ? [$style[`${className}-row`]] : [$style[`${className}-column`]]"
	>
		<label
			:class="$style[`${className}-caption`]"
			:for="labelId"
		>
			{{ caption }}
		</label>
		<slot />
	</div>
</template>

<script lang="ts" setup>
withDefaults(
	defineProps<{
		caption: string;
		inLine?: boolean;
		labelId?: string;
	}>(),
	{
		inLine: false,
		labelId: '',
	},
);

const className = 'r-label';
</script>

<style lang="scss" module>
$component: 'r-label';
.#{$component} {
	&-column {
		grid-template-columns: 1fr;
		row-gap: 8px;
		grid-template-rows: max-content max-content;
	}

	&-row {
		grid-template-columns: max-content 1fr;
		grid-template-rows: max-content;
		column-gap: 8px;
	}

	&-caption {
		font-size: 16px;
		color: var(--main-color);
	}
}
</style>
