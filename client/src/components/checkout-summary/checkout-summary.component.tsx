import React from 'react';
import './checkout-summary.styles.scss';

// Redux
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
	selectCheckoutCartItems,
	selectCartItemTotalPrice,
	increaseCartItemQty as increaseQty,
	decreaseCartItemQty as decreaseQty,
	removeCartItem,
} from 'redux/cart/cart.slice';

import { useNavigate } from 'react-router';
import CustomButton from 'components/custom-button/custom-button.component';

const headers = ['Product', 'Description', 'Quantity', 'Price', 'Remove'];

export default function CheckoutSummary() {
	const cartItems = useAppSelector(selectCheckoutCartItems);
	const cartTotal = useAppSelector(selectCartItemTotalPrice);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	return (
		<div className='checkout-page'>
			<div className='checkout-header'>
				{headers.map((name, index) => (
					<div key={index} className='header-block'>
						{name}
					</div>
				))}
			</div>
			{cartItems
				? cartItems.map(({ imageUrl, name, qty, id, price }) => (
						<div key={id} className='checkout-item'>
							<div className='image-container'>
								<img src={imageUrl} alt={name} />
							</div>
							<span className='name'>{name}</span>
							<span className='quantity'>
								<div
									className='arrow'
									onClick={() => dispatch(decreaseQty({ name }))}
								>
									&#10094;
								</div>
								<span className='value'>{qty}</span>
								<div
									className='arrow'
									onClick={() => {
										dispatch(increaseQty({ name }));
									}}
								>
									&#10095;
								</div>
							</span>
							<span className='price'>{price}</span>
							<div
								className='remove-button'
								onClick={() => {
									console.log('delete click');
									dispatch(removeCartItem({ name }));
								}}
							>
								&#10005;
							</div>
						</div>
				  ))
				: null}
			<div className='total'>
				<span>TOTAL: ${cartTotal}</span>
			</div>
			<CustomButton onClick={() => navigate('/checkout/form')}>
				Pay Now
			</CustomButton>
			{/* <button onClick={() => navigate('/checkout/form')}>Pay Now</button> */}
		</div>
	);
}
