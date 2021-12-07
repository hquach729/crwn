// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const express = require('express');
const app = express();
const cors = require('cors');
const stripe = require('stripe')(
	'sk_test_51JRJYZLb0bYHwxw9PnMmxas667lAZs8OI9VeSukkSPRygDzl75VK5Vhe376J5PAsbixSf2xm9pdKLO0rrRqL1ATf00ZqBS3lad'
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

app.post('/create-checkout-session', async (req, res) => {
	const items = Object.keys(req.body).map((key) => ({
		price_data: {
			currency: 'usd',
			product_data: {
				name: req.body[key].name,
			},
			unit_amount: req.body[key].price * 100,
		},
		quantity: req.body[key].qty,
	}));

	console.log(items);

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: items,
		mode: 'payment',
		success_url: 'http://localhost:3000',
		cancel_url: 'http://localhost:3000/checkout',
		// success_url: 'https://agile-ridge-85171.herokuapp.com',
		// cancel_url: 'https://agile-ridge-85171.herokuapp.com',
	});

	res.send(session.url);
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));
