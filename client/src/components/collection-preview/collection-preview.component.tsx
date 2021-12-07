import React from 'react';

// Redux
import { useAppDispatch } from 'redux/hooks';
import { addCartItem } from 'redux/cart/cart.slice';
import { Collection } from 'redux/shop/shop.slice';

// Styled Component
import {
	CollectionPreviewContainer as PreviewContainer,
	CollectionItemContainer as ItemContainer,
	CollectionImage as Image,
	Title,
	CollectionFooter as Footer,
	Preview,
	CollectionName as Name,
	CollectionPrice as Price,
	AddItemButton,
} from 'components/collection-preview/collection-preview.styled';

// React Router
import { useNavigate, useLocation } from 'react-router';

// React Component
import { CollectionItem } from 'types/collection';

/**
 *
 * @interface CollectionPreviewProps
 * @description
 *
 */
export interface CollectionPreviewProps {
	collection: Collection;
}

/**
 * A component that show a preview of items of a given collection with the
 * ability to add cart item using dispatch action to update the redux store
 * state. It will allow user to navigate to the full collection page upon user
 * click on the collection title
 *
 * @param { React.ComponentProps } props collection
 * @returns {Object}
 * @return {JSX.Element} a render jsx element.
 */
function CollectionPreview({ collection }: CollectionPreviewProps) {
	// NOTE: Hooks
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	// NOTE: dispatch action to redux store
	const handleAddItemClick = (item: CollectionItem) => {
		dispatch(addCartItem({ item: { ...item, qty: 1 } }));
	};

	// NOTE: run once
	React.useEffect(() => {
		console.log(`Component: ${CollectionPreview.name}`);
	}, []);

	return (
		<PreviewContainer key={collection.id}>
			<Title onClick={() => navigate(`${pathname}/${collection.id}`)}>
				{collection.title.toLocaleUpperCase()}
			</Title>
			<Preview>
				{collection.items.map((item) => (
					<ItemContainer key={item.id}>
						<Image className='image' imageUrl={item.imageUrl} />
						<Footer>
							<Name> {item.name}</Name>
							<Price>{`$${item.price}`}</Price>
						</Footer>
						<AddItemButton
							inverted
							content='Add to Cart'
							onClick={() => handleAddItemClick(item)}
						/>
					</ItemContainer>
				))}
			</Preview>
		</PreviewContainer>
	);
}

export default CollectionPreview;
