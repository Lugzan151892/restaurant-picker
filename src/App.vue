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
			<HeaderComponent v-else-if="route.meta?.header" />
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
			<FooterComponent v-else-if="route.meta?.footer" />
		</RouterView>
	</footer>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/header/HeaderComponent.vue';
import FooterComponent from '@/components/footer/FooterComponent.vue';
import { onMounted } from 'vue';
import { useAuth } from '@/stores/authStore';
import { useRoute, useRouter } from 'vue-router';
import { LOCAL_INTRO_ACCEPT } from '@/utils/localStorage/localStorageVariables';
import { getLocalItem } from '@/utils/localStorage/localStorageFunc';

const authStore = useAuth();
const router = useRouter();
const route = useRoute();

onMounted(() => {
	const isUserIntroAccept = getLocalItem(LOCAL_INTRO_ACCEPT);
	if (!authStore.user.isAuth && !isUserIntroAccept) {
		router.push('/intro');
	}
});
</script>
