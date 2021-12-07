import { put, takeLatest, call, all } from 'redux-saga/effects';
import { cartClear } from 'redux/cart/cart.slice';
import { UserActions } from 'redux/user/user.slice';

export function* onSignOutSuccess() {
	yield takeLatest(UserActions.SIGN_OUT_SUCCESS.type, clearCartOnSignOut);
}

export function* clearCartOnSignOut() {
	yield put(cartClear());
}

const sagas = [onSignOutSuccess].map((saga) => {
	console.log(`%c${saga.name}`, 'background: #222; color: #bada55');
	return call(saga);
});
export function* cartSaga() {
	yield all(sagas);
}
