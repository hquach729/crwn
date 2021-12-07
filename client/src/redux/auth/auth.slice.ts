import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CurrentUser } from '../../types';
import { initialState } from './auth.reducer';
import { debugActionPayload } from './auth.helpers';

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
			debugActionPayload(action);
			state.currentUser = action.payload;
		},
	},
});

export const { setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
