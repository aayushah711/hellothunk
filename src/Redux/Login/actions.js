import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from './actionTypes';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const loginUserRequest = (payload) => ({
	type: LOGIN_USER_REQUEST,
	payload
});

export const loginUserSuccess = (payload) => ({
	type: LOGIN_USER_SUCCESS,
	payload
});

export const loginUserFailure = (payload) => ({
	type: LOGIN_USER_FAILURE,
	payload
});

export const logoutUser = () => ({
	type: LOGOUT_USER
});

// returns another function.
export const userLogin = (payload) => async (dispatch) => {
	dispatch(loginUserRequest());
	try {
		let { data } = await axios({
			method: 'post',
			url: BASE_URL + '/auth/login',
			data: {
				password: payload.password,
				username: payload.username
			}
		});
		let response = {
			error: data.error,
			token: data.token,
			email: payload.email
		};
		dispatch(loginUserSuccess(response));
	} catch (err) {
		dispatch(loginUserFailure(err));
	}
};
