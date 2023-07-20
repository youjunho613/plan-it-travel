import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "server/firebase";
// import { useCookies } from "react-cookie";

export const useAuth = () => {
  // const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  // let tokenTime = 600;
  const logOut = async () => {
    await signOut(auth);
    // removeCookie("userToken");
  };

  const onAuthState = () => {
    onAuthStateChanged(auth, user => {
      // setCookie("userToken", data.token, { path: "/", maxAge: tokenTime });
      console.log(user);
      console.log(user.stsTokenManager.accessToken);
    });
  };

  // TODO 쿠키 보류
  // FIXME 라이브러리 사용하는지?

  const signIn = async values => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
    } catch (error) {}
  };

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

  return { logOut, onAuthState, signIn, createUser };
};
