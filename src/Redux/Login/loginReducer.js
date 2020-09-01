import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from './actionTypes';

const initState = {
	isLoading: false,
	error: false,
	token: '',
	email: '',
	isAuth: false
};

const loginReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case LOGIN_USER_REQUEST:
			return {
				...state,
				isLoading: true,
				error: false
			};

		case LOGIN_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: payload.error,
				token: payload.token,
				email: payload.email,
				isAuth: true,
				message: 'Login Successful!'
			};

		case LOGIN_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				error: true,
				message: 'Something went wrong...'
			};
		case LOGOUT_USER:
			return {
				...state,
				token: '',
				isAuth: false,
				message: 'Logout Successful!'
			};
		default:
			return state;
	}
};

export default loginReducer;
