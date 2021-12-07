import React from 'react';
// import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectError, UserActions } from 'redux/user/user.slice';
import { Credential } from 'types';

export interface UseSignIn {
	credential: Credential;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	signInWithGoogle: () => void;
}
export function useSignIn() {
	const dispatch = useAppDispatch();
	// const navigate = useNavigate();
	const error = useAppSelector(selectError);

	// NOTE: Local State Sign In Form
	const [credential, setCredential] = React.useState({
		email: '',
		password: '',
	});

	// NOTE: Sign in with username and email using google firebase service
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(UserActions.EMAIL_PASSWORD_SIGN_IN_START({ ...credential }));
		// console.error({ error });
	};

	const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setCredential((prevValue) => ({
			...prevValue,
			[target.name]: target.value,
		}));
	};

	// NOTE: using slice
	const signInWithGoogle = () => {
		console.log('signInWithGoogle', error);
		dispatch(UserActions.GOOGLE_SIGN_IN_START());
		console.log({ error });
	};

	// React.useEffect(() => {
	// 	console.log({ error });
	// 	return () => {
	// 		console.log('clean up');
	// 	};
	// }, [error]);

	return { credential, handleSubmit, handleChange, signInWithGoogle };
}
