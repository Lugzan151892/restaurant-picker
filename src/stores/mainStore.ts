import { defineStore } from 'pinia';

type TInfoModalIconType = 'success' | 'error' | 'warning';

interface IInfoModalSettings {
	type: TInfoModalIconType;
	text: string;
	buttonText: string;
	redirect: string;
}

interface INotification {
  id: number;
	type: TInfoModalIconType;
	text: string;
	redirect?: string;
}

const defaultModalSettings = (): IInfoModalSettings => ({
	type: 'success',
	text: '',
	buttonText: 'Принять',
	redirect: '',
});

export const useMain = defineStore('useMain', {
	state() {
		return {
			mainModal: false,
			mainModalSettings: defaultModalSettings(),
			loading: false,
      notifications: [{ id: 1, text: 'Test Notification', type: 'success' }] as INotification[],
		};
	},
	actions: {
		openModal(text: string, redirect: string = '', type: TInfoModalIconType = 'success') {
			this.mainModalSettings.text = text;
			this.mainModalSettings.type = type;
			this.mainModalSettings.redirect = redirect;
			this.mainModal = true;
		},
		clearData() {
			this.mainModalSettings = defaultModalSettings();
		},

    deleteNotification(id: number) {
      if (!id) return;

      this.notifications = this.notifications.filter((notification) => notification.id !== id);
    },

    addNotification(text: string, type: TInfoModalIconType = 'success') {
      const id = this.notifications.length ? this.notifications[this.notifications.length - 1].id + 1 : 1;
      const notification: INotification = { id, text, type };

      this.notifications.push(notification);

      setTimeout(() => {
        this.deleteNotification(id);
      }, 3000)
    },

		loadingStart() {
			this.loading = true;
		},
		loadingStop() {
			this.loading = false;
		},
	},
});
