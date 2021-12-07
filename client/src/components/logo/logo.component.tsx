import React from 'react';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { Container } from './logo.styled';

export function CrownLogo() {
	return (
		<Container to='/' size='medium'>
			<Logo className='logo' />
		</Container>
	);
}

export default CrownLogo;
