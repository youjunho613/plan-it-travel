import { useState } from "react";
import * as Styled from "./Modal.styled";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "redux/modules/modal";
import { useAuth, useForm } from "hooks";
import { Button, Input, Text } from "components/common";

export const RegisterModal = () => {
  const dispatch = useDispatch();
  const modalCloseHandler = () => dispatch(closeModal("signUpIsOpen"));
  const { createUser } = useAuth();

  const { firebaseError } = useSelector(state => state.firebaseError);

  const initialState = { email: "", password: "", passwordConfirm: "", displayName: "" };
  const validation = () => {
    let errors = {};
    if (!values.email) errors.email = "이메일을 입력해주세요.";
    if (!values.password) errors.password = "비밀번호를 입력해주세요.";
    if (!values.displayName) errors.displayName = "닉네임을 입력해주세요.";
    if (values.password !== values.passwordConfirm)
      errors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    return errors;
  };

  const [imgFile, setImgFile] = useState();
  const onChangeAddFile = event => setImgFile(event.target.files[0]);

  const submitAction = async () => createUser(values, imgFile);

  const { values, errors, onSubmit, resister } = useForm(initialState, validation, submitAction);

  const inputAttr = type => ({ type, size: "modal", $bgcolor: "white" });
  const buttonAttr = $bgcolor => ({ $bgcolor, size: "medium", color: "black" });

  return (
    <Styled.Form onSubmit={onSubmit}>
      <Text fontSize={"48px"}>Sign Up</Text>
      <Input {...resister("email")} {...inputAttr("email")} placeholder="E-mail" />
      {errors.email ? <Text color={"red"}>{errors.email}</Text> : <div><br/></div>}
      <Input {...resister("password")} {...inputAttr("password")} placeholder="Password" />
      {errors.password ? <Text color={"red"}>{errors.password}</Text> : <div><br/></div>}
      <Input
        {...resister("passwordConfirm")}
        {...inputAttr("password")}
        placeholder="Password Confirm"
      />
      {errors.passwordConfirm ? <Text color={"red"}>{errors.passwordConfirm}</Text> : <div><br/></div>}
      <Input {...resister("displayName")} {...inputAttr("text")} placeholder="Nickname" />
      {errors.displayName ? <Text color={"red"}>{errors.displayName}</Text> : <div><br/></div>}
      <Text as={"label"} htmlFor="photoUrl">
        프로필 이미지 업로드
      </Text>
      <Input type="file" id="photoUrl" accept="image/*" onChange={onChangeAddFile} />
      {firebaseError !== "" && <Text>{firebaseError}</Text>}
      <div>
        <Button {...buttonAttr("white")} type="button" onClick={modalCloseHandler}>
          닫기
        </Button>
        <Button {...buttonAttr("theme1")}>회원가입</Button>
      </div>
    </Styled.Form>
  );
};
