import { defineStore } from 'pinia';

export const issesStore = defineStore('useIssues', {
	state() {
		return {
			issues: [],
		};
	},
});
