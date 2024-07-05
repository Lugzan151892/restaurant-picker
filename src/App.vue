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
		<InfoModal />
    <Loading v-if="mainStore.loading" />
	</main>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/header/HeaderComponent.vue';
import { onMounted } from 'vue';
import { useAuth } from '@/stores/authStore';
import { useMain } from '@/stores/mainStore';
import { useRoute, useRouter } from 'vue-router';
import { LOCAL_INTRO_ACCEPT } from '@/utils/localStorage/localStorageVariables';
import { getLocalItem } from '@/utils/localStorage/localStorageFunc';
import InfoModal from '@/components/info-modal/InfoModal.vue';
import Loading from '@/components/LoadingComponent.vue';

const authStore = useAuth();
const router = useRouter();
const route = useRoute();
const mainStore = useMain();

onMounted(async () => {
	const canAuthWithAccessToken = await authStore.checkUserAuth();

	if (!canAuthWithAccessToken) {
		await authStore.updateAccessToken();
	}

	const isUserIntroAccept = getLocalItem(LOCAL_INTRO_ACCEPT);
	if (!authStore.user.isAuth && !isUserIntroAccept) {
		router.push('/intro');
	}
});
</script>
