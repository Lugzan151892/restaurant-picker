import { defineStore } from 'pinia';
import api from '@/services/api';
import { useMain } from '@/stores/mainStore';

export const useIssues = defineStore('useIssues', {
	state() {
		return {
			issues: [] as Array<ISSUE.IIssue>,
		};
	},

	actions: {
		async getIssuesList() {
			try {
				const result = await api.get<undefined, ISSUE.IIssueListResponse>('/issue/list');

				if (!result.error && result.data.items) {
					this.issues = result.data.items;
				}
			} catch (e: any) {
				console.log(e);
			}
		},

		async createIssue(data: ISSUE.TIssueCreated) {
			const mainStore = useMain();

			try {
				const result = await api.post('/issue/create', data);

				if (result.error && result.errorMessage) {
					mainStore.openModal(result.errorMessage, undefined, 'error');
					return false;
				}

				await this.getIssuesList();

				return true;
			} catch (err: any) {
				console.log(err);
			}
		},
	},
});
