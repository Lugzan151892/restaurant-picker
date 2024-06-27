import { defineStore } from 'pinia';

export const useIssues = defineStore('useIssues', {
	state() {
		return {
			issues: [],
		};
	},
});
