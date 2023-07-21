import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const firebaseError = createSlice({
  name: "authError",
  initialState,
  reducers: {
    postError: (state, action) => {
      switch (action.payload) {
        case "auth/user-not-found":
          return (state = { firebaseError: "이메일 혹은 비밀번호가 일치하지 않습니다." });
        case "auth/wrong-password":
          return (state = { firebaseError: "이메일 혹은 비밀번호가 일치하지 않습니다." });
        case "auth/email-already-in-use":
          return (state = { firebaseError: "이미 사용하는 이메일입니다." });
        case "auth/weak-password":
          return (state = { firebaseError: "비밀번호를 6자 이상 입력해주세요." });
        case "auth/missing-password":
          return (state = { firebaseError: "비밀번호가 틀립니다." });
        case "auth/invalid-email":
          return (state = { firebaseError: "유효하지 않은 이메일 입니다." });
        case "auth/admin-restricted-operation":
          return (state = { firebaseError: "필수입력 사항을 작성해주세요." });
        case "auth/internal-error":
          return (state = { firebaseError: "잘못된 요청입니다." });
        case "auth/network-request-failed":
          return (state = { firebaseError: "네트워크 연결에 실패 하였습니다." });
        default:
          console.log("New Error code:", action.payload);
      }
    }
  }
});

export const { postError } = firebaseError.actions;
export default firebaseError.reducer;
