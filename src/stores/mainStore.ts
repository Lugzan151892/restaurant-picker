import { defineStore } from 'pinia';

type TInfoModalIconType = 'success' | 'error' | 'warning';

interface IInfoModalSettings {
	type: TInfoModalIconType;
	text: string;
	buttonText: string;
	redirect: string;
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
		loadingStart() {
			this.loading = true;
		},
		loadingStop() {
			this.loading = false;
		},
	},
});
