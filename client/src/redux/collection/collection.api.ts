import { createAsyncThunk } from '@reduxjs/toolkit';

import {
	getCollections,
	convertCollectionToMap,
} from '../../firebase/firebase.util';
import { getDocs } from 'firebase/firestore';
import { Collection } from '../../types';

const Project = {
	name: 'crwn-db',
	id: 'crwn-db-1db97',
	number: '292051714517',
	location: 'nam5 (us-central)',
	apiKey: 'AIzaSyCfJM-4F99m-8rcg9TPtLOiqYoxXeJKRcc',
	url: 'https://firestore.googleapis.com/v1/projects/',
};

export type FetchCollectionError = {
	message: string;
};

// Import this function into our class
export const fetchCollection = createAsyncThunk<
	Collection,
	string,
	{ rejectValue: FetchCollectionError }
>('collection/fetch', async (key: string, thunkApi) => {
	const { collectionRef } = getCollections(key);
	const snapshot = await getDocs(collectionRef);

	// thunkApi.dispatch(fetchCollection.pending());

	if (snapshot.empty) {
		return thunkApi.rejectWithValue({
			message: 'Snapshot empty',
		});
	}

	// This is the value being dispatch to our extraReducer
	return convertCollectionToMap(snapshot);
});

interface FirebaseRestCollectionAPI {
	baseUrl: string;
	projectId: string;
	collection: string;
	id?: string;
}
const firebaseDocUrl = (url: FirebaseRestCollectionAPI) => {
	return `${url.baseUrl}/${url.projectId}/databases/(default)/documents/${
		url.collection
	}/${url.id || ''}`;
};

/**
 *
 * @param url
 * @returns
 */
interface ApiUrl extends FirebaseRestCollectionAPI {}
const firebaseRestGetCollection = async (url: ApiUrl): Promise<Collection> => {
	return new Promise((resolve, reject) => {
		fetch(firebaseDocUrl(url))
			.then((response) => response.json())
			.then((collections) => {
				console.log({ collections });
				resolve(collections);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

/**
 *
 * @param collection
 * @returns
 */
export const fetchCollectionRestApi = async (collection: string) => {
	const collectionUrl = {
		baseUrl: Project.url,
		projectId: Project.id,
		collection,
	} as ApiUrl;

	try {
		return await firebaseRestGetCollection(collectionUrl);
	} catch (error) {
		throw error;
	}
};
