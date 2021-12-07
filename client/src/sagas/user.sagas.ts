/**
 * User Saga
 */
import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
	UserCredential,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
	auth,
	provider,
	createUserProfileDocument,
	getCurrentUser,
} from 'firebase/firebase.util';
import { getReduxCurrentUser } from 'sagas/helpers/sign-in-helpers.saga';
import {
	CurrentUser,
	SignInEmailPayloadAction,
	UserDocumentRef,
	UserInfoAction,
} from 'types/auth-types';
import { DocumentSnapshot, getDoc } from '@firebase/firestore';
import { convertSnapToCurrentUser } from 'redux/auth/auth.helpers';
import { UserActions } from 'redux/user/user.slice';
import { FirebaseError } from '@firebase/util';
import { PayloadAction } from '@reduxjs/toolkit';

export function* onCheckUserSession() {
	yield takeLatest(UserActions.CHECK_USER_SESSION.type, isUserAuthenticated);
}

function* isUserAuthenticated() {
	try {
		const currentUser: CurrentUser = yield call(getCurrentUser);
		yield put(UserActions.SET_CURRENT_USER(currentUser));
	} catch (error) {
		yield put(UserActions.SIGN_IN_FAILURE(error));
	}
}
export function* onGoogleSignInStart() {
	// NOTE: this will listen for dispatch action and pass that action to another generator function
	yield takeLatest(UserActions.GOOGLE_SIGN_IN_START.type, signInWithGoogle);
}
function* signInWithGoogle(action: PayloadAction) {
	console.log({ action });
	// NOTE: debug incoming action payload
	// console.log(
	// 	`%c signInWithGoogle: ${JSON.stringify(action, null, 2)}`,
	// 	'background: #222; color: #bada55'
	// );
	try {
		const { user }: UserCredential = yield call(
			signInWithPopup,
			auth,
			provider
		);
		const currentUser: CurrentUser = yield call(getReduxCurrentUser, user);
		yield put(UserActions.SIGN_IN_SUCCESS(currentUser));
	} catch (error: unknown) {
		// yield put(UserActions.SIGN_IN_FAILURE('unknown error'));
		console.error('Saga', { error });
		if (error instanceof FirebaseError) {
			console.log(error.message);
			yield put(UserActions.SIGN_IN_FAILURE(error.code));
		} else if (error instanceof Error) {
			console.log(error.message);
			yield put(UserActions.SIGN_IN_FAILURE(error.message));
		} else {
			yield put(UserActions.SIGN_IN_FAILURE('unknown error'));
		}
	}
}
export function* onGoogleEmailSignInStart() {
	yield takeLatest(
		UserActions.EMAIL_PASSWORD_SIGN_IN_START.type,
		signInWithEmail
	);
}
function* signInWithEmail({ payload, type }: SignInEmailPayloadAction) {
	console.log('signInWithEmail', { type, payload });
	const { email, password } = payload;

	try {
		const { user } = yield call(
			signInWithEmailAndPassword,
			auth,
			email,
			password
		);

		const currentUser: CurrentUser = yield call(getReduxCurrentUser, user);

		yield put(UserActions.SIGN_IN_SUCCESS(currentUser));
	} catch (error: unknown) {
		if (error instanceof FirebaseError) {
			yield put(UserActions.SIGN_IN_FAILURE(error.code));
		} else if (error instanceof Error) {
			yield put(UserActions.SIGN_IN_FAILURE(error.message));
		} else {
			yield put(UserActions.SIGN_IN_FAILURE('unknown error'));
		}
	}
}
export function* onSignUpStart() {
	yield takeLatest(UserActions.SIGN_UP_START.type, signUpUser);
}
function* signUpUser(action: UserInfoAction) {
	try {
		const { email, password, confirmPassword, displayName } = action.payload;

		if (password !== confirmPassword) {
			const error = new Error('confirm password does not match');
			yield put(UserActions.SIGN_UP_FAILURE(error.message));
		} else {
			// NOTE: create a new user account login in Google Authentication database
			const { user }: UserCredential = yield call(
				createUserWithEmailAndPassword,
				auth,
				email,
				password
			);
			// NOTE: get that user profile from Google Authentication to create our own
			// user in our users collection firestore database
			const { userDocRef }: UserDocumentRef = yield call(
				createUserProfileDocument,
				user,
				{
					displayName,
				}
			);
			// NOTE: get a snapshot of the new user from our user collection firestore
			// database
			const userSnapshot: DocumentSnapshot = yield getDoc(userDocRef);
			const currentUser: CurrentUser = yield call(
				convertSnapToCurrentUser,
				userSnapshot
			);

			// NOTE: dispatch our user profile into our redux store
			yield put(UserActions.SIGN_UP_SUCCESS(currentUser));
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			if (error instanceof FirebaseError) {
				yield put(UserActions.SIGN_IN_FAILURE(error.code));
			} else if (error instanceof Error) {
				yield put(UserActions.SIGN_IN_FAILURE(error.message));
			} else {
				yield put(UserActions.SIGN_IN_FAILURE('unknown error'));
			}
		}
	}
}

export function* onSignOutStart() {
	yield takeLatest(UserActions.SIGN_OUT_START.type, signOutUser);
}
function* signOutUser() {
	try {
		yield auth.signOut();
		yield put(UserActions.SIGN_OUT_SUCCESS());
	} catch (error: unknown) {
		if (error instanceof Error) {
			yield put(UserActions.SIGN_OUT_FAILURE(error.message));
		} else {
			yield put(UserActions.SIGN_OUT_FAILURE(error));
		}
	}
}

const sagas = [
	onGoogleSignInStart,
	onGoogleEmailSignInStart,
	onSignUpStart,
	onCheckUserSession,
	onSignOutStart,
].map((saga) => {
	console.log(`%c${saga.name}`, 'background: #222; color: #bada55');
	return call(saga);
});
export function* userSagas() {
	yield all(sagas);
}
