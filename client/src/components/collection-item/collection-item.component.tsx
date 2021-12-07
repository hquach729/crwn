import React, { HTMLAttributes } from 'react';
import './collection-item.styles.scss';

import CustomButton from '../custom-button/custom-button.component';
import { CollectionItem as Item } from '../../types';
import { useAppDispatch } from 'redux/hooks';
import { addCartItem } from 'redux/cart/cart.slice';

// NOTE: this is how we extends our custom component to have other html attributes
interface CollectionItemProps extends HTMLAttributes<HTMLDivElement> {
	item: Item;
}

function CollectionItem(props: CollectionItemProps) {
	const dispatch = useAppDispatch();

	const { item } = props;
	const { id, imageUrl, name, price } = item;

	return (
		<div key={id} className='collection-item'>
			<div className='image' style={{ backgroundImage: `url(${imageUrl})` }} />
			<div className='collection-footer'>
				<span className='name'>{name}</span>
				<span className='price'>{`$${price}`}</span>
			</div>

			<CustomButton
				className='custom-button'
				inverted
				content='Add to Cart'
				onClick={() => dispatch(addCartItem({ item: { ...item, qty: 1 } }))}
			/>
		</div>
	);
}

export default CollectionItem;
