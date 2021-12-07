import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { SignInContainer, Title, ButtonGroup } from './sign-in.styled';
import { UseSignIn } from 'hooks/sign-in.hook';
import withSignIn from 'hoc/sign-hoc';

export interface SignInProps extends UseSignIn {}

const SignIn = ({
	handleSubmit,
	signInWithGoogle,
	handleChange,
	credential: { email, password },
}: SignInProps) => (
	<SignInContainer>
		<Title>I already have an account</Title>
		<span>Sign in with your email and password</span>
		<form onSubmit={handleSubmit}>
			<FormInput
				name='email'
				type='email'
				value={email}
				required
				onChange={handleChange}
				label='Email'
				autoComplete='false'
			/>
			<FormInput
				name='password'
				type='password'
				value={password}
				required
				onChange={handleChange}
				label='Password'
				autoComplete='false'
			/>
			<ButtonGroup>
				<CustomButton type='submit' content='Sign In' />
				<CustomButton
					type='button'
					isGoogleSignIn
					content='Sign In With Google'
					onClick={signInWithGoogle}
				/>
			</ButtonGroup>
		</form>
	</SignInContainer>
);

export default withSignIn(SignIn);
