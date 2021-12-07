import React from 'react';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { selectCurrentUser, UserActions } from 'redux/user/user.slice';
import CartIcon from 'components/cart-icon/cart-icon.component';
import { OptionsContainer, OptionLink } from 'components/header/header.styles';

export function MenuNav() {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector(selectCurrentUser);

	const path = currentUser ? '/' : '/signin';
	const content = currentUser ? 'Sign Out' : 'Sign In';

	const handleClick = () =>
		currentUser && dispatch(UserActions.SIGN_OUT_START());

	return (
		<OptionsContainer>
			<OptionLink to='/shop'>Shop</OptionLink>
			<OptionLink to='/contact'>Contact</OptionLink>
			<OptionLink to='/stripe '>Stripe</OptionLink>
			<OptionLink to={path} onClick={handleClick}>
				{content}
			</OptionLink>
			<CartIcon />
		</OptionsContainer>
	);
}

export default MenuNav;
