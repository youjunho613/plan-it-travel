import React from "react";
import styled from "styled-components";
import { Button } from "../Button";
import { useDispatch } from "react-redux";
import { closeModal } from "redux/modules/modal";
import { Input } from "../Input";

const RegisterModal = () => {
  const dispatch = useDispatch();
  const modalCloseHandler = () => dispatch(closeModal("SignupIsOpen"));

  return (
    <Form>
      <H1>Sign Up</H1>
      <Input type="text" size={"medium"} theme={"white"} placeholder="email" />
      <Input type="password" size={"medium"} theme={"white"} placeholder="password" />
      <section>
        <Button size={"medium"} $bgcolor={"white"} color={"black"} onClick={modalCloseHandler}>
          닫기
        </Button>
        <Button size={"medium"} $bgcolor={"theme1"} color={"black"}>
          회원가입
        </Button>
      </section>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;
const H1 = styled.h1`
  font-size: 3rem;
  line-height: 80px;
`;

export default RegisterModal;
