<template>
	<div>
		<div
			:class="{
				[$style[className]]: true,
				[$style[`${className}--error`]]: error,
			}"
			:style="inputStyles"
		>
			<div
				v-if="$slots['icon-before']"
				class="r-ml-8"
				:class="$style[`${className}-iconbefore`]"
			>
				<slot name="icon-before" />
			</div>
			<input
				:placeholder="placeholder"
				:style="{ color: props.color }"
				:type="computedType"
				:name="id"
				:id="id"
				:class="$style[`${className}-input`]"
				v-model="value"
				@input="$emit('input', $event)"
			/>
			<div
				v-if="props.type === 'password'"
				class="r-mx-10 r-pointer r-h-25 r-w-25"
				:class="$style[`${className}-iconafter`]"
				:style="{
					'background-image': `url(${showPassword ? passwordShow : passwordHide})`,
				}"
				@click="showPassword = !showPassword"
			/>
		</div>
		<p
			class="r-ml-16 r-mt-2"
			:class="$style[`${className}-error`]"
		>
			{{ error }}
		</p>
	</div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import passwordHide from '@/assets/icons/password_hide.png';
import passwordShow from '@/assets/icons/password_show.png';

const className = 'r-input';

const emit = defineEmits(['update:modelValue', 'input']);
const props = withDefaults(
	defineProps<{
		type?: string;
		modelValue?: string;
		placeholder?: string;
		backgroundColor?: string;
		color?: string;
		error?: string;
		id?: string;
	}>(),
	{
		type: 'text',
		modelValue: '',
		placeholder: 'Введите ...',
		backgroundColor: 'var(--background-second)',
		color: 'var(--color-text)',
		error: '',
		id: '',
	},
);

const value = computed({
	get() {
		return props.modelValue;
	},
	set(val) {
		emit('update:modelValue', val);
	},
});

const showPassword = ref(false);

const userType = computed(() => (showPassword.value ? 'text' : 'password'));
const computedType = computed(() => (props.type === 'password' ? userType.value : props.type));

const inputStyles = computed(() => ({
	...(props.backgroundColor && { 'background-color': props.backgroundColor }),
	...(props.color && { color: `${props.color} !important` }),
}));
</script>
<style lang="scss" module>
$component: r-input;
.#{$component} {
	min-height: 52px;
	border-radius: 10px;
	display: grid;
	grid-template-columns: 30px 1fr max-content;
	align-items: center;
	column-gap: 5px;

	&:has(input:focus) {
		border: 2px solid var(--main-color);
	}

	&--error {
		border: 2px solid var(--main-error) !important;
	}

	&-input {
		border: none;
		background: transparent;
		font-size: 16px;
		grid-area: 1 / 2 / 2 / 3;

		&::placeholder {
			color: inherit;
			text-align: left;
			opacity: 1;
		}

		&:focus {
			border: none;
			outline: none;
		}
	}

	&-iconafter {
		grid-area: 1 / 3 / 2 / 4;
	}

	&-error {
		color: var(--main-error);
	}
}
</style>
