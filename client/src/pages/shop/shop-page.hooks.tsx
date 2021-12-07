import React from 'react';
import { ShopPageContainer } from './shop-page.styles';

import { Route, Routes } from 'react-router-dom';
// import { useShopSelector } from '../../hooks/shop';

import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection-page.component';
import Spinner from '../../components/spinner/spinner.component';

// function ShopPage() {
// 	// console.log('shop page');
// 	// useShopFirebase();
// 	const { loading } = useShopSelector();

// 	React.useEffect(() => {
// 		document.title = 'Shop Page';
// 	}, []);

// 	return (
// 		<ShopPageContainer>
// 			<Routes>
// 				<Route
// 					path='/'
// 					element={loading ? <Spinner /> : <CollectionOverview />}
// 				/>
// 				<Route
// 					path=':categoryId'
// 					element={loading ? <Spinner /> : <CollectionPage />}
// 				/>
// 			</Routes>
// 		</ShopPageContainer>
// 	);
// }

// export default ShopPage;
export {};
