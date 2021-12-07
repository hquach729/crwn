/**
 * Redux Collection
 *
 * @packageReduxCollection
 */

/**
 * Collection Action Types
 */
export type CollectionActionTypes =
	| 'FETCH_COLLECTION_START'
	| 'FETCH_COLLECTION_PENDING'
	| 'FETCH_COLLECTION_COMPLETED'
	| 'FETCH_COLLECTION_FAIL';
/**
 * Collection Item Object
 */
export interface CollectionItem {
	/**
	 *
	 */
	id: number;
	/**
	 *
	 */
	name: string;
	/**
	 *
	 */
	imageUrl: string;
	/**
	 *
	 */
	price: number;
}
/**
 *
 */
export interface Collection {
	/**
	 *
	 */
	[key: string]: {
		/**
		 *
		 */
		id: string;
		/**
		 *
		 */
		title: string;
		/**
		 *
		 */
		routeName: string;
		/**
		 *
		 */
		items: CollectionItem[];
	};
}
/**
 *
 */
export interface CollectionState {
	/**
	 *
	 */
	collection: Collection | null;
	/**
	 *
	 */
	loading: boolean;
	/**
	 *
	 */
	error: string | null;
}
/**
 *
 */
export interface CollectionAction {
	/**
	 *
	 */
	type: CollectionActionTypes;
	/**
	 *
	 */
	payload: Collection | error | null;
}

/**
 *
 */
export interface CollectionItems {
	/**
	 *
	 */
	collectionKey: string;
	/**
	 *
	 */
	objectToAdd: any[];
}
