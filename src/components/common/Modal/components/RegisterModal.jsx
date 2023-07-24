import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "redux/modules/modal";
import { Button, Input, Text } from "components/common";
import { useForm, useAuth } from "hooks";

export const RegisterModal = () => {
  const dispatch = useDispatch();
  const modalCloseHandler = () => dispatch(closeModal("signUpIsOpen"));
  const { createUser } = useAuth();

  const initialState = { email: "", password: "", passwordConfirm: "", displayName: "" };
  const validation = () => {
    let errors = {};
    if (!values.email) errors.email = "이메일을 입력해주세요.";
    if (!values.password) errors.password = "비밀번호를 입력해주세요.";
    if (!values.displayName) errors.displayName = "닉네임을 입력해주세요.";
    if (values.password !== values.passwordConfirm)
      errors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    if (values.displayName.length >= 8) errors.displayName = "닉네임은 8자 이하로 입력해주세요.";
    return errors;
  };

  const [imgFile, setImgFile] = useState();
  const onChangeAddFile = event => setImgFile(event.target.files[0]);

  const submitAction = async () => createUser(values, imgFile);
  const { firebaseError } = useSelector(state => state.firebaseError);

  const { values, errors, onSubmit, resister } = useForm(initialState, validation, submitAction);
  const inputAttr = placeholder => ({ placeholder, size: "modal", $bgcolor: "white" });

  return (
    <Form onSubmit={onSubmit}>
      <Text fontSize={"48px"}>Sign Up</Text>
      <Input {...resister("email")} {...inputAttr("E-mail")} type="email" />
      {errors.email && <Text color={"red"}>{errors.email}</Text>}
      <Input {...resister("password")} {...inputAttr("Password")} type="password" />
      {errors.password && <Text color={"red"}>{errors.password}</Text>}
      <Input {...resister("passwordConfirm")} {...inputAttr("Password Confirm")} type="password" />
      {errors.passwordConfirm && <Text color={"red"}>{errors.passwordConfirm}</Text>}
      <Input {...resister("displayName")} {...inputAttr("Nickname")} type="text" />
      {errors.displayName && <Text color={"red"}>{errors.displayName}</Text>}
      <Text as={"label"} htmlFor="photoUrl">
        프로필 이미지 입력
      </Text>
      <Input type="file" id="photoUrl" accept="image/*" onChange={onChangeAddFile} />
      {firebaseError !== "" && <Text color={"red"}>{firebaseError}</Text>}
      <div>
        <Button
          type="button"
          size={"medium"}
          $bgcolor={"white"}
          color={"black"}
          onClick={modalCloseHandler}
        >
          닫기
        </Button>
        <Button size={"medium"} $bgcolor={"theme1"} color={"black"}>
          회원가입
        </Button>
      </div>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;
