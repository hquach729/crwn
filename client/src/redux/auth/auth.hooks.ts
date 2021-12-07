// import React from 'react';
// import { auth, createUserProfileDocument } from '../../firebase/firebase.util';
// import { useAppDispatch, useAppSelector } from '../hooks';
// import type { CurrentUser } from '../../types';
// import { setCurrentUser } from './auth.actions';
// import { selectAuth, selectCurrentUser } from './auth.selectors';
// import { selectCurrentUser } from 'redux/user/user.slice';
// import { onSnapshot } from '@firebase/firestore';
// import { convertSnapToCurrentUser } from './auth.helpers';
// import { User } from '@firebase/auth';

// /**
//  * useAuthState:
//  * @returns
//  */
// export function useAuthState() {
// 	return {
// 		auth: useAppSelector(selectAuth),
// 		currentUser: useAppSelector(selectCurrentUser),
// 	};
// }

/**
 *  useAuthDispatchAction
 * @returns
 */
// export function useAuthDispatchAction() {
// 	const dispatch = useAppDispatch();

// 	return {
// 		setCurrentUser: (userAuth: CurrentUser | null) =>
// 			dispatch(setCurrentUser(userAuth)),
// 	};
// }

// export function useFirebaseUserSnapshot() {
// 	const { setCurrentUser } = useAuthDispatchAction();

// 	return {
// 		getCurrentUserProfile: async (userAuth: User | null) => {
// 			if (userAuth) {
// 				try {
// 					const { userDocRef } = await createUserProfileDocument(userAuth);
// 					onSnapshot(userDocRef, (snapshot) => {
// 						if (snapshot.exists()) {
// 							const currentUser = convertSnapToCurrentUser(snapshot);
// 							setCurrentUser(currentUser);
// 						} else {
// 						}
// 					});
// 				} catch (error) {
// 					console.log({ error });
// 				}
// 			} else {
// 				setCurrentUser(userAuth);
// 			}
// 		},
// 	};
// }

// export function useFirebaseAuth() {
// 	const { getCurrentUserProfile } = useFirebaseUserSnapshot();

// 	React.useEffect(() => {
// 		const unsubscribe = auth.onAuthStateChanged(
// 			async (userAuth) => getCurrentUserProfile(userAuth),
// 			(error) => console.log(error)
// 		);

// 		return () => unsubscribe();
// 	}, [getCurrentUserProfile]);
// }
export {};
