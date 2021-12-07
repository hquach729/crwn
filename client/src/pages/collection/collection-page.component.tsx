import React from 'react';
import './collection.styles.scss';
// import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useAppSelector } from '../../redux/hooks';
// import { addCartItem } from '../../redux/cart/cart.slice';
import { useParams } from 'react-router-dom';
import CollectionItem from '../../components/collection-item/collection-item.component';
import {
	selectLoading,
	selectCollectionById,
	// Item,
} from 'redux/shop/shop.slice';
import Spinner from '../../components/spinner/spinner.component';
import { useDebugComponent } from 'hooks/use-debug.hook';

/**
 * TODO: add comment and description
 * @returns
 */
export default function CollectionPage() {
	// NOTE: state hooks
	// const dispatch = useAppDispatch();
	const loading = useAppSelector(selectLoading);
	const { categoryId } = useParams<'categoryId'>();
	const collection = useAppSelector(selectCollectionById(categoryId));

	// NOTE: remove debug in production environment
	const { showStateUse } = useDebugComponent({
		componentName: CollectionPage.name,
		type: 'component',
		state: {
			loading,
			categoryId,
			collection,
		},
	});

	// NOTE: React Router hooks
	React.useEffect(() => {
		showStateUse(); // fire on every initial mount, and subsequence render
	});

	const { title, items } = collection;

	return loading ? (
		<Spinner />
	) : (
		<div className='collection-page'>
			<div className='title'>{title}</div>
			<div className='items'>
				{items.map((item) => (
					<CollectionItem key={item.id} item={item} />
				))}
			</div>
		</div>
	);
}
