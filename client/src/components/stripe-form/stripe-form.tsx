import React from 'react';
import './checkout.styles.scss';

// Redux
import { useAppSelector } from '../../redux/hooks';
import {
	selectStripeCartLineItems,
	StripeLineItem,
} from '../../redux/cart/cart.slice';

// import StripeCheckoutButton from '../../components/stripe-checkout-button/stripe-checkout-button.component';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from 'components/checkout-form/checkout-form.component';
import { Appearance, loadStripe, Stripe } from '@stripe/stripe-js';
import axios, { AxiosRequestConfig } from 'axios';
import { Currency } from '../../../../types/stripe';

// TODO: Our check page should load up the payment intent
const stripePromise = loadStripe(
	'pk_test_51JRJYZLb0bYHwxw9RUDDaK2aNakiQWtBy8xJ2yDMxBA5kbrosTwt1qBmHRXbwxsHNyCVt14NCaBIOHkREqWa4cWt00d2teTFK2'
);

export default function StripeForm() {
	const items = useAppSelector(selectStripeCartLineItems);
	const [clientSecret, setClientSecret] = React.useState('');
	// const [stripePromise, setStripePromise] = React.useState(() =>
	// 	loadStripe(
	// 		'pk_test_51JRJYZLb0bYHwxw9RUDDaK2aNakiQWtBy8xJ2yDMxBA5kbrosTwt1qBmHRXbwxsHNyCVt14NCaBIOHkREqWa4cWt00d2teTFK2'
	// 	)
	// );

	const createPaymentIntent = React.useCallback(() => {
		const configPaymentIntent: AxiosRequestConfig<{
			items: StripeLineItem[];
			currency: Currency;
		}> = {
			method: 'POST',
			url: '/create-payment-intent',
			data: { items, currency: 'usd' },
		};
		axios(configPaymentIntent)
			.then(function (response: { data: { clientSecret: string } }) {
				console.log(response.data);
				setClientSecret(response.data.clientSecret);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, [items]);

	React.useEffect(() => {
		createPaymentIntent();
	}, [createPaymentIntent]);

	const appearance = {
		theme: 'stripe',
	} as Appearance;

	const options = {
		clientSecret,
		appearance,
	};

	return (
		clientSecret && (
			<Elements options={options} stripe={stripePromise}>
				<CheckoutForm />
			</Elements>
		)
	);
}
