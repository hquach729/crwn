import axios, { AxiosRequestConfig } from 'axios';
import React from 'react';
import { StripeLineItem } from 'redux/cart/cart.slice';
import { Currency } from '../../../types/stripe';

export const useStripPayment = (items: StripeLineItem[]) => {
	const [clientSecret, setClientSecret] = React.useState('');

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
