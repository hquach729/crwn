import { DocumentReference } from '@firebase/firestore';
import { PayloadAction } from '@reduxjs/toolkit';

export enum ActionTypes {
	SIGN_OUT = 'SIGN_OUT',
	SIGN_OUT_START = 'SIGN_OUT_START',
	SET_CURRENT_USER = 'SET_CURRENT_USER',
	CHECK_CURRENT_USER = 'CHECK_CURRENT_USER',
	GOOGLE_SIGN_IN_START = 'GOOGLE_SIGN_IN_START',
	GOOGLE_SIGN_IN_SUCCESS = 'GOOGLE_SIGN_IN_SUCCESS',
	GOOGLE_SIGN_IN_FAILURE = 'GOOGLE_SIGN_FAILURE',
	EMAIL_PASSWORD_SIGN_IN_START = 'EMAIL_PASSWORD_SIGN_IN_START',
	EMAIL_PASSWORD_SIGN_IN_SUCCESS = 'EMAIL_PASSWORD_SIGN_IN_SUCCESS',
	EMAIL_PASSWORD_SIGN_IN_FAILURE = 'EMAIL_PASSWORD_SIGN_IN_FAILURE',
	SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
	SIGN_IN_FAILURE = 'SIGN_IN_FAILURE',
	CHECK_USER_SESSION = 'CHECK_USER_SESSION',
	SIGN_UP_START = 'SIGN_UP_START',
	SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
	SIGN_UP_FAILURE = 'SIGN_UP_FAILURE',
	SIGN_OUT_CLEAR_CART = 'SIGN_OUT_CLEAR_CART',
	SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS',
	SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE',
}

export type AuthActionType =
	| 'SIGN_OUT'
	| 'SET_CURRENT_USER'
	| 'CHECK_CURRENT_USER'
	| 'GOOGLE_SIGN_IN_START'
	| 'GOOGLE_SIGN_IN_SUCCESS'
	| 'GOOGLE_SIGN_IN_FAILURE'
	| 'EMAIL_PASSWORD_SIGN_IN_START'
	| 'EMAIL_PASSWORD_SIGN_IN_SUCCESS'
	| 'EMAIL_PASSWORD_SIGN_IN_FAILURE'
	| 'SIGN_IN_SUCCESS'
	| 'SIGN_IN_FAILURE'
	| 'CHECK_USER_SESSION'
	| 'SIGN_UP_START'
	| 'SIGN_UP_SUCCESS'
	| 'SIGN_UP_FAILURE'
	| 'SIGN_OUT_START'
	| 'SIGN_OUT_CLEAR_CART'
	| 'SIGN_OUT_SUCCESS'
	| 'SIGN_OUT_FAILURE';

export type SignUpActionTypes =
	| 'SIGN_UP_START'
	| 'SIGN_UP_SUCCESS'
	| 'SIGN_UP_FAILURE';

export type SignOutActionTypes =
	| 'SIGN_OUT_START'
	| 'SIGN_OUT_CLEAR_CART'
	| 'SIGN_OUT_SUCCESS'
	| 'SIGN_OUT_FAILURE';

export type GoogleSignInTypes =
	| 'GOOGLE_SIGN_IN_START'
	| 'GOOGLE_SIGN_IN_SUCCESS'
	| 'GOOGLE_SIGN_IN_FAILURE';

export type CurrentUser = {
	id?: string;
	displayName: string | null;
	email: string | null;
	createdAt: Date | string;
};

// export type Credential =
// 	| {
// 			email: string;
// 			password: string;
// 	  }
// 	| null
// 	| undefined;

export interface Credential {
	email: string;
	password: string;
}

export type SignInError = string | null;

export interface AuthState {
	currentUser?: CurrentUser | null;
	credential?: Credential | null;
	error?: SignInError | unknown;
}
export interface AuthPayload extends AuthState {}
export interface CredentialPayload {
	email: string;
	password: string;
}

export interface AuthAction {
	type: AuthActionType;
	payload?: AuthPayload;
}

export interface UserDocumentRef {
	userDocRef: DocumentReference;
}

export interface LoginFormState {
	email: string;
	password: string;
}

export interface UserInfo {
	displayName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface UserInfoAction {
	type: AuthActionType;
	payload: UserInfo;
}

export type SignInEmailPayloadAction = PayloadAction<{
	email: string;
	password: string;
}>;
