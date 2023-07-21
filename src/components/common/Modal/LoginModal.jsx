import * as Styled from "./Modal.styled";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "redux/modules";
import { useForm, useAuth } from "hooks";
import { Button, Input, Text } from "components/common";

export const LoginModal = () => {
  const dispatch = useDispatch();
  const modalCloseHandler = () => dispatch(closeModal("logInIsOpen"));
  const { signIn } = useAuth();

  const { firebaseError } = useSelector(state => state.firebaseError);

  const initialState = { email: "", password: "" };
  const validation = () => {
    let errors = {};
    if (!values.email) errors.email = "이메일을 입력해주세요.";
    if (!values.password) errors.password = "비밀번호를 입력해주세요.";
    return errors;
  };

  const submitAction = () => signIn(values);

  const { values, errors, onSubmit, resister } = useForm(initialState, validation, submitAction);

  const inputAttr = type => ({ type, size: "modal", $bgcolor: "white" });
  const buttonAttr = $bgcolor => ({ $bgcolor, size: "medium", color: "black" });

  return (
    <Styled.Form onSubmit={onSubmit}>
      <Text fontSize={"48px"}>Log In</Text>
      <Input {...resister("email")} {...inputAttr("email")} placeholder="email" />
      {errors.email ? <Text color={"red"}>{errors.email}</Text> : <Text />}
      <Input {...resister("password")} {...inputAttr("password")} placeholder="password" />
      {errors.password ? <Text color={"red"}>{errors.password}</Text> : <Text />}
      {firebaseError !== "" && <Text color={"red"}>{firebaseError}</Text>}
      <div>
        <Button {...buttonAttr("white")} type="button" onClick={modalCloseHandler}>
          닫기
        </Button>
        <Button {...buttonAttr("theme1")}>로그인</Button>
      </div>
    </Styled.Form>
  );
};
