import * as Styled from "./Modal.styled";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "redux/modules/modal";

export const Modal = ({ children, closeTarget }) => {
  const dispatch = useDispatch();
  const modalCloseHandler = event => {
    if (event.target === event.currentTarget) {
      dispatch(closeModal(closeTarget));
    }
  };
  return createPortal(
    <Styled.Outer onClick={event => modalCloseHandler(event)}>
      <Styled.Inner $bgcolor={"modal"}>{children}</Styled.Inner>
    </Styled.Outer>,
    document.getElementById("modal-root")
  );
};
