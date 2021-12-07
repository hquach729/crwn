import { FirebaseError } from '@firebase/util';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { memoize } from 'lodash';
import { RootState } from 'redux/store';

export interface Item {
	id: number;
	name: string;
	imageUrl: string;
	price: number;
}

export interface ShopCollection {
	[key: string]: {
		id: string;
		title: string;
		routeName: string;
		items: Item[];
	};
}
export interface Collection {
	id: string;
	title: string;
	routeName: string;
	items: Item[];
}

export interface ShopCollectionState {
	collections: ShopCollection | null;
	loading: boolean;
	error: Error | FirebaseError | string | null;
}

export enum ShopCollectionActionTypes {
	FETCH_COLLECTION_START = 'FETCH_COLLECTION_START',
	FETCH_COLLECTION_PENDING = 'FETCH_COLLECTION_PENDING',
	FETCH_COLLECTION_COMPLETED = 'FETCH_COLLECTION_COMPLETED',
	FETCH_COLLECTION_FAIL = 'FETCH_COLLECTION_FAIL',
}

const initialState: ShopCollectionState = {
	collections: null,
	loading: false,
	error: null,
};

export const shopSlice = createSlice({
	name: 'shop',
	initialState: initialState,
	reducers: {
		[ShopCollectionActionTypes.FETCH_COLLECTION_START]: (
			state,
			action: PayloadAction<string>
		) => {
			// console.log({ state, action });
		},
		[ShopCollectionActionTypes.FETCH_COLLECTION_PENDING]: (state) => {
			// console.log(action.payload.loading);
			state.loading = true;
		},
		[ShopCollectionActionTypes.FETCH_COLLECTION_COMPLETED]: (state, action) => {
			state.collections = action.payload;
			state.loading = false;
			state.error = null;
		},
		[ShopCollectionActionTypes.FETCH_COLLECTION_FAIL]: (state, action) => {
			state.collections = null;
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const selectShop = (state: RootState) => state.shop;

export const selectCollection = createSelector(
	[selectShop],
	(shop) => shop.collections || {}
);
export const selectError = createSelector([selectShop], (shop) => shop.error);
export const selectLoading = createSelector(
	[selectShop],
	(shop) => shop.loading
);

export const selectPreviewCollection = memoize(
	({ itemPerRow = 4 }: { itemPerRow?: number }) =>
		createSelector([selectCollection], (collections) =>
			Object.keys(collections)
				.map((key) => collections[key])
				.map((collection) => {
					return {
						...collection,
						items: collection.items.filter((_, idx) => idx < itemPerRow),
					};
				})
		)
);
// export type UrlParam = 'hats' | 'sneakers' | 'womens' | 'mens' | 'jackets';

// export const selectByCollectionParam = memoize((urlParam: UrlParam) =>
export const selectByCollectionParam = memoize((urlParam: any) =>
	createSelector([selectCollection], (collections) =>
		collections[urlParam] ? collections[urlParam] : undefined
	)
);

export const selectCollectionById = memoize((urlParm: any) =>
	createSelector(
		[selectCollection],
		(collections) =>
			Object.keys(collections)
				.map((key) => {
					return collections[key];
				})
				.filter((collection) => collection.id === urlParm)[0]
	)
);
// export const selectByCollectionParam = memoize((urlParam: any) =>
// 	createSelector([selectShop], (collections) => collections!)
// );

export const ShopActions = shopSlice.actions;
export default shopSlice.reducer;
