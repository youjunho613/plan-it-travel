import { Button, Input, Modal, Text } from "components/common";
import { Input2 } from "components/common/Input/Input.style";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "redux/modules/modal";
import Header from "components/Header/Header";
import { styled } from "styled-components";

export const Home = () => {
  // modal
  /* const { formIsOpen } = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const modalOpenHandler = () => dispatch(openModal("formIsOpen"));
  const modalCloseHandler = () => dispatch(closeModal("formIsOpen"));
  <Button size={"medium"} $bgcolor={"green"} textColor={"white"} onClick={modalOpenHandler}>
    모달 오픈
  </Button>
  {formIsOpen && <Modal closeTarget={"formIsOpen"}></Modal>} */

  return (
    <div>
      <Header />
      <DivBox>
        <Button $bgcolor={"theme3"} size={"large"} fontSize={"10px"}>
          작성하기
        </Button>
      </DivBox>
    </div>
  );
};

const DivBox = styled.div`
  margin-top: 60px;
`;
