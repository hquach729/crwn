import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import { createLogger } from 'redux-logger';
import rootReducer from './root.reducer';
import rootSaga from './root.saga';
import createSagaMiddleware from 'redux-saga';

const logger = createLogger({
	collapsed: true,
});

const saga = createSagaMiddleware();

const middlewares = [saga, logger];

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		process.env.NODE_ENV === 'development'
			? getDefaultMiddleware({
					serializableCheck: {
						ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
					},
			  }).concat(...middlewares)
			: getDefaultMiddleware({
					serializableCheck: {
						ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
					},
			  }).concat(...middlewares),
});

saga.run(rootSaga);
// console.groupEnd();
console.groupCollapsed('PERSIST');
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
const datastore = { store, persistor };
export default datastore;
