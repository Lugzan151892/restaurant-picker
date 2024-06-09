export default [
	{
		path: '/intro',
		name: 'intro',
		component: () => import('@/views/authorization/IntroView.vue'),
	},
	{
		path: '/signup',
		name: 'signup',
		component: () => import('@/views/authorization/sign-up/SignUpView.vue'),
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/authorization/login/LoginView.vue'),
	},
];
