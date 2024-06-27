<template>
	<div>
		<SignUpContent
			v-if="!isCodeSent"
			@send-code="isCodeSent = $event"
		/>
		<CodeEnterView
			v-else
			code-adress="e-mail"
		/>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import CodeEnterView from '@/views/authorization/code-enter/CodeEnterView.vue';
import SignUpContent from '@/views/authorization/sign-up/components/SignUpContent.vue';

const isCodeSent = ref(true);
</script>
