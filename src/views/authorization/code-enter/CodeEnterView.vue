<template>
	<AuthLayout
		title="Зарегистрироваться"
		action-text="Сохранить и продолжить"
	>
		<div :class="$style[className]">
			<h3
				:class="$style[`${className}-title`]"
				class="r-mb-8"
			>
				Введите код подтверждения
			</h3>
			<p
				:class="$style[`${className}-description`]"
				class="r-mb-12"
			>
				Код подтверждения был отправлен на {{ codeAdress }}
			</p>
			<RCodeInput v-model="codeValue" />
		</div>
	</AuthLayout>
</template>

<script lang="ts" setup>
import AuthLayout from '@/views/authorization/components/AuthLayout.vue';
import { ref } from 'vue';

defineProps<{
	codeAdress: string;
}>();

const className = 'code-enter-view';

const codeValue = ref('');
</script>

<style lang="scss" module>
$component: 'code-enter-view';
.#{$component} {
	&-title {
		font-size: 18px;
		font-weight: 600;
	}

	&-description {
		font-size: 14px;
	}
}
</style>
