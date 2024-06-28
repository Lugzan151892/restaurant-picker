import { defineStore } from 'pinia';
import issuesMock from '@/mock/issues.json';

export const useIssues = defineStore('useIssues', {
	state() {
		return {
			issues: issuesMock.issues,
		};
	},
});
