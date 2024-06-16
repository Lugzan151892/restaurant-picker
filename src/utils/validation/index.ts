const emailRe =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const usernameRe = /^[A-Za-z0-9\-_]{6,}$/;

export enum EVALIDATION_FIELDS {
	EMAIL = 'email',
	PHONE = 'phone',
	USERNAME = 'username',
}

const checkUsername = (userName: string) => {
	if (!userName) return false;

	return usernameRe.test(userName);
};

const checkEmail = (email: string) => {
	if (!email) return false;

	return emailRe.test(email);
};

const checkValid = (field: EVALIDATION_FIELDS, value: string) => {
	if (!field) {
		return 'Поле не заполнено!';
	}
	switch (field) {
		case EVALIDATION_FIELDS.EMAIL: {
			return checkEmail(value) ? '' : 'E-mail должен соответствовать формату ____@__.__ ';
		}
		case EVALIDATION_FIELDS.USERNAME:
			return checkUsername(value)
				? ''
				: 'Имя пользователя не должно содержать спецсимволов и быть не менее 6 символов';
		case EVALIDATION_FIELDS.PHONE:
			return '';

		default:
			return '';
	}
};

export const useValidation = (userData: { [key in EVALIDATION_FIELDS]?: string }) => {
	const errors = {} as { [key in EVALIDATION_FIELDS]?: string };

	Object.keys(userData).forEach((el) => {
		errors[el] = checkValid(el, userData[el]);
	});

	const isValid = !Object.values(errors).some((el) => !!el);

	return {
		isValid,
		errors,
	};
};
