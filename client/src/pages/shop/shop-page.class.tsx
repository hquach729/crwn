import React from 'react';

// CSS
import { ShopPageContainer } from './shop-page.styles';

// Components
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection-page.component';

// React Router
import { Route, Routes } from 'react-router-dom';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import { fetchCollectionStartAsync } from '../../redux/collection/collection.actions';

class ShoppingPage extends React.Component<Props, State> {
	componentDidMount() {
		this.props.fetchCollectionStartAsync();
	}

	render() {
		return (
			<ShopPageContainer>
				<Routes>
					<Route path='/' element={<CollectionOverview />} />
					<Route path=':categoryId' element={<CollectionPage />} />
				</Routes>
			</ShopPageContainer>
		);
	}
}

// Redux will automatically dispatch our action if we just do it
// this way, the connect function will automatically call the bindAction Creator
const actionCreators = {
	fetchCollectionStartAsync,
};

const reduxConnector = connect(null, actionCreators);
type ReduxProps = ConnectedProps<typeof reduxConnector>;

interface Props extends ReduxProps {}
interface State {}

export default reduxConnector(ShoppingPage);

// const mapDispatch = (dispatch: Dispatch) => ({
// 	fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync),
// });
// const reduxConnector = connect(null, mapDispatch);
