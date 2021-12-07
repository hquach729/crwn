import styled, { css } from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';

const OptionContainerStyles = css`
	padding: 10px 15px;
	cursor: pointer;
`;

interface HeaderContainerProps {}
export const HeaderContainer = styled.div<HeaderContainerProps>`
	height: 70px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 25px;
`;

interface LogoContainerProps {}

export const LogoContainer = styled(Link)<LogoContainerProps>`
	height: 100%;
	width: 70px;
	padding: 25px;
`;

interface OptionsContainerProps {}
export const OptionsContainer = styled.div<OptionsContainerProps>`
	width: 50%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

// Pay special attention to this, we have to extends this Props
interface OptionLinkProps extends LinkProps {
	as?: keyof JSX.IntrinsicElements;
	isActive?: boolean;
}

export const OptionLink = styled(Link)<OptionLinkProps>`
	${OptionContainerStyles};
	/* border: ${({ isActive }: OptionLinkProps) =>
		isActive ? '1px solid black' : '3px solid green'}; */
`;

export const OptionDiv = styled.div`
	${OptionContainerStyles}
`;
