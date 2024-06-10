import { defineStore } from 'pinia';

export const useAuth = defineStore('useAuth', {
	state() {
		return {
			user: {
				isAuth: false,
				name: '',
				email: '',
				phone: '',
			},
		};
	},

	actions: {
		setUser(name: string, email: string, phone: string = '') {
			if (!name || !email) return;

			this.user.name = name;
			this.user.email = email;
			this.user.phone = phone;
			this.user.isAuth = true;
		},
	},
});
