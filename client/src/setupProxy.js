const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/create-payment-intent',
		createProxyMiddleware({
			target: 'http://localhost:4242',
			// target: 'https://agile-ridge-85171.herokuapp.com:4242/',
			changeOrigin: true,
		})
	);

	app.use(
		'/create-checkout-session',
		createProxyMiddleware({
			target: 'http://localhost:4242',
			// target: 'https://agile-ridge-85171.herokuapp.com:4242/',
			changeOrigin: true,
		})
	);
};
