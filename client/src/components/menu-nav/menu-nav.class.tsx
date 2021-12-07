import CartIcon from 'components/cart-icon/cart-icon.component';
import { OptionsContainer, OptionLink } from 'components/header/header.styles';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

// import { signOutStart } from 'redux/auth/auth.actions';
import { UserActions } from 'redux/user/user.slice';
import { RootState } from 'redux/store';

class MenuNav extends React.Component<Props, State> {
	// NOTE: make sure to bind methods so we can refer this to the this.props object
	handleClick = () => {
		const { currentUser, signOutStart } = this.props;
		currentUser && signOutStart();
	};

	render() {
		const {
			handleClick,
			props: { path, content },
		} = this;

		return (
			<OptionsContainer>
				<OptionLink to='/shop'>Shop</OptionLink>
				<OptionLink to='/contact'>Contact</OptionLink>
				<OptionLink to={path} onClick={handleClick}>
					{content}
				</OptionLink>
				<CartIcon />
			</OptionsContainer>
		);
	}
}

const mapState = ({ user: { currentUser } }: RootState) => ({
	currentUser: currentUser,
	path: currentUser ? '/' : '/signin',
	content: currentUser ? 'Sign Out' : 'Sign In',
});

// NOTE: dispatch is automatically call here
// const connector = connect(mapState, { signOutStart });
const connector = connect(mapState, {
	signOutStart: UserActions.SIGN_OUT_START,
});
type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {}
interface State {
	path: string;
	content: string;
}

export default connector(MenuNav);
