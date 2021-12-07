import React from 'react';
import './cart-dropdown.styles.scss';
/**
 * HOOKS: REDUX
 */
import {
	selectCartHidden,
	// selectStripeCartLineItems,
	toggleHidden,
} from 'redux/cart/cart.slice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

/**
 * HOOKS: REACT ROUTER
 */
import { useNavigate } from 'react-router-dom';

/**
 * CUSTOM REACT COMPONENT
 */
import CustomButton from '../custom-button/custom-button.component';
import CartList from '../cart-list/cart-list.component';
// import { useStripPayment } from 'hooks/use-stripe.hook';

function CartDropDown() {
	// NOTE: React will make sure not to assign both dispatch and navigate
	// again when the component render.
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	// const items = useAppSelector(selectStripeCartLineItems);
	// const { createPaymentIntent } = useStripPayment(items);

	// NOTE: React will keep track of the state hidden value and render
	// our component when the value of hidden change
	const hidden = useAppSelector(selectCartHidden);

	const handleClick = () => {
		dispatch(toggleHidden());
		// createPaymentIntent();
		navigate('/checkout');
	};

	return hidden ? null : (
		<div className='cart-dropdown'>
			<CartList />
			<CustomButton content='GO TO CHECKOUT' onClick={handleClick} />
		</div>
	);
}

export default CartDropDown;
