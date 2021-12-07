const express = require('express');
const app = express();
// This is a sample test API key.
const stripe = require('stripe')(
	'sk_test_51JRJYZLb0bYHwxw9PnMmxas667lAZs8OI9VeSukkSPRygDzl75VK5Vhe376J5PAsbixSf2xm9pdKLO0rrRqL1ATf00ZqBS3lad'
);

app.use(express.static('public'));
app.use(express.json());

const calculateOrderAmount = (items) => {
	// Replace this constant with a calculation of the order's amount
	// Calculate the order total on the server to prevent
	// people from directly manipulating the amount on the client
	return 1400;
};

app.post('/create-payment-intent', async (req, res) => {
	const { items } = req.body;

	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
		amount: calculateOrderAmount(items),
		currency: 'eur',
		payment_method_types: [
			'giropay',
			'eps',
			'p24',
			'sofort',
			'sepa_debit',
			'card',
			'bancontact',
			'ideal',
		],
	});

	res.send({
		clientSecret: paymentIntent.client_secret,
	});
});

app.listen(4242, () => console.log('Node server listening on port 4242!'));
