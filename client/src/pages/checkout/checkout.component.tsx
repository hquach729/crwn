import React from 'react';
import './checkout.styles.scss';
import { Route, Routes } from 'react-router';
import StripePayment from 'components/stripe-checkout-form/stripe-checkout-form.component';
import CheckoutSummary from 'components/checkout-summary/checkout-summary.component';

export default function CheckoutPage() {
	return (
		<Routes>
			<Route path='/' element={<CheckoutSummary />} />
			<Route path='form' element={<StripePayment />} />
		</Routes>
	);
}
