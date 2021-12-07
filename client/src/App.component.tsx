import React, { useState } from 'react';
import './App.css';
import { AppContainer } from './App.styles';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Header } from './components';
import { Home, Shop, SignIn, Checkout } from './pages';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { selectCurrentUser, UserActions } from 'redux/user/user.slice';

export function App() {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector(selectCurrentUser);
	// const [name, setName] = useLocalStorage<string>('name', 'Bob');

	React.useEffect(() => {
		document.title = 'Crown Clothing';
		dispatch(UserActions.CHECK_USER_SESSION());
	}, [dispatch]); // NOTE: prevent dispatch from going into a loop

	return (
		<AppContainer>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/shop/*' element={<Shop />} />
				<Route
					path='/signin'
					element={currentUser ? <Navigate to='/' /> : <SignIn />}
				/>
				<Route path='/checkout' element={<Checkout />} />
			</Routes>
		</AppContainer>
	);
}
export default App;

// Use Storage Hooks
export function useLocalStorage<T>(
	key: string,
	initialValue: T // allow us to use any type for initialValue instead of just string
): [T, (value: T | ((val: T) => T)) => void] {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key);
			// Parse stored json or if none return initialValue
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			// If error also return initialValue
			console.log(error);
			return initialValue;
		}
	});

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = (value: T | ((val: T) => T)) => {
		try {
			// Allow value to be a function so we have same API as useState
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			// Save state
			setStoredValue(valueToStore);
			// Save to local storage
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			// A more advanced implementation would handle the error case
			console.log(error);
		}
	};

	return [storedValue, setValue];
}
