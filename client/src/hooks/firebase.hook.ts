import React from 'react';
import { ShopActions } from 'redux/shop/shop.slice';
import { collection, onSnapshot, QuerySnapshot } from '@firebase/firestore';
import { convertCollectionToMap, db } from 'firebase/firebase.util';
import { useAppDispatch } from 'redux/hooks';
import { Collection } from 'types';

export enum FetchType {
	SAGA_PROMISE = 'SAGA_PROMISE',
	FIREBASE_OBSERVABLE = 'FIREBASE_OBSERVABLE',
}
// NOTE: add more collection type here
export type CollectionTypes = 'items' | 'users' | 'collections' | 'directories';

export interface FetchConfig {
	type: FetchType;
	key: CollectionTypes;
}
export function useFirebase({ type, key }: FetchConfig) {
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		switch (type) {
			case FetchType.FIREBASE_OBSERVABLE:
				dispatch(ShopActions.FETCH_COLLECTION_PENDING());
				const collectionRef = collection(db, key);
				const unsubscribe = onSnapshot(
					collectionRef,
					(snapshot) => {
						debugSnapshot(snapshot);
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
					unsubscribe(); // NOTE: unsubscribe to observable once component is unmount from dom ie screen
				};
			case FetchType.SAGA_PROMISE:
				// dispatch(ShopActions.FETCH_COLLECTION_START('items'));
				dispatch(ShopActions.FETCH_COLLECTION_START(key));
				return;
			default:
				return;
		}
	}, [dispatch, type, key]);
}
export function debugSnapshot(snapshot: QuerySnapshot) {
	snapshot.docs.forEach((doc) => {
		const { title, items } = doc.data() as Collection;
		console.log({ title, items });
	});
}

export function useFirebaseObservableFetch(key: string) {
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		dispatch(ShopActions.FETCH_COLLECTION_PENDING());
		const collectionRef = collection(db, key);
		const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
			debugSnapshot(snapshot);
			const collectionMap = convertCollectionToMap(snapshot);
			dispatch(ShopActions.FETCH_COLLECTION_COMPLETED(collectionMap));
		});

		return () => {
			console.log('unsubscribe onSnapshot');
			unsubscribe();
		};
	}, [dispatch, key]); // NOTE: only run once it is mounted
}
