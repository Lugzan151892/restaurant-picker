export default [
	{
		path: '/intro',
		name: 'intro',
		components: {
			default: () => import('@/views/authorization/IntroView.vue'),
		},
	},
	{
		path: '/signup',
		name: 'signup',
		components: {
			default: () => import('@/views/authorization/sign-up/SignUpView.vue'),
		},
	},
	{
		path: '/login',
		name: 'login',
		components: {
			default: () => import('@/views/authorization/login/LoginView.vue'),
		},
	},
];
