export const getLocalItem = (key: string) => {
	const data = localStorage.getItem(key);

	if (data) {
		return JSON.parse(data);
	}

	return null;
};

export const setLocalItem = (key: string, data: any) => {
	if (!key) return;

	localStorage.setItem(key, JSON.stringify(data));
};

export const deleteLocalItem = (key: string) => {
	if (!key) return;

	localStorage.removeItem(key);
};
