import React from 'react';
import './stripe-checkout-button.styles.scss';

import StripeCheckout, { Token } from 'react-stripe-checkout';
import { useAppSelector } from '../../redux/hooks';
import { selectCartItemTotalPrice } from '../../redux/cart/cart.slice';

import {
	loadStripe,
	StripeElementsOptions,
	Appearance,
} from '@stripe/stripe-js';
import {
	Elements,
	PaymentElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
const stripePromise = loadStripe(
	'pk_test_51JRJYZLb0bYHwxw9RUDDaK2aNakiQWtBy8xJ2yDMxBA5kbrosTwt1qBmHRXbwxsHNyCVt14NCaBIOHkREqWa4cWt00d2teTFK2'
);

function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = React.useState<string | undefined | null>(null);
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret'
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
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

	const handleSubmit = async (e: React.SyntheticEvent) => {
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
				return_url: 'http://localhost:3000',
			},
		});

		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.
		if (error.type === 'card_error' || error.type === 'validation_error') {
			setMessage(error.message);
		} else {
			setMessage('An unexpected error occured.');
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

function StripeCheckoutButton() {
	// const [clientSecret, setClientSecret] = React.useState('');

	const totalPriceForStripe = useAppSelector(selectCartItemTotalPrice);
	const publishableKey =
		'pk_test_51JRJYZLb0bYHwxw9RUDDaK2aNakiQWtBy8xJ2yDMxBA5kbrosTwt1qBmHRXbwxsHNyCVt14NCaBIOHkREqWa4cWt00d2teTFK2';

	const onToken = (token: Token) => {
		console.log(token); // pass this token to our back end
		alert('Payment Successful');
	};

	// React.useEffect(() => {
	// 	// Create PaymentIntent as soon as the page loads
	// 	fetch('/create-payment-intent', {
	// 		method: 'POST',
	// 		headers: { 'Content-Type': 'application/json' },
	// 		body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => setClientSecret(data.clientSecret));
	// }, []);

	// const appearance = {
	// 	theme: 'stripe',
	// } as Appearance;

	// const options = {
	// 	clientSecret,
	// 	appearance,
	// };

	// return (
	// 	<>
	// 		{clientSecret && (
	// 			<Elements options={options} stripe={stripePromise}>
	// 				<CheckoutForm />
	// 			</Elements>
	// 		)}
	// 	</>
	// );

	return (
		<StripeCheckout
			stripeKey={publishableKey}
			label='Pay Now'
			name='Crown Clothing'
			billingAddress
			shippingAddress
			amount={totalPriceForStripe * 100}
			description={`Your total is $${totalPriceForStripe}`}
			panelLabel='Pay Now'
			token={onToken}
		/>
	);
}

export default StripeCheckoutButton;
