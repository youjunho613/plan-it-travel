import * as Styled from "components/Common/Modal/Modal.style";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "redux/modules/modalSlice";

const Modal = ({ children, closeTarget }) => {
  const dispatch = useDispatch();
  const modalCloseHandler = event => {
    if (event.target === event.currentTarget) {
      dispatch(closeModal(closeTarget));
    }
  };
  return createPortal(
    <Styled.Outer onClick={event => modalCloseHandler(event)}>
      <Styled.Inner $bgcolor={"sand"}>{children}</Styled.Inner>
    </Styled.Outer>,
    document.getElementById("modal-root")
  );
};

export default Modal;
