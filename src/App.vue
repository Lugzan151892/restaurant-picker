<template>
	<RouterView
		name="header"
		v-slot="{ Component }"
	>
		<component
			v-if="Component"
			:is="Component"
		/>
		<HeaderComponent v-else />
	</RouterView>
	<main>
		<RouterView />
	</main>
	<footer></footer>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/header/HeaderComponent.vue';
</script>
