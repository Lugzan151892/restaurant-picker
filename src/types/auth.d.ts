export interface ICreateUserRequest {
	email: string;
	password: string;
	userName: string;
}

export interface ICreateUserResponse extends COMMON.IDefaultResponse {
	accessToken: string;
	data: {
		email: string;
		id: number;
		userName: string;
		refreshToken: string;
	};
	errorMessage?: string;
}

export interface ILoginRequest {
	password: string;
	userName: string;
}

export interface ILoginResponse extends COMMON.IDefaultResponse {
	accessToken: string;
	data: {
		email: string;
		id: number;
		userName: string;
		refreshToken: string;
	};
	errorMessage?: string;
}

export as namespace AUTH;
