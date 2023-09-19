import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updatePassword
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { closeModal, postError } from "redux/modules";
import { auth, storage } from "server/firebase";
import { addUserData } from "redux/modules";
import toast from "react-simple-toasts";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalCloseHandler = useCallback(target => dispatch(closeModal(target)), [dispatch]);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (!user) return;
      const { email, uid, displayName, photoURL } = user;
      dispatch(addUserData({ email, uid, displayName, photoURL }));
    });
  }, [dispatch]);

  // 로그아웃 로직
  const logOut = useCallback(async () => {
    await signOut(auth);
    navigate("/");
    navigate(0);
  }, [navigate]);

  // 로그인 로직
  const signIn = useCallback(
    async ({ email, password }) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        modalCloseHandler("logInIsOpen");
      } catch (error) {
        dispatch(postError(error.code));
      }
    },
    [dispatch, modalCloseHandler]
  );

  // 회원탈퇴 로직
  const removeUser = async () => {
    const deleteConfirm = window.confirm("정말로 탈퇴하시겠습니까?");
    if (deleteConfirm) {
      deleteUser(auth.currentUser)
        .then(() => {
          toast("탈퇴가 정상적으로 처리되었습니다.", { theme: "success", zIndex: 9999 });
        })
        .catch(error => {
          dispatch(postError(error.code));
        });
    } else {
      toast("취소 하셨습니다.", { theme: "warning", zIndex: 9999 });
      return;
    }
    navigate("/");
    navigate(0);
    modalCloseHandler("modifyIsOpen");
  };

  // 회원가입 로직
  const defaultImgUrl = `https://firebasestorage.googleapis.com/v0/b/plan-it-travel.appspot.com/o/profileImg%2Fdefault.png?alt=media&token=8120e805-4c3c-47d6-af3b-d191b6b81608`;
  const createUser = async (values, imgFile) => {
    const { email, password, displayName } = values;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const imageRef = ref(storage, `profileImg/${auth.currentUser.uid}`);
      await uploadBytes(imageRef, imgFile);
      const url = await getDownloadURL(imageRef);
      imgFile
        ? await updateProfile(auth.currentUser, { displayName, photoURL: url })
        : await updateProfile(auth.currentUser, { displayName, photoURL: defaultImgUrl });
      modalCloseHandler("signUpIsOpen");
      navigate(0);
    } catch (error) {
      dispatch(postError(error.code));
    }
  };

  // 회원수정 로직
  const modifyUser = async (values, imgFile) => {
    const { displayName, newPassword } = values;
    try {
      const imageRef = ref(storage, `profileImg/${auth.currentUser.uid}`);
      await uploadBytes(imageRef, imgFile);
      const url = await getDownloadURL(imageRef);
      imgFile
        ? await updateProfile(auth.currentUser, { displayName, photoURL: url })
        : await updateProfile(auth.currentUser, { displayName, photoURL: defaultImgUrl });

      await updatePassword(auth.currentUser, newPassword);
      modalCloseHandler("modifyIsOpen");
      navigate(0);
    } catch (error) {
      dispatch(postError(error.code));
    }
  };

  return { logOut, signIn, createUser, removeUser, modifyUser };
};
