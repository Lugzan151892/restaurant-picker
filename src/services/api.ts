import { getLocalItem } from '@/utils/localStorage/localStorageFunc';
import { LOCAL_ACCESS_TOKEN } from '@/utils/localStorage/localStorageVariables';

const defaultPath = 'http://localhost:5000/rest';
// const defaultPath = 'https://hunter-service.fun/rest';
class Api {
	path;
	constructor() {
		this.path = defaultPath;
	}

	async get<Request, Response extends COMMON.IDefaultResponse>(
		path: string,
		params?: Request,
	): Promise<Response> {
		let requestParams = '';
		if (params) {
			requestParams = Object.keys(params).reduce(
				(acc, curr) =>
					`${acc}${acc ? '&' : '?'}${curr}=${(params as { [key: string]: string })[curr]}`,
				'',
			);
		}
		const authToken = getLocalItem(LOCAL_ACCESS_TOKEN);
		const response = await fetch(this.path + path + requestParams, {
			headers: {
				...(authToken && { Authorization: 'Bearer ' + authToken }),
			},
		});
		if (!response.ok) {
			throw new Error('Something went wrong, try again');
		}
		const result = await response.json();
		return result;
	}

	async post<Request, Response extends COMMON.IDefaultResponse>(
		path: string,
		options: Request,
	): Promise<Response> {
		try {
			const authToken = getLocalItem(LOCAL_ACCESS_TOKEN);
			const response = await fetch(this.path + path, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					...(authToken && { Authorization: 'Bearer ' + authToken }),
				},
				body: JSON.stringify(options),
			});
			if (!response.ok) {
				throw new Error('Something went wrong, try again');
			}
			const result = await response.json();
			return result;
		} catch (e) {
			console.log(e);
			return new Promise(() => ({
				error: true,
				status: 500,
			}));
		}
	}

	async put<Request, Response extends COMMON.IDefaultResponse>(
		path: string,
		options: Request,
	): Promise<Response | undefined> {
		try {
			const authToken = getLocalItem(LOCAL_ACCESS_TOKEN);
			const response = await fetch(this.path + path, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					...(authToken && { Authorization: 'Bearer ' + authToken }),
				},
				body: JSON.stringify(options),
			});
			if (!response.ok) {
				throw new Error('Something went wrong, try again');
			}
			const result = await response.json();
			return result;
		} catch (e) {
			console.log(e);
		}
	}
}

export default new Api();
