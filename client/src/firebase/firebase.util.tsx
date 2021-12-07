/**
 * Firebase helper utilities
 *
 * Follow this pattern to import other Firebase services
 * import { } from 'firebase/<service>';
 */
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
	getFirestore,
	collection,
	getDocs,
	getDoc,
	setDoc,
	query,
	where,
	doc,
	writeBatch,
	QuerySnapshot,
	DocumentSnapshot,
	onSnapshot,
} from 'firebase/firestore';
import type { User } from 'firebase/auth';
import type { DocumentData } from 'firebase/firestore';
import {
	Collection,
	CollectionItem,
	CollectionItems,
	CurrentUser,
	UserDocumentRef,
} from '../types';
import { convertSnapToCurrentUser } from 'redux/auth/auth.helpers';

export interface FireBaseConfig {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
	measurementId: string;
}

// Firebase Web App API Key to use Sign In Service
const firebaseConfig: FireBaseConfig = {
	apiKey: 'AIzaSyCfJM-4F99m-8rcg9TPtLOiqYoxXeJKRcc',
	authDomain: 'crwn-db-1db97.firebaseapp.com',
	projectId: 'crwn-db-1db97',
	storageBucket: 'crwn-db-1db97.appspot.com',
	messagingSenderId: '292051714517',
	appId: '1:292051714517:web:b489042f72d5166d9ffd5c',
	measurementId: 'G-6EN6DCCM62',
};

//  Initialize firebase app, load config data into app, provide assess to firebase database
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getUser(uid: string) {
	const q = query(collection(db, 'users'), where('uid', '==', uid));
	const docSnap = await getDocs(q);
	docSnap.docs.map((user) => console.log(user.data()));
}

//  Google Sign Up Setup
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' }); // show google popup with list of account to login
export const signInWithGoogle = () => signInWithPopup(auth, provider);

// type UserProfile = {
// 	userDocRef: DocumentReference<DocumentData>;
// };

interface AdditionalData {
	displayName: string;
}

export const createUserProfileDocument = async (
	userAuth: User,
	additionData?: AdditionalData
): Promise<UserDocumentRef> => {
	const userDocRef = doc(db, `users`, userAuth.uid);
	const userDocSnap = await getDoc(userDocRef);

	if (!userDocSnap.exists()) {
		const newUserDoc = {
			displayName: userAuth.displayName || additionData?.displayName || '',
			email: userAuth.email,
			createdAt: new Date(),
			...additionData,
		};
		try {
			await setDoc(userDocRef, newUserDoc);
		} catch (error: unknown) {
			error instanceof Error
				? console.log('error create user', error.message)
				: console.log(error);
		}
	}

	return { userDocRef };
};

// Use this to upload data to firebase
export const addCollectionAndDocuments = async ({
	collectionKey,
	objectToAdd,
}: CollectionItems) => {
	// ! Debug parameters
	console.log({ collectionKey, objectToAdd });

	// This will create a shop collection object and return a reference to that it
	// ! this will note create a collection in our firestore yet

	// key: collections
	const collectionRef = collection(db, collectionKey);
	// const cRef = collection(db, collectionKey);
	// console.log({ collectionKey, collectionRef });

	const batch = writeBatch(db);

	objectToAdd.forEach((obj) => {
		console.log({ obj });
		// Get a new Document reference to the collection from the collectionRef
		const newDocRef = doc(collectionRef); // Firestore will create a unique id for each document
		console.log({ newDocRefId: newDocRef.id });

		// Use this to prevent issue with connection where all data is not uploaded
		batch.set(newDocRef, obj);
	});
	return await batch.commit();
};

export async function createCollectionAndDocument(
	collectionKey: string,
	objectToAdd: []
) {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);
	objectToAdd.forEach((obj) => {
		const newDocRef = doc(collectionRef);
		batch.set(newDocRef, obj);
	});

	return await batch.commit();
}

export function convertCollectionsSnapShotToMap(
	snapShot: QuerySnapshot<DocumentData>
) {
	return snapShot.docs
		.map((doc) => ({
			id: doc.id,
			title: (doc.get('title') as string).toLocaleLowerCase(),
			routeName: encodeURI((doc.get('title') as string).toLocaleLowerCase()),
			items: (doc.get('items') as CollectionItem[]).map(
				// Arrange the key in the item object, so it's not out of order
				({ id, name, price, imageUrl }) => ({ id, name, price, imageUrl })
			),
		}))
		.reduce(
			(obj, collection) => ({
				...obj,
				[collection.title.toLocaleLowerCase()]: collection,
			}),
			{}
		) as Collection;
}

export function convertCollectionToMap<T>(
	snapShot: QuerySnapshot<DocumentData>
) {
	return snapShot.docs
		.map((doc) => ({
			id: doc.id,
			title: (doc.get('title') as string).toLocaleLowerCase(),
			routeName: encodeURI((doc.get('title') as string).toLocaleLowerCase()),
			items: doc.get('items'),
		}))
		.reduce(
			(obj, collection) => ({
				...obj,
				[collection.title.toLocaleLowerCase()]: collection,
				// [collection.id]: collection,
				// [co]: collection,
			}),
			{}
		) as T;
}

// TODO: get entire shop items collection from firebase
export const getCollections = (name: string) => ({
	collectionRef: collection(db, name),
});

export async function createUserProfile({ uid, displayName, email }: User) {
	const userDocRef = doc(db, 'users', uid);
	try {
		const snapshot: DocumentSnapshot = await getDoc(userDocRef);
		if (snapshot.exists()) {
			return userDocRef;
		} else {
			const user: CurrentUser = {
				displayName,
				email,
				createdAt: new Date(),
			};
			await setDoc(userDocRef, user);
			return userDocRef;
		}
	} catch (error) {
		throw error;
	}
}

/**
 *
 * @returns
 */
export const getCurrentUser = (): Promise<CurrentUser | null> => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged(
			async (user) => {
				// NOTE: once we get the user, we unsubscribe right away
				unsubscribe();
				if (user) {
					const userDocRef = await createUserProfile(user);
					const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
						unsubscribe();
						const currentUser = convertSnapToCurrentUser(snapshot);
						resolve(currentUser);
					});
				} else {
					resolve(user);
				}
			},
			(error) => {
				reject(error);
			}
		);
	});
};
