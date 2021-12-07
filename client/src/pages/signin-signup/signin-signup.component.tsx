import React from 'react';
import { SignInSignUpContainer } from './sign-signup.styled';
import SignUp from 'components/sign-up/sign-up.component';
import SignIn from 'components/sign-in/sign-in.component';

function SignInSignUpPage() {
	return (
		<SignInSignUpContainer>
			<SignIn />
			<SignUp />
		</SignInSignUpContainer>
	);
}

export default SignInSignUpPage;
