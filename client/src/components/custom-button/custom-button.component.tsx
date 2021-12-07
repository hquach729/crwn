import React, { ButtonHTMLAttributes } from 'react';
import { CustomButtonContainer } from './custom-button.styles';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	content?: string;
	children?: React.ReactNode;
	isGoogleSignIn?: boolean;
	inverted?: boolean;
}

export const CustomButton = (props: CustomButtonProps) => (
	<CustomButtonContainer {...props}>
		{props.children || props.content}
	</CustomButtonContainer>
);

export default CustomButton;
