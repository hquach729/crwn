// import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../store';
// import memoize from 'lodash.memoize';
// import { fetchCollection } from './collection.api';

// Only typescript support this enum format
// export enum CollectionStatus {
// 	START = 'start',
// 	PENDING = 'pending',
// 	FAIL = 'fail',
// 	COMPLETED = 'completed',
// 	LOADING = 'loading',
// 	IDLE = 'idle',
// }

// export type CollectionItem = {
// 	id: number;
// 	name: string;
// 	imageUrl: string;
// 	price: number;
// };

// export type Collection = {
// 	[key: string]: {
// 		id: string;
// 		title: string;
// 		routeName: string;
// 		items: CollectionItem[];
// 	};
// };

// export type CollectionState = {
// 	list: Collection;
// 	status: CollectionStatus;
// 	error?: string;
// 	loading: boolean;
// };

// const initialState = {
// 	list: {},
// 	error: undefined,
// 	status: CollectionStatus.IDLE,
// 	loading: false,
// } as CollectionState;

// export const collectionSlice = createSlice({
// 	name: 'collection',
// 	initialState,
// 	reducers: {
// 		fetchAsyncStart: () => {},
// 		fetchAsyncPending: () => {},
// 		fetchAsyncCompleted: () => {},
// 		fetchAsyncError: () => {},
// 		setList: (state, { payload }: PayloadAction<{ list: Collection }>) => {
// 			state.list = payload.list;
// 		},
// 		setError: (state, { payload }: PayloadAction<{ error?: string }>) => {
// 			state.error = payload.error;
// 		},
// 		setStatus: (
// 			state,
// 			{ payload }: PayloadAction<{ status: CollectionStatus }>
// 		) => {
// 			state.status = payload.status;
// 		},
// 		setLoading: (state, { payload }: PayloadAction<{ loading: boolean }>) => {
// 			state.loading = payload.loading;
// 		},
// 	},
// 	extraReducers: (builder) => {
// 		// for thunk async action
// 		builder.addCase(fetchCollection.pending, (state, action) => {
// 			state.status = CollectionStatus.LOADING;
// 			state.loading = true;
// 		});
// 		builder.addCase(fetchCollection.fulfilled, (state, action) => {
// 			console.log(action.payload);
// 			state.list = action.payload;
// 			state.status = CollectionStatus.IDLE;
// 			state.loading = false;
// 		});
// 		builder.addCase(fetchCollection.rejected, (state, action) => {
// 			if (action.payload) {
// 				state.error = action.payload.message;
// 			}
// 			state.status = CollectionStatus.IDLE;
// 		});
// 	},
// });

// Collection Actions:
// export const {
// 	setList,
// 	setError,
// 	setStatus,
// 	setLoading,
// 	fetchAsyncStart,
// 	fetchAsyncCompleted,
// 	fetchAsyncPending,
// 	fetchAsyncError,
// } = collectionSlice.actions;

// export const Action = collectionSlice.actions;

// Collection Reducer to be pass to Store
// export default collectionSlice.reducer;

// export const selectCollection = (state: RootState) => state.collection;
// export const selectList = createSelector(
// 	[selectCollection],
// 	(collection) => collection.list
// );
// export const selectError = createSelector(
// 	[selectCollection],
// 	(collection) => collection.error
// );
// export const selectStatus = createSelector(
// 	[selectCollection],
// 	(collection) => collection.status
// );
// export const selectLoading = createSelector(
// 	[selectCollection],
// 	(collection) => collection.loading
// );

// export const selectPreviewCollection = memoize(
// 	({ itemPerRow = 4 }: { itemPerRow?: number }) =>
// 		createSelector([selectList], (list) =>
// 			Object.keys(list)
// 				.map((key) => list[key])
// 				.map((collection) => {
// 					return {
// 						...collection,
// 						items: collection.items.filter((_, idx) => idx < itemPerRow),
// 					};
// 				})
// 		)
// );

// export type UrlParam = 'hats' | 'sneakers' | 'womens' | 'mens' | 'jackets';

// export const selectByCollectionParam = memoize((urlParam: UrlParam) =>
// 	createSelector([selectList], (list) =>
// 		list[urlParam] ? list[urlParam] : undefined
// 	)
// );

// import { createSlice } from '@reduxjs/toolkit';

// export const shop
export {};
