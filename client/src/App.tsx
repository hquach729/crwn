import { useEffect } from 'react';
import './App.css';
import { AppContainer } from './App.styles';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Header } from './components';
import { Home, Shop, SignIn, Checkout } from './pages';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { selectCurrentUser, UserActions } from 'redux/user/user.slice';
import StripeCheckout from 'components/stripe/stripe.component';
import Success from 'pages/success/success.component';
import Cancel from 'pages/cancel/cancel.component';

function App() {
	// NOTE:
	// Redux Hooks, this give us a dispatch object
	// REACT will keep tract of this component to run one time
	const dispatch = useAppDispatch();

	// NOTE:
	// this two value below will always change when it's state is change
	const currentUser = useAppSelector(selectCurrentUser);

	// NOTE:
	// This effect will run one time once the component mount, Only when currentUser is null
	// then this effect will fire a dispatch, to update the current user, it currentUser ever
	// change, it will update the document title, but not fire a dispatch again if currentUser
	// is not null
	useEffect(() => {
		// console.log('useEffect 1');
		dispatch(UserActions.CHECK_USER_SESSION());
	}, [dispatch]);

	// This will always run when a component get render
	useEffect(() => {
		// console.log('useEffect 2', currentUser);
		document.title = `CROWN CLOTHING ${currentUser?.displayName || ''}`;
	}, [currentUser]);

	return (
		// NOTE:
		// each time re render, useEffect will be call again, unless we put in a dependencies
		// <AppContainer>
		// 	<Header />
		// 	<Routes>
		// 		<Route path='/' element={<Home />} />
		// 		<Route path='/shop/*' element={<Shop />} />
		// 		<Route
		// 			path='/signin'
		// 			element={currentUser ? <Navigate to='/' /> : <SignIn />}
		// 		/>
		// 		<Route path='/checkout' element={<Checkout />} />
		// 		<Route path='/stripe' element={<StripeCheckout />} />
		// 		<Route path='/success' element={<Success />} />
		// 		<Route path='/cancel' element={<Cancel />} />
		// 	</Routes>
		// </AppContainer>

		<AppContainer>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='shop/*' element={<Shop />} />
				<Route
					path='signin'
					element={currentUser ? <Navigate to='/' /> : <SignIn />}
				/>
				<Route path='checkout/*' element={<Checkout />} />
				<Route path='stripe' element={<StripeCheckout />} />
				<Route path='success' element={<Success />} />
				<Route path='cancel' element={<Cancel />} />
			</Routes>
		</AppContainer>
	);
}

export default App;
