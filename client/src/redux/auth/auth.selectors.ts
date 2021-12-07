// import { createSelector } from '@reduxjs/toolkit';
// import type { RootState } from '../store';

// /**
//  *
//  * @param state
//  * @returns
//  */
// export const selectAuth = (state: RootState) => state.auth;

// /**
//  * Select the currentUser
//  */
// export const selectCurrentUser = createSelector(
// 	[selectAuth],
// 	(auth) => auth.currentUser
// );

// /**
//  * Select the username, password from the auth state
//  */

// export const selectCredential = createSelector(
// 	[selectAuth],
// 	(auth) => auth.credential
// );
export {};
