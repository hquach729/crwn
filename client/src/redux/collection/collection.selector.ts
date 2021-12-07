import type { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';
// import memoize from 'lodash.memoize';
// import { Collection } from '../../types';
// import { UrlParam } from './collection.slice';
// import { UrlParam } from 'redux/shop/shop.slice';

export const selectShop = (state: RootState) => state.shop;
// export const selectCollection = createSelector(
// 	[selectShop],
// 	(shop) => shop.collection
// );
export const selectLoading = createSelector(
	[selectShop],
	(shop) => shop.loading
);

// const convertCollectionToMap = (collections: Collection, itemPerRow: number) =>
// 	Object.keys(collections)
// 		.map((key) => collections[key])
// 		.map((collection) => {
// 			return {
// 				...collection,
// 				items: collection.items.filter((_, idx) => idx < itemPerRow),
// 			};
// 		});

// export const selectPreviewCollection = memoize(
// 	({ itemPerRow = 4 }: { itemPerRow?: number }) =>
// 		createSelector(
// 			[selectCollection],
// 			(collections) =>
// 				collections && convertCollectionToMap(collections, itemPerRow)
// 		)
// );

// export const selectByCollectionParam = memoize((urlParam: UrlParam) =>
// 	createSelector(
// 		[selectCollection],
// 		(collections) => collections && collections[urlParam]
// 	)
// );
