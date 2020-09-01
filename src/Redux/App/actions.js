import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, TOGGLE_PAGE } from './actionTypes';
import axios from 'axios';

export const fetchUserRequest = (payload) => ({
	type: FETCH_USERS_REQUEST,
	payload
});

export const fetchUserSuccess = (payload) => ({
	type: FETCH_USERS_SUCCESS,
	payload
});

export const fetchUserFailure = (payload) => ({
	type: FETCH_USERS_FAILURE,
	payload
});

export const togglePage = (page) => ({
	type: TOGGLE_PAGE,
	payload: page
});

// returns another function
export const fetchUserData = (payload) => (dispatch) => {
	dispatch(fetchUserRequest());
	return axios
		.get('https://api.github.com/search/users', {
			params: {
				q: payload.user,
				page: payload.page,
				per_page: 5
			}
		})
		.then((res) => res.data.items)
		.then((res) => dispatch(fetchUserSuccess(res)))
		.catch((err) => dispatch(fetchUserFailure(err)));
};
