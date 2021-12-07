import type { AuthState, AuthAction } from '../../types';

export const initialState: AuthState = {
	currentUser: null,
	error: null,
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
	switch (action.type) {
		case 'SIGN_UP_START':
		case 'EMAIL_PASSWORD_SIGN_IN_START':
		case 'GOOGLE_SIGN_IN_START':
			return {
				...state,
				currentUser: null,
				error: null,
			};
		case 'SET_CURRENT_USER':
		case 'SIGN_UP_SUCCESS':
		case 'SIGN_IN_SUCCESS':
			return {
				...state,
				currentUser: action.payload?.currentUser,
				error: null,
			};
		case 'SIGN_UP_FAILURE':
		case 'SIGN_IN_FAILURE':
		case 'SIGN_OUT_FAILURE':
			return {
				...state,
				error: action.payload?.error!,
			};
		case 'SIGN_OUT_SUCCESS':
			return { ...state, currentUser: null, error: null };
		default:
			return state;
	}
};

export default authReducer;
