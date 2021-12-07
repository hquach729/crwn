import React from 'react';
import './cart-list.styles.scss';

import { useAppSelector } from '../../redux/hooks';
import { selectDropDownCartItems } from '../../redux/cart/cart.slice';

function CartList() {
	const cartItems = useAppSelector(selectDropDownCartItems);

	return (
		<div className='cart-list'>
			{cartItems ? (
				cartItems.map(({ id, imageUrl, name, qty, price }) => (
					<div key={id} className='cart-item'>
						<img src={imageUrl} alt={name} />
						<div className='item-details'>
							<span className='name'>{name}</span>
							<span className='price'>
								{qty} x ${price}
							</span>
						</div>
					</div>
				))
			) : (
				<span className='empty-message'>Your Cart is Empty</span>
			)}
		</div>
	);
}

export default CartList;
