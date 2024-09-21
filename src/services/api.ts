import { useMain } from '@/stores/mainStore';
import { getLocalItem } from '@/utils/localStorage/localStorageFunc';
import { LOCAL_ACCESS_TOKEN } from '@/utils/localStorage/localStorageVariables';

const defaultPath = 'http://localhost:5000/rest';
// const defaultPath = 'https://hunter-service.fun/rest';
class Api {
	path;
	constructor() {
		this.path = defaultPath;
	}

	private setLoading(loading: boolean) {
		const mainStore = useMain();

		if (loading) mainStore.loadingStart();
		else mainStore.loadingStop();
	}

	setPath(path: string = '') {
		this.path = path || defaultPath;
	}

	private get isDefaultPath() {
		return this.path === defaultPath;
	}

	async get<Request, Response extends COMMON.IDefaultResponse>(
		path: string,
		params?: Request,
	): Promise<Response> {
		try {
			this.setLoading(true);
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
					...(authToken &&
						this.isDefaultPath && { Authorization: 'Bearer ' + authToken }),
				},
			});
			if (!response.ok) {
				throw new Error('Something went wrong, try again');
			}
			const result = await response.json();
			return result;
		} catch (e) {
			console.log(e);
			throw new Error(`Something went wrong! Error: ${e}`);
		} finally {
			this.setLoading(false);
		}
	}

	async post<Request, Response extends COMMON.IDefaultResponse>(
		path: string,
		options: Request,
	): Promise<Response> {
		try {
			this.setLoading(true);
			const authToken = getLocalItem(LOCAL_ACCESS_TOKEN);
			const response = await fetch(this.path + path, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					...(authToken &&
						this.isDefaultPath && { Authorization: 'Bearer ' + authToken }),
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
			throw new Error(`Something went wrong! Error: ${e}`);
		} finally {
			this.setLoading(false);
		}
	}

	async put<Request, Response extends COMMON.IDefaultResponse>(
		path: string,
		options: Request,
	): Promise<Response> {
		try {
			this.setLoading(true);
			const authToken = getLocalItem(LOCAL_ACCESS_TOKEN);
			const response = await fetch(this.path + path, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					...(authToken &&
						this.isDefaultPath && { Authorization: 'Bearer ' + authToken }),
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
			throw new Error(`Something went wrong! Error: ${e}`);
		} finally {
			this.setLoading(false);
		}
	}

	async delete<Response extends COMMON.IDefaultResponse>(path: string): Promise<Response> {
		try {
			this.setLoading(true);
			const authToken = getLocalItem(LOCAL_ACCESS_TOKEN);
			const response = await fetch(this.path + path, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					...(authToken &&
						this.isDefaultPath && { Authorization: 'Bearer ' + authToken }),
				},
			});
			if (!response.ok) {
				throw new Error('Something went wrong, try again');
			}
			const result = await response.json();
			return result;
		} catch (e) {
			console.log(e);
			throw new Error(`Something went wrong! Error: ${e}`);
		} finally {
			this.setLoading(false);
		}
	}
}

export default new Api();
