import React from 'react';
import './directory-menu.styles.scss';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import { selectSections } from 'redux/directory/directory.slice';

function DirectoryMenu() {
	const sections = useAppSelector(selectSections);
	const navigate = useNavigate();

	return (
		<div className='directory-menu'>
			{sections.map(({ id, size, imageUrl, title, linkUrl }, idx) => (
				<div
					className={`${size ? size + ' menu-item' : 'menu-item'}`}
					key={id}
					// onClick={() => navigate(`shop/${title}`)}
					onClick={() => navigate(`shop/${id}`)}
				>
					<div
						className='background-image'
						style={{ backgroundImage: `url(${imageUrl})` }}
					/>
					<div className='content'>
						<h1 className='title'>{title.toLocaleUpperCase()}</h1>
						<span className='subtitle'>SHOP NOW</span>
					</div>
				</div>
			))}
		</div>
	);
}

export default DirectoryMenu;
