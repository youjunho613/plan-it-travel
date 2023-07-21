import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { closeModal, postError } from "redux/modules";
import { auth, storage } from "server/firebase";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalCloseHandler = target => dispatchEvent(closeModal(target));
  const [currentUser, setCurrentUser] = useState({
    email: "",
    uid: "",
    displayName: "",
    photoURL: ""
  });

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (!user) return;
      const { email, uid, displayName, photoURL } = user;
      setCurrentUser({ email, uid, displayName, photoURL });
    });
  }, []);

  const logOut = useCallback(async () => {
    await signOut(auth);
    navigate(0);
  }, [navigate]);

  const signIn = useCallback(
    async ({ email, password }) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        modalCloseHandler("logInIsOpen");
      } catch (error) {
        dispatch(postError(error.code));
      }
    },
    [dispatch]
  );

  const defaultImgUrl = `https://firebasestorage.googleapis.com/v0/b/plan-it-travel.appspot.com/o/profileImg%2Fdefault.png?alt=media&token=8120e805-4c3c-47d6-af3b-d191b6b81608`;
  const createUser = async (values, imgFile) => {
    const { email, password, displayName } = values;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (imgFile === undefined || imgFile === null)
        return await updateProfile(auth.currentUser, { displayName, photoURL: defaultImgUrl });
      const imageRef = ref(storage, `profileImg/${auth.currentUser.uid}`);
      await uploadBytes(imageRef, imgFile);
      const url = await getDownloadURL(imageRef);
      await updateProfile(auth.currentUser, { displayName, photoURL: url });
      modalCloseHandler("signUpIsOpen");
      navigate(0);
    } catch (error) {
      dispatch(postError(error.code));
    }
  };
  return { currentUser, logOut, signIn, createUser };
};
