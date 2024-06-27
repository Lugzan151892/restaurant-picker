<template>
	<div
		:class="{
			[$style[className]]: true,
			[$style[`${className}--disabled`]]: !items.length || disabled,
			[$style[`${className}--error`]]: error,
		}"
	>
		<select
			:class="$style[`${className}-select`]"
			:name="id"
			:id="id"
		>
			<option
				v-for="item in selectItems"
				:key="item.id"
				:value="item.id"
				@click="handleClick(item.id)"
			>
				{{ item.text }}
			</option>
		</select>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface ISelectItem {
	id: number;
	text: string;
}

const className = 'r-select';

const props = withDefaults(
	defineProps<{
		items?: Array<ISelectItem>;
		zeroId?: number;
		disabled?: boolean;
		error?: string;
		id?: string;
	}>(),
	{
		items: () => [],
		zeroId: 0,
		disabled: false,
		error: '',
		id: '',
	},
);

const emit = defineEmits(['input']);

const value = defineModel({ default: 0 });
const handleClick = (val: number) => {
	value.value = val;
	emit('input', val);
};

const selectItems = computed<ISelectItem[]>(() =>
	props.zeroId === 0 ? [{ id: 0, text: 'Ничего не выбрано' }, ...props.items] : props.items,
);
</script>

<style lang="scss" module>
$component: 'r-select';
.#{$component} {
	position: relative;
	display: flex;
	border-radius: 10px;
	min-height: 52px;
	overflow: hidden;

	&::after {
		content: '\25BC';
		position: absolute;
		top: 0;
		right: 0;
		padding: 20px;
		transition: 0.25s all ease;
		pointer-events: none;
	}

	&:hover::after {
		color: var(--main-color);
	}

	&-select {
		appearance: none;
		outline: 10px red;
		border: 0;
		box-shadow: none;
		width: 100%;
		padding: 0 35px;
		background-color: var(--background-second);
		font-size: 16px;
		background-image: none;
		cursor: pointer;

		&::-ms-expand {
			display: none;
		}
	}

	&--disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	&--error {
		border: 2px solid var(--main-error) !important;
	}
}
</style>
