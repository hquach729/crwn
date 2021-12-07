import React from 'react';
import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectCurrentUser, UserActions } from 'redux/user/user.slice';

export interface SignUpFormState {
	displayName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

/**
 * Sign Up Hooks
 *
 * @description
 * @returns
 */
function useSignUp() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const currentUser = useAppSelector(selectCurrentUser);

	const [field, setField] = React.useState<SignUpFormState>({
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(UserActions.SIGN_UP_START(field));
		if (currentUser) navigate('/');
	};
	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setField((prevState) => ({ ...prevState, [name]: value }));
	};

	return { handleSubmit, handleOnChange, ...field };
}

/**
 * A Sign Up form react component that takes in user information to create a
 * new user profile and login
 *
 * @field displayName
 * @field email
 * @field password
 * @field confirmPassword
 *
 * @method handleOnChange - set the state of th field
 * @method handleSubmit - handle sign up form submission and dispatch an action
 *
 * @returns { JSX.Element } - React JSX.ELEMENT Component Sign Up Form
 * */
function SignUp() {
	const {
		handleOnChange,
		handleSubmit,
		// NOTE: useState form field use for sign up
		displayName,
		email,
		password,
		confirmPassword,
	} = useSignUp(); // NOTE: hooks use for sign up functionality
	return (
		<div className='sign-up'>
			<h2 className='title'>I don't have an account</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					name='displayName'
					type='text'
					label='Display Name'
					value={displayName}
					handleChange={handleOnChange}
					autoComplete='false'
					required
				/>
				<FormInput
					name='email'
					type='email'
					label='Email'
					value={email}
					handleChange={handleOnChange}
					autoComplete='false'
					required
				/>
				<FormInput
					name='password'
					type='password'
					label='Password'
					value={password}
					handleChange={handleOnChange}
					autoComplete='false'
					required
				/>
				<FormInput
					name='confirmPassword'
					type='password'
					label='Confirm Password'
					value={confirmPassword}
					handleChange={handleOnChange}
					autoComplete='false'
					required
				/>
				<div className='button-group'>
					<CustomButton content='Sign Up' type='submit' />
				</div>
			</form>
		</div>
	);
}

export default SignUp;
