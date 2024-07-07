import { createRouter, createWebHistory } from 'vue-router';
import authRoutes from './auth';
import { useAuth } from '@/stores/authStore';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'restaurants',
			components: {
				default: () => import('@/views/restaurants/restaurants/RestaurantsView.vue'),
			},
			meta: {
				footer: true,
				header: true,
			},
		},
		{
			path: '/issues',
			name: 'issues',
			components: {
				default: () => import('@/views/issues/IssuesView.vue'),
			},
			meta: {
				footer: true,
				header: true,
			},
		},
		...authRoutes,
	],
});

router.beforeEach((to, from, next) => {
	const authStore = useAuth();
	if (to.matched.some((path) => path.meta.hideForAuth) && authStore.user.isAuth)
		next({ name: 'restaurants' });
	else if (to.matched.some((path) => path.meta.requiredAuth) && authStore.user.isAuth)
		next({ name: 'login' });
	else next();
});

export default router;
