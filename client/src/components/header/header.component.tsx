import React from 'react';
import { HeaderContainer } from './header.styles';

import CrownLogo from '../logo/logo.component';
import MenuNav from '../menu-nav/menu-nav.component';
// import CartDropDown from '../cart-dropdown/cart-dropdown.component';
import CartDropDown from '../cart-dropdown/cart-dropdown';

export function Header() {
	return (
		<HeaderContainer>
			<CrownLogo />
			<MenuNav />
			<CartDropDown />
		</HeaderContainer>
	);
}

export default Header;
