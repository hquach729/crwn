import { combineReducers } from 'redux';
import { PersistConfig, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import directoryReducer from './directory/directory.slice';
import cartReducer from './cart/cart.slice';
import shopReducer from 'redux/shop/shop.slice';
import userReducer from './user/user.slice';

// // NOTE: Debug Saga listener
// console.groupCollapsed('SAGA LISTENERS');

const rootReducer = combineReducers({
	directory: directoryReducer,
	shop: shopReducer,
	cart: cartReducer,
	user: userReducer,
});

type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
	key: 'root',
	storage,
	whitelist: ['directory', 'cart', 'shop', 'user'],
};

export default persistReducer(persistConfig, rootReducer);
