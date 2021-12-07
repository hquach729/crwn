/**
 * Redux Auth Actions
 *
 *
 */
import { FirebaseError } from '@firebase/util';
import {
	AuthAction,
	Credential,
	CurrentUser,
	ActionTypes,
	UserInfo,
	UserInfoAction,
} from 'types/auth-types';

// export enum ActionTypes {
// 	SIGN_OUT = 'SIGN_OUT',
// 	SIGN_OUT_START = 'SIGN_OUT_START',
// }

/**
 * Check the current sign in status of a user
 */
export const checkCurrentUser = (): AuthAction => ({
	type: 'CHECK_CURRENT_USER',
});
export const signOut = (): AuthAction => ({
	type: 'SIGN_OUT',
});
/**
 * ACTION: SET_CURRENT_USER
 * Set the current user profile from firebase into Redux store
 *
 * @param authUser - An authenticated user profile in Firebase firestore
 * @returns { AuthAction } - a redux action payload
 */
export const setCurrentUser = (authUser: CurrentUser | null): AuthAction => ({
	type: 'SET_CURRENT_USER',
	payload: { currentUser: authUser },
});
/**
 * ACTION: GOOGLE_SIGN_IN_START
 * Dispatch an action telling our redux or saga that a google sign has started
 *
 * @returns { AuthAction}
 */
export const googleSignInStart = (): AuthAction => ({
	type: 'GOOGLE_SIGN_IN_START',
});
/**
 * Dispatch an action telling our redux or saga that a email sign has started
 *
 * @returns { AuthAction }
 */
export const emailSignInStart = (credential: Credential): AuthAction => ({
	type: 'EMAIL_PASSWORD_SIGN_IN_START',
	payload: { credential },
});
/**
 * Dispatch an action with a user object and notifying that a sign in is successful
 *
 * @param authUser
 * @returns { AuthAction } - Action payload consisting of a type and payload properties
 */
export const signInSuccess = (user: CurrentUser): AuthAction => ({
	type: 'SIGN_IN_SUCCESS',
	payload: { currentUser: user },
});

/**
 *
 * @param user
 * @returns
 */
export const signUpSuccess = (user: CurrentUser): AuthAction => ({
	type: 'SIGN_UP_SUCCESS',
	payload: { currentUser: user },
});
/**
 * Dispatch an action with a error message payload to indicate that a email
 * sign has fail
 *
 * @param errorMessage
 * @returns
 */
export const signInFailure = (
	// error: string | FirebaseError | Error
	error: FirebaseError | Error | unknown
): AuthAction => ({
	type: 'SIGN_IN_FAILURE',
	payload: { error },
});
/**
 * An action call that check the current status of the user
 * session whether the user is sign in or sign out
 * @returns
 */
export const checkUserSession = (): AuthAction => ({
	type: 'CHECK_USER_SESSION',
});

/**
 * Dispatch an action to begin the sign out process
 * @returns
 */
// export const signOutStart = (): AuthAction => ({
// 	type: 'SIGN_OUT_START',
// });

export const signOutStart = (): AuthAction => ({
	type: ActionTypes.SIGN_OUT_START,
});

// export const test = () => ({
// 	type: ActionTypes.SIGN_OUT,
// });

// console.log(ActionTypes);

/**
 * Dispatch and action that clear the currentUser, cart, and error
 */
// NOTE:
export const signOutSuccess = (): AuthAction => ({
	type: 'SIGN_OUT_SUCCESS',
});
/**
 *
 * @returns
 */
export const signOutFail = (error: string): AuthAction => ({
	type: 'SIGN_OUT_FAILURE',
	payload: { error },
});

export const signUpFail = (error: string): AuthAction => ({
	type: 'SIGN_UP_FAILURE',
	payload: { error },
});

/**
 * Dispatch action to saga to perform the sign up start procedure
 * @returns
 */

export const signUpStart = (userInfo: UserInfo): UserInfoAction => ({
	type: 'SIGN_UP_START',
	payload: userInfo,
});
