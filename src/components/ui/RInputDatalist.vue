<template>
	<div
		:class="$style[className]"
		class="ao-text"
	>
		<RInput
			:list="id"
			:id="id"
			@input="handleInput"
		/>
		<div
			class="r-wp-100"
			:class="$style[`${className}-option`]"
		>
			<div
				v-for="item in options ?? []"
				:key="item.id"
				:class="$style[`${className}-option--item`]"
				class="r-py-4 r-px-8"
				:value="item.text"
				@click="chooseOption(item.id)"
			>
				{{ item.text }}
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const componentName = 'RInputDatalist';
const className = 'r-input-datalist';

const emit = defineEmits(['input', 'choose-option']);

withDefaults(
	defineProps<{
		options?: Array<{ id: number; text: string }>;
		id: string;
	}>(),
	{
		options: () => [],
	},
);

const handleInput = (val: string) => {
	emit('input', val);
};

const chooseOption = (val: number) => {
	emit('choose-option', val);
};
</script>

<style lang="scss" module>
$component: 'r-input-datalist';
.#{$component} {
	&-option {
		border: 1px solid var(--main-color);
		border-top: none;
		border-radius: 10px;
		max-height: 250px;
		&--item {
			display: flex;
			align-items: center;
			margin: auto 0;
			cursor: pointer;
			min-height: 35px;
			border-top: 1px solid var(--main-color);
			border-radius: 10px;
		}

		&--item:hover {
			background-color: var(--background-second);
		}
	}
}
</style>
