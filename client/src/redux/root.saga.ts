import { all, call } from 'redux-saga/effects';
import { userSagas } from 'sagas/user.sagas';
import { shopSagas } from 'sagas/shop.sagas';
import { cartSaga } from 'sagas/cart.sagas';

export default function* rootSaga() {
	const sagas = [userSagas, shopSagas, cartSaga].map((saga) => call(saga));
	yield all(sagas);
}
