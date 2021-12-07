import React from 'react';
import './cart-dropdown.styles.scss';

// Redux Store
import {
	selectCartHidden,
	// selectCartItems,
	toggleHidden,
} from '../../redux/cart/cart.slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

// React Router
import { useNavigate } from 'react-router-dom';

// Custom React Component
import CustomButton from '../custom-button/custom-button.component';
import CartList from '../cart-list/cart-list.component';
import { useStripPayment } from 'hooks/use-stripe.hook';
import { selectStripeCartLineItems } from 'redux/cart/cart.slice';

function CartDropDown() {
	// React Router Hooks
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const items = useAppSelector(selectStripeCartLineItems);
	const { createPaymentIntent } = useStripPayment(items);

	// Redux Store Hooks
	const hidden = useAppSelector(selectCartHidden);

	const handleClick = async () => {
		console.log('hello');
		dispatch(toggleHidden());
		createPaymentIntent();
		// navigate('/checkout');
	};

	return hidden ? null : (
		<div className='cart-dropdown'>
			<CartList />
			<CustomButton content='GO TO CHECKOUT NOW' onClick={handleClick} />
		</div>
	);
}

export default CartDropDown;
