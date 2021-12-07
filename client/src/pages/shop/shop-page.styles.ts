import styled, { css } from 'styled-components';

interface ShopPageContainerProps {
	debug?: boolean;
}

const enableBorder = css`
	border: 1px solid red;
`;

const disableBorder = css`
	border: none;
`;

export const ShopPageContainer = styled.div<ShopPageContainerProps>`
	${({ debug }) => (debug ? enableBorder : disableBorder)}
`;
