import styled from "styled-components";
import { useDispatch } from "react-redux";
import { closeModal } from "redux/modules/modal";
import useForm from "hooks/useForm";
import { Button, Input, Text } from "components/common";
import { useAuth } from "components/auth";

export const LoginModal = () => {
  const dispatch = useDispatch();
  const modalCloseHandler = () => dispatch(closeModal("logInIsOpen"));
  const { signIn } = useAuth();

  const initialState = { email: "", password: "" };
  const validation = () => {};
  const submitAction = () => {
    signIn(values);
    modalCloseHandler();
  };
  const { values, errors, onSubmit, resister } = useForm(initialState, validation, submitAction);

  return (
    <Form onSubmit={onSubmit}>
      <Text fontSize={"48px"}>Log In</Text>
      <Input
        {...resister("email")}
        type="email"
        placeholder="email"
        size={"modal"}
        $bgcolor={"white"}
      />
      {/* {errors.email && <Text>{errors.email}</Text>} */}
      <Input
        {...resister("password")}
        type="password"
        placeholder="password"
        size={"modal"}
        $bgcolor={"white"}
      />
      {/* {errors.password && <Text>{errors.password}</Text>} */}
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
          로그인
        </Button>
      </div>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 35px;
`;
