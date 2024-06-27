import api from '@/services/api';
import { deleteLocalItem, getLocalItem, setLocalItem } from '@/utils/localStorage/localStorageFunc';
import {
	LOCAL_ACCESS_TOKEN,
	LOCAL_REFRESH_TOKEN,
} from '@/utils/localStorage/localStorageVariables';
import { defineStore } from 'pinia';

export const useAuth = defineStore('useAuth', {
	state() {
		return {
			user: {
				id: 0,
				isAuth: false,
				userName: '',
				email: '',
				phone: '',
			},
		};
	},

	actions: {
		async updateAccessToken() {
			try {
				const refreshToken = getLocalItem(LOCAL_REFRESH_TOKEN);
				const result = await api.post<{ refreshToken: string }, AUTH.ILoginResponse>(
					'/user/updateToken',
					{ refreshToken },
				);

				if (result.error && result.errorMessage) {
					console.log(result.errorMessage);
					return false;
				}

				Object.assign(this.user, result.data);

				if (result.accessToken) {
					setLocalItem(LOCAL_ACCESS_TOKEN, result.accessToken);
				}

				this.user.isAuth = true;
				return true;
			} catch (e: any) {
				console.log(e);
				return false;
			}
		},

		async checkUserAuth() {
			try {
				const result = await api.get<undefined, AUTH.ILoginResponse>('/user/checkLogin');

				if (result.error && result.errorMessage) {
					console.log(result.errorMessage);
					return false;
				}

				Object.assign(this.user, result.data);

				if (result.accessToken) {
					setLocalItem(LOCAL_ACCESS_TOKEN, result.accessToken);
				}

				this.user.isAuth = true;
				return true;
			} catch (e: any) {
				console.log(e);
				return false;
			}
		},

		async registerNewUser(userName: string, email: string, password: string) {
			try {
				const result = await api.post<AUTH.ICreateUserRequest, AUTH.ICreateUserResponse>(
					'/user/add',
					{ email, userName, password },
				);

				if (result.error && result.errorMessage) {
					console.log(result.errorMessage);
					return false;
				}

				Object.assign(this.user, result.data);

				if (result.accessToken) {
					setLocalItem(LOCAL_ACCESS_TOKEN, result.accessToken);
				}

				if (result.data.refreshToken) {
					setLocalItem(LOCAL_REFRESH_TOKEN, result.data.refreshToken);
				}

				this.user.isAuth = true;
				return true;
			} catch (e: any) {
				console.log(e);
				return false;
			}
		},

		async login(userName: string, password: string) {
			try {
				const result = await api.post<AUTH.ILoginRequest, AUTH.ILoginResponse>(
					'/user/login',
					{ userName, password },
				);

				if (result.error && result.errorMessage) {
					console.log(result.errorMessage);
					return false;
				}

				Object.assign(this.user, result.data);

				if (result.accessToken) {
					setLocalItem(LOCAL_ACCESS_TOKEN, result.accessToken);
				}

				if (result.data.refreshToken) {
					setLocalItem(LOCAL_REFRESH_TOKEN, result.data.refreshToken);
				}

				this.user.isAuth = true;
				return true;
			} catch (e: any) {
				console.log(e);
				return false;
			}
		},

		async logout() {
			try {
				const result = await api.get<undefined, AUTH.ILogoutResponse>('/user/logout');

				if (result.error && result.errorMessage) {
					console.log(result.errorMessage);
				}

				deleteLocalItem(LOCAL_ACCESS_TOKEN);
				deleteLocalItem(LOCAL_REFRESH_TOKEN);

				return true;
			} catch (e: any) {
				console.log(e);
				return false;
			}
		},
	},
});
