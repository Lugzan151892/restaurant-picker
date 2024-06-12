<template>
	<header>
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
	</header>
	<main>
		<RouterView />
	</main>
	<footer>
		<RouterView
			name="footer"
			v-slot="{ Component }"
		>
			<component
				v-if="Component"
				:is="Component"
			/>
			<FooterComponent v-else />
		</RouterView>
	</footer>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/header/HeaderComponent.vue';
import FooterComponent from '@/components/footer/FooterComponent.vue';
</script>
