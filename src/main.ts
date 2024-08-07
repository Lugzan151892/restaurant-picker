import '@/assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/App.vue';
import router from '@/router';
import RBackground from '@/components/ui/RBackground.vue';
import RButton from '@/components/ui/RButton.vue';
import RCodeInput from '@/components/ui/RCodeInput.vue';
import RIcon from '@/components/ui/RIcon.vue';
import RInput from '@/components/ui/RInput.vue';
import RLabel from '@/components/ui/RLabel.vue';
import RModal from '@/components/ui/RModal.vue';
import RSelect from '@/components/ui/RSelect.vue';
import { useAuth } from './stores/authStore';
import { getLocalItem } from './utils/localStorage/localStorageFunc';
import { LOCAL_INTRO_ACCEPT } from './utils/localStorage/localStorageVariables';

const app = createApp(App);

app.component('RBackground', RBackground)
	.component('RButton', RButton)
	.component('RCodeInput', RCodeInput)
	.component('RIcon', RIcon)
	.component('RInput', RInput)
	.component('RLabel', RLabel)
	.component('RModal', RModal)
	.component('RSelect', RSelect);

app.use(createPinia());
app.use(router);

router.beforeEach(async (to, from, next) => {
	const authStore = useAuth();

	const checkIsAuth = async () => {
		const canAuthWithAccessToken = await authStore.checkUserAuth();

		if (!canAuthWithAccessToken) {
			await authStore.updateAccessToken();
		}
	};

	await checkIsAuth();

	const isUserIntroAccept = getLocalItem(LOCAL_INTRO_ACCEPT);

	if (!isUserIntroAccept && to.name === 'restaurants') {
		next({ name: 'intro' });
	}

	if (to.matched.some((path) => path.meta.hideForAuth) && authStore.user.isAuth)
		next({ name: 'restaurants' });
	else if (to.matched.some((path) => path.meta.requiredAuth) && !authStore.user.isAuth)
		next({ name: 'login' });
	else next();
});

app.mount('#app');
