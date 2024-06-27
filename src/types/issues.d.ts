export interface IIssue {
	title: string;
	description: string;
	priority: number;
	created: string;
	status: number;
	userId: number;
}

export as namespace ISSUE;
