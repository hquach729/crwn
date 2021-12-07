// NOTE: es6 allow the use of import and typescript will automatically convert to require()
import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import { Currency } from './types/stripe';
import Stripe from 'stripe';

const app = express();
const PORT = process.env.PORT || 4242;
console.log('server working');

// NOTE: load stripe key fro env
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2020-08-27',
});

// SECTION: middlewares
app.use(cors()); // NOTE: This is CORS-enabled for all origins!
app.use(express.json()); // NOTE: parse JSON to javascript body object
app.use(express.urlencoded({ extended: true })); // NOTE: parse url query string, ie space and symbol with escape char

// SECTION: Root Route
if (process.env.NODE_ENV !== 'production')
	app.get('/', (req, res) => res.send('NodeJs + Express + Typescript Server'));

export interface CheckoutParams {}
export interface CheckoutResBody {}
export interface CheckoutReqBody {
	items: StripeLineItem[];
}

export interface StripeLineItem {
	price_data: {
		currency: string;
		product_data: {
			name: string;
		};
		unit_amount: number;
	};
	quantity: number;
}

/**
 *
 */
const calculateOrderAmount = (items: StripeLineItem[]) => {
	const totalAmount = items.reduce((amount, item) => {
		return (amount += item.price_data.unit_amount * item.quantity);
	}, 0);
	console.log({ totalAmount });
	// Replace this constant with a calculation of the order's amount
	// Calculate the order total on the server to prevent
	// people from directly manipulating the amount on the client
	return totalAmount;
};

/**
 NOTE: JSON converted to Javascript Object
 ** {
 **   'Floral Blouse': {
 **     name: 'Floral Blouse',
 **     price: 20,
 **     id: 24,
 **     imageUrl: '/images/shop-img/womens/floral-blouse.png',
 **     qty: 5
 **   }
 ** }
 */
app.post(
	'/create-checkout-session',
	async (
		req: Request<CheckoutParams, CheckoutResBody, CheckoutReqBody>,
		res: Response
	) => {
		const { items } = req.body;
		// const total = calculateOrderAmount(items);
		try {
			const session = await stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				line_items: items,
				mode: 'payment',
				success_url: 'http://localhost:3000/success',
				cancel_url: 'http://localhost:3000/cancel',
			});
			res.send(session.url);
		} catch (error) {
			console.log(error);
			res.send('http://localhost:3000/checkout');
		}
	}
);

/**
 * POST: /create-payment-intent
 */
interface IntentParams {}
interface IntentResBody {}
interface IntentReqBody {
	/**
	 * Cart Item sent from client for payment
	 * processing
	 */
	items: StripeLineItem[];
	/**
	 * Currency use
	 */
	currency: Currency;
}
interface IntentReqQuery {}
app.post(
	'/create-payment-intent',
	async (
		req: Request<IntentParams, IntentResBody, IntentReqBody, IntentReqQuery>,
		res: Response
	) => {
		const { items, currency } = req.body;
		console.log({ items, currency });

		// NOTE: Create a PaymentIntent with the order amount and currency
		try {
			const paymentIntent = await stripe.paymentIntents.create({
				amount: calculateOrderAmount(items),
				currency: currency,
				automatic_payment_methods: {
					enabled: true,
				},
			});
			res.send({
				clientSecret: paymentIntent.client_secret,
			});
		} catch (error) {
			console.log({ error });
			res.send({
				clientSecret: '',
			});
		}
	}
);

// SECTION: Check if server running in development of production
if (process.env.NODE_ENV === 'production') {
	console.log(path.join(__dirname));
	// NOTE: serve react build files
	// app.use(express.static(path.join(__dirname, 'client/build')));
	app.use(express.static(path.join(__dirname)));

	// NOTE: Any route that is not cover by our future route
	// app.get('*', function (req, res) {
	// 	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
	// });

	// NOTE: use relative file
	app.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, 'index.html'));
		// res.sendFile(path.join(__dirname, 'index.html'));
	});
}

app.listen(PORT, () => {
	console.log(`🚀[server]: Server is running at https://localhost:${PORT}`);
});
