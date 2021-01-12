import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';


export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = await firestore().collection('users').doc(userAuth.user.id);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { name, email,photo } = userAuth.user;
    const createdAt = new Date();
    try {
      await userRef.set({
        name,
        email,
        createdAt,
        photo,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = await firestore().collection(collectionKey);

  const batch =await firestore().batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser=()=>{
  return new Promise((resolve,reject)=>{
    const unsubsribe=auth.onAuthStateChanged(userAuth=>{
      unsubsribe();
      resolve(userAuth);
    },reject)
  })
}
