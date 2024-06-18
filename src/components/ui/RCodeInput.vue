<template>
	<section>
		<div
			:class="$style[className]"
			class="r-grid"
		>
			<div
				v-for="(number, index) in length"
				:key="number"
				:class="{
					[$style[`${className}-item`]]: true,
					[$style[`${className}-item--error`]]: error,
				}"
				class="r-h-50 r-w-50 r-grid"
				@click="focusInput"
			>
				<div
					:class="{
						[$style[`${className}-item--text`]]: true,
						[$style[`${className}-item--text--error`]]: error,
					}"
				>
					{{ value[number - 1] }}
				</div>
				<div
					:class="{
						[$style[`${className}-item--line`]]: true,
						[$style[`${className}-item--line--error`]]: error,
						[$style[`${className}-item--line--active`]]: isFieldActive(index),
					}"
				/>
			</div>
		</div>
		<div
			v-if="error"
			:class="$style[`${className}-message`]"
			class="r-mt-24"
		>
			<p class="r-mb-8">Введен неверный код</p>
			<p>Попробуйте еще раз</p>
		</div>
		<input
			ref="inputRef"
			:class="$style[`${className}-input`]"
			:maxlength="length"
			@input="onInput($event)"
			v-model="value"
			@focus="inputFocused = true"
			@blur="inputFocused = false"
		/>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const className = 'r-code-input';

const emit = defineEmits(['input']);
const props = withDefaults(
	defineProps<{
		length?: number;
		error?: boolean;
	}>(),
	{
		length: 6,
		error: false,
	},
);

const value = defineModel({ default: '' });
const inputRef = ref<null | HTMLInputElement>(null);
const inputFocused = ref(false);

const focusInput = () => {
	if (!inputRef.value) return;

	inputRef.value.focus();
};

const isFieldActive = (fieldIndex: number) => {
	if (!inputFocused.value) return false;
	if (!value.value.length) return fieldIndex === 0;
	if (value.value.length === props.length) return fieldIndex === props.length - 1;

	return fieldIndex === value.value.length;
};

const onInput = (event: Event) => {
	emit('input', +(event.target as HTMLInputElement).value);
};
</script>

<style lang="scss" module>
$component: 'r-code-input';

@keyframes border-blink {
	0% {
		opacity: 0;
	}

	50% {
		opacity: 1;
	}

	100% {
		opacity: 0;
	}
}

.#{$component} {
	grid-auto-flow: column;
	justify-content: space-between;

	&-item {
		border-radius: 10px;
		border: 1px solid var(--main-color);
		align-content: center;
		justify-content: center;
		font-size: 18px;
		font-weight: 600;
		grid-template-columns: min-content;
		grid-template-rows: min-content min-content;
		row-gap: 2px;

		&--error {
			border: 1px solid var(--main-error) !important;
			background-color: var(--background-error);
		}

		&--text {
			min-height: 10px;
			&--error {
				color: var(--main-error);
			}
		}

		&--line {
			min-height: 2px;
			min-width: 10px;
			border-top: 2px solid;
			opacity: 0;

			&--active {
				animation: border-blink 1s infinite;
			}

			&--error {
				border-color: var(--main-error);
			}
		}
	}

	&-message {
		color: var(--main-error);
		display: grid;
		text-align: center;
	}

	&-input {
		opacity: 0;
		height: 0;
		width: 0;
	}
}
</style>
