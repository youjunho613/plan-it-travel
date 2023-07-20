import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { closeModal } from "redux/modules/modal";
import useForm from "hooks/useForm";
import { Button, Input, Text } from "components/common";
import { createUser } from "components/auth";

const RegisterModal = () => {
  const dispatch = useDispatch();
  const modalCloseHandler = () => dispatch(closeModal("SignupIsOpen"));

  const initialState = { email: "", password: "", passwordConfirm: "", displayName: "" };
  const validation = () => {
    let errors = {};
    if (values.password !== values.passwordConfirm)
      return (errors.passwordConfirm = "비밀번호가 일치하지 않습니다.");
  };

  const [imgFile, setImgFile] = useState();
  const onChangeAddFile = event => setImgFile(event.target.files[0]);

  const submitAction = async () => {
    createUser(values, imgFile);
    modalCloseHandler();
  };

  const { values, errors, onSubmit, resister } = useForm(initialState, validation, submitAction);
  console.log("values :", values);

  return (
    <Form onSubmit={onSubmit}>
      <Text fontSize={"48px"}>Sign Up</Text>
      <Input
        {...resister("email")}
        type="email"
        placeholder="E-mail"
        size={"modal"}
        $bgcolor={"white"}
      />
      {errors.email && <Text>{errors.email}</Text>}
      <Input
        {...resister("password")}
        type="password"
        placeholder="Password"
        size={"modal"}
        $bgcolor={"white"}
      />
      {errors.password && <Text>{errors.password}</Text>}
      <Input
        {...resister("passwordConfirm")}
        type="password"
        placeholder="Password Confirm"
        size={"modal"}
        $bgcolor={"white"}
      />
      {errors.passwordConfirm && <Text>{errors.passwordConfirm}</Text>}
      <Input
        {...resister("displayName")}
        type="text"
        placeholder="Nickname"
        size={"modal"}
        $bgcolor={"white"}
      />
      {errors.displayName && <Text>{errors.displayName}</Text>}
      <Text as={"label"} htmlFor="photoUrl">
        프로필 이미지 입력
      </Text>
      <Input
        type="file"
        id="photoUrl"
        accept="image/*"
        onChange={onChangeAddFile}
        // style={{ display: "none" }}
      />
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

export default RegisterModal;
