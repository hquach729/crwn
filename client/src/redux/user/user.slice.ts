import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { CurrentUser } from 'types';
import { ActionTypes } from 'types/auth-types';

export interface UserState {
	currentUser: CurrentUser | null;
	error?: string | null | unknown;
}
const initialState: UserState = {
	currentUser: null,
};

export const debugReduxAction = (action: PayloadAction) => {
	const { type, payload } = action;
	console.log('redux:', { type, payload });
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		[ActionTypes.CHECK_USER_SESSION]: () => {},
		[ActionTypes.SET_CURRENT_USER]: (state, action) => {
			// debugReduxAction(action);
			state.currentUser = action.payload;
			state.error = null;
		},
		[ActionTypes.SIGN_OUT_START]: () => {},
		[ActionTypes.SIGN_OUT_SUCCESS]: (state) => {
			state.currentUser = null;
			state.error = null;
		},
		[ActionTypes.GOOGLE_SIGN_IN_START]: () => {},
		[ActionTypes.SIGN_UP_START]: (state, _) => {
			state.currentUser = null;
			state.error = null;
		},
		[ActionTypes.EMAIL_PASSWORD_SIGN_IN_START]: (state, _) => {
			state.currentUser = null;
			state.error = null;
		},
		[ActionTypes.GOOGLE_SIGN_IN_START]: (state) => {
			state.currentUser = null;
			state.error = null;
		},
		[ActionTypes.SIGN_UP_SUCCESS]: (state, action) => {
			// debugReduxAction(action);
			state.currentUser = action.payload;
			state.error = null;
		},
		[ActionTypes.SIGN_IN_SUCCESS]: (state, action) => {
			// debugReduxAction(action);
			state.currentUser = action.payload;
			state.error = null;
		},
		[ActionTypes.SIGN_UP_FAILURE]: (state, action) => {
			// debugReduxAction(action);
			state.error = action.payload;
		},
		[ActionTypes.SIGN_IN_FAILURE]: (state, action) => {
			// debugReduxAction(action);
			state.error = action.payload;
		},
		[ActionTypes.SIGN_OUT_FAILURE]: (state, action) => {
			// debugReduxAction(action);
			state.error = action.payload;
		},
	},
});

const selectUser = (state: RootState) => state.user;

export const selectCurrentUser = createSelector(
	[selectUser],
	(user) => user.currentUser
);

export const selectError = createSelector([selectUser], (user) => user.error);

export const UserActions = userSlice.actions;
export const {
	SIGN_IN_FAILURE,
	SIGN_IN_SUCCESS,
	SET_CURRENT_USER,
	SIGN_OUT_FAILURE,
	SIGN_OUT_START,
	SIGN_OUT_SUCCESS,
	SIGN_UP_FAILURE,
	SIGN_UP_START,
	SIGN_UP_SUCCESS,
} = userSlice.actions;
export default userSlice.reducer;
