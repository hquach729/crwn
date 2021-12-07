import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
	convertCollectionToMap as convert,
	getCollections as get,
} from 'firebase/firebase.util';
import { DocumentData, getDocs, QuerySnapshot } from '@firebase/firestore';
import { Collection } from 'types';
import { ShopActions } from 'redux/shop/shop.slice';
import { PayloadAction } from '@reduxjs/toolkit';

/**
 * Saga: Listen for every FETCH COLLECTION START action and call a function
 * that perform the fetch collection process from firebase firestore. Once
 * that action is completed it will dispatch an appropriable action to the
 * redux reducer
 */
// TODO: Change this to use an enum ActionTypes
export function* onfetchCollectionStart() {
	const { FETCH_COLLECTION_START } = ShopActions;
	yield takeLatest(FETCH_COLLECTION_START.type, fetchCollection);
}

/**
 * Sage: Perform an async collection fetch and once completed, it will dispatch the
 * action to the reducer
 */
export function* fetchCollection(action: PayloadAction<string>) {
	// console.log({ action });
	// NOTE: saga put act like dispatch, it will dispatch our action to the reducer
	const {
		FETCH_COLLECTION_PENDING,
		FETCH_COLLECTION_COMPLETED,
		FETCH_COLLECTION_FAIL,
	} = ShopActions;
	yield put(FETCH_COLLECTION_PENDING());
	try {
		// const { collectionRef } = get('items');
		const { collectionRef } = get(action.payload);
		const snapshot: QuerySnapshot<DocumentData> = yield getDocs(collectionRef);
		const collectionMap: Collection = yield call(convert, snapshot);

		yield put(FETCH_COLLECTION_COMPLETED(collectionMap));
	} catch (error) {
		if (error instanceof Error) {
			yield put(FETCH_COLLECTION_FAIL(error.message));
		} else {
			yield put(FETCH_COLLECTION_FAIL(error));
		}
	}
}

const sagas = [onfetchCollectionStart].map((saga) => {
	console.log(`%c${saga.name}`, 'background: #222; color: #bada55');
	return call(saga);
});

export function* shopSagas() {
	yield all(sagas);
}
