import type { EISSUE_PRIORITY, EISSUE_STATUS } from '@/views/issues/interfaces';

export interface IIssue {
	id: number;
	title: string;
	description: string;
	priority: EISSUE_PRIORITY;
	created: string;
	status: EISSUE_STATUS;
	userId: number;
}

type TIssueCreated = Pick<IIssue, 'title' | 'description' | 'priority' | 'id'>;

interface IIssueListResponse extends COMMON.IDefaultResponse {
	data: {
		items: Array<IIssue>;
	};
}

export as namespace ISSUE;
