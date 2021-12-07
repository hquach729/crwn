import React from 'react';
import {
	CollectionPreviewContainer as PreviewContainer,
	CollectionItemContainer as ItemContainer,
	CollectionImage as Image,
	PreviewTitle as Title,
	CollectionFooter as Footer,
	Preview,
	CollectionName as Name,
	CollectionPrice as Price,
	AddItemButton,
} from 'components/collection-preview/collection-preview.styled';
import { Collection } from 'redux/shop/shop.slice';
import { NavigateFunction } from 'react-router';
import { useNavigate, useLocation } from 'react-router-dom';
import { CollectionItem } from 'types/collection';
import { addCartItem } from 'redux/cart/cart.slice';
import { useAppDispatch } from 'redux/hooks';

interface Props {
	collection: Collection;
	navigate: NavigateFunction;
	pathname: string;
	dispatch: (action: any) => void;
}
interface State {}

class CollectionPreview extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		console.log(`Class: ${CollectionPreview.name}`, { ...props });
	}

	handleAddItemClick = (item: CollectionItem) => {
		const { dispatch } = this.props;
		dispatch(addCartItem({ item: { ...item, qty: 1 } }));
	};

	render() {
		const { collection, navigate, pathname } = this.props;
		return (
			<PreviewContainer key={collection.id}>
				<Title onClick={() => navigate(`${pathname}/${collection.id}`)}>
					{collection.title.toLocaleUpperCase()}
				</Title>
				<Preview>
					{collection.items.map((item) => (
						<ItemContainer key={item.id}>
							<Image className='image' imageUrl={item.imageUrl} />
							<Footer>
								<Name> {item.name}</Name>
								<Price>{`$${item.price}`}</Price>
							</Footer>
							<AddItemButton
								inverted
								content='Add to Cart'
								onClick={() => this.handleAddItemClick(item)}
							/>
						</ItemContainer>
					))}
				</Preview>
			</PreviewContainer>
		);
	}
}

export const withReduxRouter = (Component: React.ComponentType<any>) => {
	const Wrapper = (props: any) => {
		const navigate = useNavigate();
		const dispatch = useAppDispatch();
		const { pathname } = useLocation();

		return (
			<Component
				{...props}
				navigate={navigate}
				dispatch={dispatch}
				pathname={pathname}
			/>
		);
	};
	return Wrapper;
};

export default withReduxRouter(CollectionPreview);
