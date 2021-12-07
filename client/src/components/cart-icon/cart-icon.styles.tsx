import styled from 'styled-components';

import { ReactComponent as ShoppingBag } from '../../assets/shopping-bag.svg';

interface CartIconContainerProps extends React.HTMLAttributes<HTMLElement> {
	onClick: (e: React.SyntheticEvent) => void;
}
export const CartIconContainer = styled.div<CartIconContainerProps>`
	width: 45px;
	height: 45px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;

interface ShoppingIconProps {}
export const ShoppingIcon = styled(ShoppingBag)<ShoppingIconProps>`
	width: 24px;
	height: 24px;
`;

interface ItemCountProps {}
export const ItemCount = styled.span<ItemCountProps>`
	position: absolute;
	font-size: 10px;
	font-weight: bold;
	bottom: 12px;
`;
