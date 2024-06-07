import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'restaurants',
			component: () => import('@/views/restaurants/restaurants/RestaurantsView.vue'),
		},
    {
			path: '/signup',
			name: 'signup',
			component: () => import('@/views/authorization/sign-up/SignUpView.vue'),
		},
	],
})

export default router
