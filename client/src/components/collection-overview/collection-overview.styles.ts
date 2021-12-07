import styled from 'styled-components';

import CustomButton from '../custom-button/custom-button.component';

export const CollectionOverviewContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const PreviewTitle = styled.h1<{}>`
	font-size: 28px;
	margin-bottom: 25px;
	cursor: pointer;
`;

export const Preview = styled.div<{}>`
	display: flex;
	justify-content: space-between;
`;

interface CollectionImageProps {
	imageUrl: string;
}
export const CollectionImage = styled.div<CollectionImageProps>`
	width: 100%;
	height: 95%;
	background-size: cover;
	background-position: center;
	margin-bottom: 5px;
	background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`;

export const CollectionFooter = styled.div`
	width: 100%;
	height: 5%;
	display: flex;
	justify-content: space-between;
	font-size: 18px;
`;

export const CollectionName = styled.span`
	width: 90%;
	margin-bottom: 15px;
`;
export const CollectionPrice = styled.span`
	width: 10%;
`;

export const AddItemButton = styled(CustomButton)`
	width: 80%;
	opacity: 0.7;
	position: absolute;
	top: 255px;
	display: none;
`;

export const CollectionItemContainer = styled.div<{}>`
	width: 22vw;
	display: flex;
	flex-direction: column;
	height: 350px;
	align-items: center;
	position: relative;
	&:hover {
		.image {
			opacity: 0.8;
		}
		button {
			opacity: 0.85;
			display: flex;
		}
	}
`;

export const CollectionPreviewContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 30px;
`;
