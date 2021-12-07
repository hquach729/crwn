import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface CartItem {
	id: number;
	name: string;
	imageUrl: string;
	price: number;
	qty: number;
}

export type CartItems = { [key: string]: CartItem };

export interface CartState {
	cartItems: CartItems;
	cartHidden: boolean;
}

const initialState: CartState = {
	cartItems: {},
	cartHidden: true,
};

export type CartItemCollection =
	| 'hats'
	| 'sneakers'
	| 'jackets'
	| 'womens'
	| 'mens';

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		cartClear: (state) => {
			state.cartItems = {};
		},
		addCartItem: (state, action: PayloadAction<{ item: CartItem }>) => {
			const { item } = action.payload;

			if (state.cartItems[item.name]) {
				state.cartItems[item.name].qty += 1;
			} else {
				state.cartItems[item.name] = item;
			}
		},
		toggleHidden: (state) => {
			state.cartHidden = !state.cartHidden;
		},
		increaseCartItemQty: (state, action: PayloadAction<{ name: string }>) => {
			const { name } = action.payload;
			state.cartItems[name].qty = state.cartItems[name].qty! + 1;
		},
		removeCartItem: (state, action: PayloadAction<{ name: string }>) => {
			const { name } = action.payload;
			delete state.cartItems[name];
		},
		decreaseCartItemQty: (state, action: PayloadAction<{ name: string }>) => {
			const { name } = action.payload;
			const updatedQty = state.cartItems[name].qty! - 1;

			if (updatedQty) {
				state.cartItems[name].qty = updatedQty;
			} else {
				// Remove cartItem from cart if the qty is 0
				delete state.cartItems[name];
			}
		},
	},
});

const selectCart = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
	[selectCart],
	(cart) => cart.cartItems
);
export interface StripeLineItem {
	price_data: {
		currency: string;
		product_data: {
			name: string;
		};
		unit_amount: number;
	};
	quantity: number;
}

export const selectStripeCartLineItems = createSelector(
	[selectCartItems],
	(cartItems) =>
		Object.keys(cartItems).map(
			(key): StripeLineItem => ({
				price_data: {
					currency: 'usd',
					product_data: {
						name: cartItems[key].name,
					},
					unit_amount: cartItems[key].price * 100,
				},
				quantity: cartItems[key].qty,
			})
		)
);

export const selectDropDownCartItems = createSelector(
	[selectCartItems],
	(cartItems) =>
		Object.keys(cartItems).length
			? Object.keys(cartItems).map((key) => cartItems[key])
			: null
);

export const selectCheckoutCartItems = createSelector(
	[selectCartItems],
	(cartItems) =>
		Object.keys(cartItems).length
			? Object.keys(cartItems).map((key) => cartItems[key])
			: null
);

export const selectCartHidden = createSelector(
	[selectCart],
	(cart) => cart.cartHidden
);

export const selectCartItemTotalPrice = createSelector(
	[selectCartItems],
	(cartItems) =>
		Object.keys(cartItems).reduce(
			(total, key) => (total += cartItems[key].qty * cartItems[key].price),
			0
		)
);
export const selectCartItemTotalQty = createSelector(
	[selectCartItems],
	(cartItems) =>
		Object.keys(cartItems).reduce(
			(total, key) => (total += cartItems[key].qty),
			0
		)
);

export const {
	addCartItem,
	toggleHidden,
	increaseCartItemQty,
	decreaseCartItemQty,
	removeCartItem,
	cartClear,
} = cartSlice.actions;

export default cartSlice.reducer;
