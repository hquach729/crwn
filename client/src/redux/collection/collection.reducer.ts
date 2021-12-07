import type { CollectionAction, CollectionState } from '../../types';

export const initialState: CollectionState = {
	collection: null,
	loading: false,
	error: null,
};

export const collectionReducer = (
	state = initialState,
	action: CollectionAction
): CollectionState => {
	switch (action.type) {
		case 'FETCH_COLLECTION_START':
			return { ...state, loading: true };
		case 'FETCH_COLLECTION_PENDING':
			return { ...state, loading: true };
		case 'FETCH_COLLECTION_COMPLETED':
			return {
				...state,
				loading: false,
				collection: action.payload,
			};
		case 'FETCH_COLLECTION_FAIL':
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default collectionReducer;
