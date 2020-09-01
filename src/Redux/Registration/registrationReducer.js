import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE } from './actionTypes';

const initState = {
	isLoading: false,
	error: false,
	message: '',
	email: ''
};

const registrationReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case REGISTER_USER_REQUEST:
			return {
				...state,
				isLoading: true,
				error: false
			};

		case REGISTER_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: payload.error,
				message: payload.message,
				email: payload.email
			};

		case REGISTER_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload.error,
				message: payload.message
			};
		default:
			return state;
	}
};

export default registrationReducer;
