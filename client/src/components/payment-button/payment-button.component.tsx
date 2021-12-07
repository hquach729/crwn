import React from 'react';
import './payment-button.styles.scss';
import {
	selectStripeCartLineItems,
	StripeLineItem,
} from '../../redux/cart/cart.slice';
import { useAppSelector } from '../../redux/hooks';
import CustomButton from '../custom-button/custom-button.component';
import axios, { AxiosRequestConfig } from 'axios';
import { Currency } from '../../../../types/stripe';
import { loadStripe, Appearance } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from 'components/checkout-form/checkout-form.component';

// export type Currency = 'usd' | 'eur' | 'aud';
const stripePromise = loadStripe(
	'pk_test_51JRJYZLb0bYHwxw9RUDDaK2aNakiQWtBy8xJ2yDMxBA5kbrosTwt1qBmHRXbwxsHNyCVt14NCaBIOHkREqWa4cWt00d2teTFK2'
);

export const processPayment = async (items: StripeLineItem[]) => {
	const config: AxiosRequestConfig<{
		items: StripeLineItem[];
		currency: Currency;
	}> = {
		method: 'POST',
		url: '/create-checkout-session',
		data: { items, currency: 'usd' },
	};
	axios(config)
		.then(function (response) {
			console.log(response);

			// NOTE: load the stripe checkout url to our page
			// document.location = response.data;

			// NOTE: href Can be set, to navigate to the given URL.
			document.location.href = response.data;
		})
		.catch(function (error) {
			console.log(error);
		});
};

export const useStripPayment = (items: StripeLineItem[]) => {
	const [clientSecret, setClientSecret] = React.useState('');

	// const createCheckoutSession = () => {
	// 	axios(configCheckSession)
	// 		.then(function (response) {
	// 			document.location.href = response.data;
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 		});
	// };
	// const createPaymentIntent = () => {
	// 	axios(configPaymentIntent)
	// 		.then(function (response) {
	// 			console.log(response.data);
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 		});
	// };

	const createCheckoutSession = React.useCallback(() => {
		console.groupCollapsed('createCheckoutSession', items);
		console.groupEnd();
		const configCheckSession: AxiosRequestConfig<{
			items: StripeLineItem[];
			currency: Currency;
		}> = {
			method: 'POST',
			url: '/create-checkout-session',
			data: { items, currency: 'usd' },
		};

		axios(configCheckSession)
			.then(function (response) {
				document.location.href = response.data;
			})
			.catch(function (error) {
				console.log(error);
			});
	}, [items]);

	// const createPaymentIntent = React.useCallback(() => {
	// 	console.groupCollapsed('createCheckoutIntent', items);
	// 	console.groupEnd();
	// 	const configPaymentIntent: AxiosRequestConfig<{
	// 		items: StripeLineItem[];
	// 		currency: Currency;
	// 	}> = {
	// 		method: 'POST',
	// 		url: '/create-payment-intent',
	// 		data: { items, currency: 'usd' },
	// 	};
	// 	axios(configPaymentIntent)
	// 		.then(function (response: { data: { clientSecret: string } }) {
	// 			console.log(response.data);
	// 			setClientSecret(response.data.clientSecret);
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 		});
	// }, [items]);

	const createPaymentIntent = React.useCallback(() => {
		console.groupCollapsed('createCheckoutIntent', items);
		console.groupEnd();
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

	return { createCheckoutSession, createPaymentIntent, clientSecret };
};

export default function PaymentButton() {
	const items = useAppSelector(selectStripeCartLineItems);
	const { createCheckoutSession, createPaymentIntent, clientSecret } =
		useStripPayment(items);

	// const { createCheckoutSession, createPaymentIntent } = useStripPayment(items);

	// const [clientSecret, setClientSecret] = React.useState('');

	// const createPaymentIntent = () => {
	// 	console.groupCollapsed('createCheckoutIntent', items);
	// 	console.groupEnd();
	// 	const configPaymentIntent: AxiosRequestConfig<{
	// 		items: StripeLineItem[];
	// 		currency: Currency;
	// 	}> = {
	// 		method: 'POST',
	// 		url: '/create-payment-intent',
	// 		data: { items, currency: 'usd' },
	// 	};
	// 	axios(configPaymentIntent)
	// 		.then(function (response: { data: { clientSecret: string } }) {
	// 			console.log(response.data);
	// 			// NOTE: get a payment intent, once that is set
	// 			// our checkout form will be display
	// 			setClientSecret(response.data.clientSecret);
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 		});
	// };

	const appearance = {
		theme: 'stripe',
	} as Appearance;

	const options = {
		clientSecret,
		appearance,
	};

	return (
		<div className='payment-button'>
			<CustomButton content='PAY Session' onClick={createCheckoutSession} />
			<CustomButton content='PAY Intent' onClick={createPaymentIntent} />
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</div>
	);
}
