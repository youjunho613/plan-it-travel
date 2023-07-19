import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "server/firebase";

export const logOut = async () => {
  await signOut(auth);
};

export const onAuthState = () => {
  onAuthStateChanged(auth, user => {
    console.log(user);
  });
};

export const signIn = async values => {
  try {
    await signInWithEmailAndPassword(auth, values.email, values.password);
  } catch (error) {}
};

export const createUser = async (values, imgFile) => {
  try {
    await createUserWithEmailAndPassword(auth, values.email, values.password);

    const imageRef = ref(storage, `profileImg/${auth.currentUser.uid}`);
    await uploadBytes(imageRef, imgFile);
    const url = await getDownloadURL(imageRef);
    await updateProfile(auth.currentUser, {
      displayName: values.displayName,
      photoURL: url
    });
  } catch (error) {}
};
