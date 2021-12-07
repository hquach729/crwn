import { DocumentData, DocumentSnapshot, Timestamp } from '@firebase/firestore';
import { PayloadAction } from '@reduxjs/toolkit';
import type { CurrentUser } from '../../types';

/**
 * Debug the action coming to Redux reducer
 * @param action - an action consisting of type and payload properties
 */
export const debugActionPayload = ({ type, payload }: PayloadAction<any>) =>
	console.log('action payload debug;', { type, payload });

/**
 * Convert a firebase snapshot with added id and time converted to string to be put into
 * Redux store serializable format
 *
 * @param snapshot
 * @returns { CurrentUser } - A Firebase store user profile
 */
export const convertSnapToCurrentUser = (
	snapshot: DocumentSnapshot<DocumentData>
): CurrentUser => {
	const id = snapshot.id;
	const displayName = snapshot.get('displayName');
	const email = snapshot.get('email');
	const createdAt = (snapshot.get('createdAt') as Timestamp)
		.toDate()
		.toISOString();

	return {
		id,
		displayName,
		email,
		createdAt,
	};
};
