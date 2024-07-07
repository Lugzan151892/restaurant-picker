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
		<Notification />
	</main>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/header/HeaderComponent.vue';
import { useMain } from '@/stores/mainStore';
import { useRoute } from 'vue-router';
import InfoModal from '@/components/info-modal/InfoModal.vue';
import Loading from '@/components/LoadingComponent.vue';
import Notification from '@/components/NotificationsComponent.vue';

const route = useRoute();
const mainStore = useMain();
</script>
