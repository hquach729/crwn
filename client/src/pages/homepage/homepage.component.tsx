import React from 'react';

import DirectoryMenu from '../../components/directory-menu/directory-menu.component';
import { HomePageContainer } from './homepage.styles';

export default function HomePage() {
	return (
		<HomePageContainer>
			<DirectoryMenu />
		</HomePageContainer>
	);
}

// import React from 'react';
// // import './homepage.styles.scss';

// import DirectoryMenu from '../../components/directory-menu/directory-menu.component';
// import { HomePageContainer } from './homepage.styles';

// export default function HomePage() {
// 	return (
// 		// <div className='homepage'>
// 		<HomePageContainer>
// 			<DirectoryMenu />
// 		</HomePageContainer>
// 		// </div>
// 	);
// }
