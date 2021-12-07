import React, { useEffect, useState } from 'react';
import {
	PaymentElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
// import './'

// import './checkout.form.styles.scss';

export default function CheckoutForm() {
	// NOTE: Stripe Hooks, this will pull the props from the the parent element
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		// NOTE: this will get the value from the url bar on google
		const clientSecret = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret'
		);

		console.log({ clientSecret });

		if (!clientSecret) {
			return;
		}

		// NOTE: http://localhost:3000/success?payment_intent=pi_3K3jPiLb0bYHwxw9110IMwwy&payment_intent_client_secret=pi_3K3jPiLb0bYHwxw9110IMwwy_secret_bV4BfpkFNw8zzScZwt0al92wO&redirect_status=succeeded

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			console.log({ clientSecret });
			switch (paymentIntent!.status) {
				case 'succeeded':
					setMessage('Payment succeeded!');
					break;
				case 'processing':
					setMessage('Your payment is processing.');
					break;
				case 'requires_payment_method':
					setMessage('Your payment was not successful, please try again.');
					break;
				default:
					setMessage('Something went wrong.');
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}
		setIsLoading(true);
		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				return_url: 'http://localhost:3000/success',
				// return_url: 'http://localhost:3000/checkout',
			},
		});
		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.
		if (error.type === 'card_error' || error.type === 'validation_error') {
			if (error instanceof Error) return setMessage(error.message);
			setMessage('unknown error');
		} else {
			setMessage('An unexpected error occurred.');
		}

		setIsLoading(false);
	};

	return (
		<form id='payment-form' onSubmit={handleSubmit}>
			<PaymentElement id='payment-element' />
			<button disabled={isLoading || !stripe || !elements} id='submit'>
				<span id='button-text'>
					{isLoading ? <div className='spinner' id='spinner'></div> : 'Pay now'}
				</span>
			</button>
			{/* Show any error or success messages */}
			{message && <div id='payment-message'>{message}</div>}
		</form>
	);
}
