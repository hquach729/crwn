import React from 'react';

// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useAppDispatch } from '../../redux/hooks';
import {
	getCollections,
	convertCollectionToMap,
} from '../../firebase/firebase.util';
import { onSnapshot } from 'firebase/firestore';

import {
	fetchCollectionPendingAsync,
	setCollection,
	fetchCollectionFailAsync,
} from './collection.actions';
import { Collection } from '../../types';

export function useCollection() {
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		const { collectionRef } = getCollections('items');
		dispatch(fetchCollectionPendingAsync);

		const unsubscribeOnSnapShot = onSnapshot(
			collectionRef,
			(snapShot) => {
				const collectionMap = convertCollectionToMap(snapShot) as Collection;
				dispatch(setCollection(collectionMap));
			},
			(error) => {
				if (error instanceof Error) {
					dispatch(fetchCollectionFailAsync(error.message));
				} else {
					dispatch(fetchCollectionFailAsync(error as any));
				}
			}
		);

		return () => {
			unsubscribeOnSnapShot();
		};
	}, [dispatch]);
}
