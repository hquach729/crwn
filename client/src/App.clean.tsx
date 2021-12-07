import { useEffect } from 'react';
import './App.css';
import { AppContainer } from './App.styles';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Header } from './components';
import { Home, Shop, SignIn, Checkout } from './pages';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { selectCurrentUser, UserActions } from 'redux/user/user.slice';

function App() {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector(selectCurrentUser);

	useEffect(() => {
		dispatch(UserActions.CHECK_USER_SESSION());
	}, [dispatch]);

	useEffect(() => {
		document.title = `CROWN CLOTHING ${currentUser?.displayName || ''}`;
	}, [currentUser]);

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
