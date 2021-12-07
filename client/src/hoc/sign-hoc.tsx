import React from 'react';
import { useSignIn } from 'hooks/sign-in.hook';

// NOTE: Functional HOC Component using hooks
const withSignInFunctionality = (Component: React.ComponentType<any>) => () =>
	<Component {...useSignIn()} />;

export default withSignInFunctionality;
