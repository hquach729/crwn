import React from 'react';
import './collection-preview.styles.scss';

import CustomButton from '../custom-button/custom-button.component';
import { CollectionItem } from '../../types';

interface PreviewItemProps {
	item: CollectionItem;
	handleClick?: () => void;
}

function PreviewItem({
	item: { id, imageUrl, name, price },
	handleClick,
}: PreviewItemProps) {
	return (
		<div key={id} className='preview-item'>
			<div className='image' style={{ backgroundImage: `url(${imageUrl})` }} />
			<div className='collection-footer'>
				<span className='name'>{name}</span>
				<span className='price'>{`$${price}`}</span>
			</div>

			<CustomButton inverted content='Add to Cart' onClick={handleClick} />
		</div>
	);
}

export default PreviewItem;
