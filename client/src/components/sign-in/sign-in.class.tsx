import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { SignInContainer, Title, ButtonGroup } from './sign-in.styled';

import {
	emailSignInStart,
	googleSignInStart,
} from '../../redux/auth/auth.actions';
import { connect, ConnectedProps } from 'react-redux';

interface Props extends ReduxProps {}
interface State {
	email: string;
	password: string;
}

class SignIn extends React.Component<Props, State> {
	state: State = {
		email: '',
		password: '',
	};

	// Remember this bind this otherwise this will not refer to our state object
	handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const { email, password } = this.state;
		const { emailSignInStart } = this.props;

		emailSignInStart({ email, password });
	};

	render() {
		const { googleSignInStart } = this.props;
		return (
			<SignInContainer>
				<Title>I already have an account</Title>
				<span>Sign in with your email and password</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput
						name='email'
						type='email'
						label='Email'
						value={this.state.email}
						required
						autoComplete='false'
						onChange={(event) => {
							this.setState({ email: event.target.value });
						}}
					/>
					<FormInput
						name='password'
						type='password'
						required
						value={this.state.password}
						label='Password'
						autoComplete='false'
						onChange={(event) => {
							this.setState({ password: event.target.value });
						}}
					/>
					<ButtonGroup>
						<CustomButton type='submit' content='Sign In' />
						<CustomButton
							type='button'
							isGoogleSignIn
							content='Sign In With Google'
							onClick={googleSignInStart}
						/>
					</ButtonGroup>
				</form>
			</SignInContainer>
		);
	}
}

const connector = connect(null, { emailSignInStart, googleSignInStart });
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SignIn);
