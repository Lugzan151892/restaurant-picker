import api from '@/services/api';
import { deleteLocalItem, getLocalItem, setLocalItem } from '@/utils/localStorage/localStorageFunc';
import {
	LOCAL_ACCESS_TOKEN,
	LOCAL_REFRESH_TOKEN,
} from '@/utils/localStorage/localStorageVariables';
import { defineStore } from 'pinia';
import { useMain } from '@/stores/mainStore';

interface IUserData {
	id: number;
	isAuth: boolean;
	userName: string;
	email: string;
	phone: string;
}

const defaultUser = (): IUserData => ({
	id: 0,
	isAuth: false,
	userName: '',
	email: '',
	phone: '',
});

export const useAuth = defineStore('useAuth', {
	state() {
		return {
			user: defaultUser(),
		};
	},
	actions: {
    addNotification(text: string, type: COMMON.TInfoModalIconType = 'success') {
      const mainStore = useMain();
      mainStore.addNotification(text, type);
    },

		async updateAccessToken() {
			try {
				const refreshToken = getLocalItem(LOCAL_REFRESH_TOKEN);
				const result = await api.post<{ refreshToken: string }, AUTH.ILoginResponse>(
					'/user/updateToken',
					{ refreshToken },
				);

				if (result.error && result.errorMessage) {
          this.addNotification('Не авторизован. Токен не действителен.', 'error');
					return false;
				}

				Object.assign(this.user, result.data);

				if (result.accessToken) {
					setLocalItem(LOCAL_ACCESS_TOKEN, result.accessToken);
				}

        this.addNotification('Успешно авторизован!');

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
        console.log('test');

				if (result.error && result.errorMessage) {
					console.log(result.errorMessage);
          this.addNotification('Токен недействителен. Не авторизован!', 'error');
					return false;
				}

				Object.assign(this.user, result.data);

				if (result.accessToken) {
					setLocalItem(LOCAL_ACCESS_TOKEN, result.accessToken);
				}

        this.addNotification('Успешно авторизован!');
				this.user.isAuth = true;
				return true;
			} catch (e: any) {
        console.log('test2');
        this.addNotification('Токен недействителен. Не авторизован!', 'error');
				console.log(e);
				return false;
			}
		},

		async registerNewUser(userName: string, email: string, password: string) {
			const mainStore = useMain();
			try {
				const result = await api.post<AUTH.ICreateUserRequest, AUTH.ICreateUserResponse>(
					'/user/add',
					{ email, userName, password },
				);

				if (result.error && result.errorMessage) {
					mainStore.openModal(result.errorMessage, undefined, 'error');
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

				mainStore.openModal(
					`Пользователь ${this.user.userName} успешно зарегистрирован`,
					'/',
				);

				return true;
			} catch (e: any) {
				console.log(e);
				return false;
			}
		},

		async login(userName: string, password: string) {
			const mainStore = useMain();
			try {
				const result = await api.post<AUTH.ILoginRequest, AUTH.ILoginResponse>(
					'/user/login',
					{ userName, password },
				);

				if (result.error && result.errorMessage) {
					mainStore.openModal(result.errorMessage, undefined, 'error');
					return false;
				}

				Object.assign(this.user, result.data);

				if (result.accessToken) {
					setLocalItem(LOCAL_ACCESS_TOKEN, result.accessToken);
				}

				if (result.data.refreshToken) {
					setLocalItem(LOCAL_REFRESH_TOKEN, result.data.refreshToken);
				}

        this.addNotification('Успешно авторизован!');
				this.user.isAuth = true;
				return true;
			} catch (e: any) {
				console.log(e);
				return false;
			}
		},

		async logout() {
			try {
				await api.get<undefined, AUTH.ILogoutResponse>('/user/logout');

				this.user = defaultUser();

				deleteLocalItem(LOCAL_ACCESS_TOKEN);
				deleteLocalItem(LOCAL_REFRESH_TOKEN);

        this.addNotification('Успешный выход из системы!');

				return true;
			} catch (e: any) {
				console.log(e);
				return false;
			}
		},
	},
});
