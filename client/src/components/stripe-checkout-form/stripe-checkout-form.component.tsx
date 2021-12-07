import React from 'react';
// import './checkout.styles.scss';
import { useAppSelector } from 'redux/hooks';
import {
	selectStripeCartLineItems,
	StripeLineItem,
} from 'redux/cart/cart.slice';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from 'components/checkout-form/checkout-form.component';
import { loadStripe } from '@stripe/stripe-js';
import axios, { AxiosRequestConfig } from 'axios';
import { Currency } from '../../../../types/stripe';

const stripePromise = loadStripe(
	'pk_test_51JRJYZLb0bYHwxw9RUDDaK2aNakiQWtBy8xJ2yDMxBA5kbrosTwt1qBmHRXbwxsHNyCVt14NCaBIOHkREqWa4cWt00d2teTFK2'
);

interface ServerResponse {
	data: {
		clientSecret: string;
	};
}
export default function StripePayment() {
	const items = useAppSelector(selectStripeCartLineItems);
	const [clientSecret, setClientSecret] = React.useState('');

	const createPaymentIntent = React.useCallback(async () => {
		const configPaymentIntent: AxiosRequestConfig<{
			items: StripeLineItem[];
			currency: Currency;
		}> = {
			method: 'POST',
			url: '/create-payment-intent',
			data: { items, currency: 'usd' },
		};

		try {
			const response: ServerResponse = await axios(configPaymentIntent);
			setClientSecret(response.data.clientSecret);
		} catch (error) {}
	}, [items]);

	React.useEffect(() => {
		console.log('use effect fire: createPaymentIntent');
		createPaymentIntent();
	}, [createPaymentIntent]);

	return clientSecret ? (
		<div className='checkout-page'>
			<Elements
				options={{ clientSecret, appearance: { theme: 'stripe' } }}
				stripe={stripePromise}
			>
				<CheckoutForm />
			</Elements>
		</div>
	) : null;
}
