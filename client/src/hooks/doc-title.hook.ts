import { useLocation } from 'react-router';

export const useDocumentTitle = () => {
	const { pathname } = useLocation();
	const title = pathname.replace('/', '').toLocaleUpperCase();

	return title;
};
