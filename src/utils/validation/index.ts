const emailRe =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const usernameRe = /^[A-Za-z0-9\-_]{6,}$/;
const passwordRe = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export enum EVALIDATION_FIELDS {
	EMAIL = 'email',
	USERNAME = 'username',
	PASSWORD = 'password',
	PHONE = 'phone',
}

export enum ELOGIN_FIELDS {
	USERNAME = EVALIDATION_FIELDS.USERNAME,
	PASSWORD = EVALIDATION_FIELDS.PASSWORD,
}

export type IErrorObject<T extends string | number> = Record<T, string>;

const checkUsername = (userName: string) => {
	if (!userName) return false;

	return usernameRe.test(userName);
};

const checkEmail = (email: string) => {
	if (!email) return false;

	return emailRe.test(email);
};

const checkPassword = (password: string) => {
	if (!password) return false;

	return passwordRe.test(password);
};

const checkValid = <T>(field: T, value: string) => {
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
		case EVALIDATION_FIELDS.PASSWORD:
			return checkPassword(value)
				? ''
				: 'Пароль должен быть не короче 8 символов, содержать, как минимум, 1 букву и 1 цифру';

		default:
			return '';
	}
};

export const useValidation = <T extends string | number>(userData: IErrorObject<T>) => {
	const errors = {} as IErrorObject<T>;

	Object.keys(userData).forEach((el) => {
		const currentEl = el as keyof IErrorObject<T>;
		errors[currentEl] = checkValid(currentEl, userData[currentEl]);
	});

	const isValid = !Object.values(errors).some((el) => !!el);

	return {
		isValid,
		errors,
	};
};
