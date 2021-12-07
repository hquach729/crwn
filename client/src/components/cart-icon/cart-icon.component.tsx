import React from 'react';

// Redux Store Hooks
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
	selectCartItemTotalQty,
	toggleHidden,
} from '../../redux/cart/cart.slice';

import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';

export default function CartIcon() {
	const totalQty = useAppSelector(selectCartItemTotalQty);
	const dispatch = useAppDispatch();

	const handleClick = (event: React.SyntheticEvent) => {
		event.preventDefault();
		dispatch(toggleHidden());
	};

	return (
		<CartIconContainer onClick={handleClick}>
			<ShoppingIcon />
			<ItemCount>{totalQty}</ItemCount>
		</CartIconContainer>
	);
}

// import React from 'react';
// // import './cart-icon.styles.scss';

// // Redux Store Hooks
// import { useAppSelector, useAppDispatch } from '../../redux/hooks';
// import {
// 	selectCartItemTotalQty,
// 	toggleHidden,
// } from '../../redux/cart/cart.slice';

// // Custom Component
// // import { ReactComponent as ShoppingBag } from '../../assets/shopping-bag.svg';

// import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';

// function CartIcon() {
// 	const cartItemTotal = useAppSelector(selectCartItemTotalQty);
// 	const dispatch = useAppDispatch();

// 	const handleClick = (e: React.SyntheticEvent) => {
// 		dispatch(toggleHidden());
// 	};

// 	return (
// 		<CartIconContainer onClick={handleClick}>
// 			<ShoppingIcon />
// 			<ItemCount> {cartItemTotal}</ItemCount>
// 		</CartIconContainer>
// 		// <CartIcon onClick={handleClick}></CartIcon>
// 		// <div className='cart-icon' onClick={handleClick}>
// 		// 	<ShoppingBag className='shopping-icon' />
// 		// 	<span className='item-count'>{cartItemTotal}</span>
// 		// </div>
// 	);
// }

// export default CartIcon;
