import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
	text-align: center;
`;

export default function Cancel() {
	return <Container className='cancel-page'>Cancel Checkout</Container>;
}
