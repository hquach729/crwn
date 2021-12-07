import { Collection, CollectionAction } from '../../types';

/**
 * Action: Fetch Collection Start
 * @returns
 */
export const fetchCollectionStartAsync = (): CollectionAction => ({
	type: 'FETCH_COLLECTION_START',
	payload: null,
});

/**
 * Action: Fetch Collection Pending
 * @returns
 */
export const fetchCollectionPendingAsync = (): CollectionAction => ({
	type: 'FETCH_COLLECTION_PENDING',
	payload: null,
});

/**
 * Action: Fetch Collection Completed
 * @param collection
 * @returns
 */
export const setCollection = (collection: Collection): CollectionAction => ({
	type: 'FETCH_COLLECTION_COMPLETED',
	payload: collection,
});

/**
 * Action: Fetch Collection Fail Function
 * @param errorMessage
 * @returns
 */
export const fetchCollectionFailAsync = (
	errorMessage: string
): CollectionAction => ({
	type: 'FETCH_COLLECTION_FAIL',
	payload: errorMessage,
});
