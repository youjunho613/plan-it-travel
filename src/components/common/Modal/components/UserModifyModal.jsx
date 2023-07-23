import { styled } from "styled-components";
import { Button, Input, Text } from "components/common";
import { useAuth, useForm } from "hooks";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "redux/modules";

export const UserModifyModal = () => {
  const { currentUser } = useSelector(state => state.userData);

  const { modifyUser } = useAuth();

  const [imgFile, setImgFile] = useState();
  const onChangeAddFile = event => setImgFile(event.target.files[0]);

  const dispatch = useDispatch();
  const modalCloseHandler = target => dispatch(closeModal(target));

  // 회원정보 수정 폼 로직

  const initialState = {
    displayName: "",
    newPassword: "",
    newPasswordConfirm: ""
  };
  const validation = () => {
    let errors = {};
    if (!values.displayName) errors.displayName = "닉네임을 입력해주세요.";
    if (values.newPassword !== values.newPasswordConfirm)
      errors.newPasswordConfirm = "비밀번호가 일치하지 않습니다.";
    if (values.displayName.length >= 8)
      return (errors.displayName = "닉네임은 8자 이하로 입력해주세요.");
    return errors;
  };
  const submitAction = () => modifyUser(values, imgFile);
  const { values, errors, onSubmit, resister } = useForm(initialState, validation, submitAction);

  return (
    <Form onSubmit={onSubmit}>
      {/* <Styled.Form onSubmit={onSubmit}> */}
      <Input
        type={"text"}
        size={"modal"}
        $bgcolor={"white"}
        placeholder={currentUser.displayName}
        {...resister("displayName")}
      />
      {errors?.displayName && <Text>{errors?.displayName}</Text>}
      <Input type="file" id="photoUrl" accept="image/*" onChange={onChangeAddFile} />
      <Input
        size={"modal"}
        $bgcolor={"white"}
        type="password"
        placeholder="새로운 비밀번호"
        {...resister("newPassword")}
      />
      <Input
        size={"modal"}
        $bgcolor={"white"}
        type="password"
        placeholder="새로운 비밀번호 확인"
        {...resister("newPasswordConfirm")}
      />
      {errors?.newPasswordConfirm && <Text>{errors?.newPasswordConfirm}</Text>}
      {/* <Styled.ButtonBox> */}
      <ButtonBox>
        <Button
          type="button"
          $bgcolor={"white"}
          size={"medium"}
          color={"black"}
          onClick={() => {
            modalCloseHandler("modifyIsOpen");
          }}
        >
          닫기
        </Button>
        <Button $bgcolor={"theme1"} size={"medium"} color={"black"}>
          수정
        </Button>
      </ButtonBox>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 35px;
`;

const ButtonBox = styled.div`
  display: inherit;
  align-items: center;
  margin: 0 20px;
  gap: 20px;
`;
