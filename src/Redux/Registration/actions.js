import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE } from './actionTypes';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const registerUserRequest = (payload) => ({
	type: REGISTER_USER_REQUEST,
	payload
});

export const registerUserSuccess = (payload) => ({
	type: REGISTER_USER_SUCCESS,
	payload
});

export const registerUserFailure = (payload) => ({
	type: REGISTER_USER_FAILURE,
	payload
});

// returns another function.
export const userRegister = (payload) => async (dispatch) => {
	dispatch(registerUserRequest());
	try {
		let { data } = await axios({
			method: 'post',
			url: BASE_URL + '/auth/register',
			data: {
				name: payload.name,
				email: payload.email,
				password: payload.password,
				username: payload.username,
				mobile: payload.mobile,
				description: payload.description
			}
		});
		let response = {
			error: data.error,
			message: data.message,
			email: payload.email
		};
		dispatch(registerUserSuccess(response));
	} catch (err) {
		dispatch(registerUserFailure(err));
	}
};
