import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const SECTIONS_DATA = [
	{
		id: 'g2hhWIGbDt0IaJrCS8Ve',
		title: 'hats',
		imageUrl: 'images/hats.png', // local file in public/images/
		linkUrl: 'shop/hats',
	},
	{
		id: 'WczU6N2119drySczKv9h',
		title: 'jackets',
		imageUrl: 'images/jackets.png', // local file in public/images/
		linkUrl: 'shop/jackets',
	},
	{
		id: 'uIy8xCRVZ9VKvBp1PH4f',
		title: 'sneakers',
		imageUrl: 'images/sneakers.png', // local file in public/images/
		linkUrl: 'shop/sneakers',
	},
	{
		id: 'OnFMLfqpaNkkjjEuGPYM',
		title: 'womens',
		imageUrl: 'images/womens.png', // local file in public/images/
		size: 'large',
		linkUrl: 'shop/womens',
	},
	{
		id: 'axVl7UPYAzCrYs6hQ65g',
		title: 'mens',
		imageUrl: 'images/men.png', // local file in public/images/
		size: 'large',
		linkUrl: 'shop/mens',
	},
];

export interface Section {
	id: string;
	title: string;
	imageUrl: string;
	size?: string;
	linkUrl: string;
}

export interface DirectoryState {
	sections: Section[];
}

const initialState: DirectoryState = {
	sections: SECTIONS_DATA,
};

export enum DirectoryActionTypes {
	SET_SECTIONS = 'SET_SECTIONS',
}

type SectionsPayload = {
	sections: Section[];
};

export const directorySlice = createSlice({
	name: 'directory',
	initialState,
	reducers: {
		setSection: (state, action: PayloadAction<SectionsPayload>) => {
			console.log(action);
			const { sections } = action.payload;
			state.sections = sections;
		},
	},
});

const selectDirectory = (state: RootState) => state.directory;

export const selectSections = createSelector(
	[selectDirectory],
	(directory) => directory.sections
);

export const { setSection } = directorySlice.actions;
export default directorySlice.reducer;
