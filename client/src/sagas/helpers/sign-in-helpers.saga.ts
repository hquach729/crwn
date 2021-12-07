/**
 * Sign In Helpers Function
 */
import { User } from '@firebase/auth';
import { DocumentReference, DocumentSnapshot } from '@firebase/firestore';
import { FirebaseError } from '@firebase/util';
import { call, put } from '@redux-saga/core/effects';
import { getDoc } from 'firebase/firestore';
import { createUserProfile } from 'firebase/firebase.util';
import { signInFailure, signInSuccess } from 'redux/auth/auth.actions';
import { convertSnapToCurrentUser } from 'redux/auth/auth.helpers';
import { CurrentUser } from 'types';
/**
 *
 * @param user
 */
export function* getSnapshotFromUserCredential(user: User) {
	try {
		const userDocRef: DocumentReference = yield call(createUserProfile, user);
		const snapshot: DocumentSnapshot = yield getDoc(userDocRef);

		// NOTE: we convert the snapshot to our redux user object
		const currentUser: CurrentUser = yield call(
			convertSnapToCurrentUser,
			snapshot
		);
		yield put(signInSuccess(currentUser));
	} catch (error: unknown) {
		yield call(convertErrorToSerialize, error);
	}
}

export function* getReduxCurrentUser(user: User) {
	try {
		const userDocRef: DocumentReference = yield call(createUserProfile, user);
		const snapshot: DocumentSnapshot = yield getDoc(userDocRef);
		const currentUser: CurrentUser = yield call(
			convertSnapToCurrentUser,
			snapshot
		);
		return currentUser;
	} catch (error: unknown) {
		throw error;
	}
}

export function* convertErrorToSerialize(error: unknown) {
	if (error instanceof FirebaseError) {
		yield put(signInFailure(error.code));
	} else if (error instanceof Error) {
		yield put(signInFailure(error.message));
	} else {
		yield put(signInFailure('unknown error'));
	}
}
