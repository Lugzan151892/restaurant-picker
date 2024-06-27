import { createRouter, createWebHistory } from 'vue-router';
import authRoutes from './auth';

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

export default router;
