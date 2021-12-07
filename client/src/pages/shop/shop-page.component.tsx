import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { FetchType, useFirebase } from 'hooks/use-firebase.effect';
import { ShopPageContainer } from './shop-page.styles';
import CollectionOverview from 'components/collection-overview/collection-overview.component';
import CollectionPage from 'pages/collection/collection-page.component';

/**
 * This component will render either a collection overview page or a collection
 * page based on the url coming in. When the component is mounted, it will
 * fetch a collection from our backend
 *
 * @returns { JSX.Element } a shop page showing shop collection
 */
function ShopPage() {
	useFirebase({ type: FetchType.FIREBASE_OBSERVABLE, key: 'items' });

	return (
		<ShopPageContainer>
			<Routes>
				<Route path='/' element={<CollectionOverview />} />
				<Route path=':categoryId' element={<CollectionPage />} />
			</Routes>
		</ShopPageContainer>
	);
}

export default ShopPage;
