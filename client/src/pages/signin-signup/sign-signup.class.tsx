import SignUp from 'components/sign-up/sign-up.component';
import { SignIn } from 'pages';
import { Component } from 'react';
import { SignInSignUpContainer } from './sign-signup.styled';

interface Props {}
interface State {}

class SignInSignUp extends Component<Props, State> {
	componentDidMount() {
		document.title = 'Crown Clothing: SignIn';
	}

	render() {
		return (
			<SignInSignUpContainer>
				<SignIn />
				<SignUp />
			</SignInSignUpContainer>
		);
	}
}

export default SignInSignUp;
