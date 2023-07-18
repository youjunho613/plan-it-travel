import React from "react";
import styled from "styled-components";
import { Button } from "../Button";
import { useDispatch } from "react-redux";
import { closeModal } from "redux/modules/modal";
import { Input } from "../Input";

const LoginModal = () => {
  const dispatch = useDispatch();
  const modalCloseHandler = () => dispatch(closeModal("LoginIsOpen"));

  return (
    <Form>
      <H1>Log In</H1>
      <Input type="text" size={"medium"} theme={"white"} placeholder="email" />
      <Input type="password" size={"medium"} theme={"white"} placeholder="password" />
      <section>
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
          로그인
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

export default LoginModal;
