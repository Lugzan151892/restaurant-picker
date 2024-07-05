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

export as namespace COMMON;
