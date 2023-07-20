import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth, storage } from "server/firebase";

export const useAuth = () => {
  const navigate = useNavigate();

  const logOut = async () => {
    await signOut(auth);
    navigate(0);
  };

  const signIn = async values => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
    } catch (error) {}
  };

  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (!user) return;
      const { email, uid, displayName, photoURL } = user;
      setCurrentUser({ email, uid, displayName, photoURL });
    });
  }, []);

  // TODO 프로필 디폴트 이미지
  const createUser = async (values, imgFile) => {
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
  return { currentUser, logOut, signIn, createUser };
};
