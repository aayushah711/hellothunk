import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, TOGGLE_PAGE } from './actionTypes';

export const initState = {
	isLoading: false,
	userData: [],
	isError: false,
	page: 1
};

export default function reducer(state = initState, { type, payload }) {
	switch (type) {
		case FETCH_USERS_REQUEST:
			return {
				...state,
				isLoading: true
			};
		case FETCH_USERS_SUCCESS:
			return {
				...state,
				userData: payload,
				isLoading: false
			};

		case FETCH_USERS_FAILURE:
			return {
				...state,
				isError: true,
				isLoading: false
			};

		case TOGGLE_PAGE:
			return {
				...state,
				page: payload,
				isLoading: true
			};

		default:
			return state;
	}
}
