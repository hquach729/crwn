import styled from 'styled-components';
import { Link } from 'react-router-dom';

export interface LogoContainerProps {
	size?: 'small' | 'medium' | 'large';
}
export const Container = styled(Link)<LogoContainerProps>`
	height: 100%;
	width: ${({ size }) => {
		switch (size) {
			case 'small':
				return '35px';
			case 'medium':
				return '70px';
			case 'large':
				return '140px';
			default:
				return '70px';
		}
	}};
	padding: 25px;
`;
