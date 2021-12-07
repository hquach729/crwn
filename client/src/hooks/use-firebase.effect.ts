import React from 'react';
import { ShopActions } from 'redux/shop/shop.slice';
import { collection, onSnapshot } from '@firebase/firestore';
import { convertCollectionToMap, db } from 'firebase/firebase.util';
import { useAppDispatch } from 'redux/hooks';

export enum FetchType {
	SAGA_PROMISE = 'SAGA_PROMISE',
	FIREBASE_OBSERVABLE = 'FIREBASE_OBSERVABLE',
}
export type CollectionTypes = 'items' | 'users' | 'collections' | 'directories';

export interface FetchConfig {
	type: FetchType;
	key: CollectionTypes;
}
/**
 * Firebase Hook to fetch our the firestore collection
 *
 * @param {FetchConfig} config - The config to determine whether to use Observable or Promise base fetch
 * @param {FetchType} config.type - The type of fetch we want to use.
 * @param {CollectionTypes} config.key - The type of fetch we want to use.
 *
 */
export function useFirebase(config: FetchConfig) {
	const dispatch = useAppDispatch();
	const { type, key } = config;

	React.useEffect(() => {
		switch (type) {
			case FetchType.FIREBASE_OBSERVABLE:
				const collectionRef = collection(db, key);
				dispatch(ShopActions.FETCH_COLLECTION_PENDING());
				const unsubscribe = onSnapshot(
					collectionRef,
					(snapshot) => {
						const collectionMap = convertCollectionToMap(snapshot);
						dispatch(ShopActions.FETCH_COLLECTION_COMPLETED(collectionMap));
					},
					(error: unknown) => {
						if (error instanceof Error)
							dispatch(ShopActions.FETCH_COLLECTION_FAIL(error.message));
						else {
							dispatch(ShopActions.FETCH_COLLECTION_FAIL(error));
						}
					}
				);

				return () => {
					console.log('unsubscribe to firebase');
					unsubscribe(); // NOTE: unsubscribe to observable once component is unmount from dom ie screen
				};
			case FetchType.SAGA_PROMISE:
				dispatch(ShopActions.FETCH_COLLECTION_START(key));
				return;
			default:
				return;
		}
		// NOTE: tell react to only fire the effect again if one these dependencies
		// changes
	}, [dispatch, key, type]);
}
