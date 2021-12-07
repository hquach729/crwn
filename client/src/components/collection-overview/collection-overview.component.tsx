import React from 'react';
import { useAppSelector } from 'redux/hooks';
import { selectLoading, selectPreviewCollection } from 'redux/shop/shop.slice';
import { CollectionOverviewContainer as OverviewContainer } from 'components/collection-overview/collection-overview.styles';
import Spinner from 'components/spinner/spinner.component';
// import CollectionPreview from 'components/collection-preview/collection-preview.component';
import CollectionPreview from 'components/collection-preview/collection-preview.class';

function CollectionOverview() {
	const loading = useAppSelector(selectLoading);
	const collections = useAppSelector(
		selectPreviewCollection({ itemPerRow: 4 })
	);

	const renderPreview = () =>
		collections.map((collection) => (
			<CollectionPreview collection={collection} key={collection.id} />
		));

	return loading ? (
		<Spinner />
	) : (
		<OverviewContainer>{renderPreview()}</OverviewContainer>
	);
}

export default CollectionOverview;
