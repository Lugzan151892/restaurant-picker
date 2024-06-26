interface IUserData {
	id: string;
	email: string;
	userName: string;
}

export interface IDefaultResponse {
	error: boolean;
	status: number;
	errorMessage?: string;
}

export as namespace COMMON;
