import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { Container } from './success.styled';

export default function Success() {
	// TODO: figure out how to use useParams
	const params = useParams();
	const navigate = useNavigate();
	console.log({ params, navigate });

	React.useEffect(() => {
		document.title = 'Checkout Success';
		const clientSecret = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret'
		);

		console.log({ clientSecret });
	}, []);

	return (
		<Container>
			<h1>Checkout Success</h1>
		</Container>
	);
}
