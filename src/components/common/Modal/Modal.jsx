import * as Styled from "./Modal.styled";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "redux/modules";

export const Modal = ({ children, closeTarget, type }) => {
  const dispatch = useDispatch();
  const modalCloseHandler = event => {
    if (event.target === event.currentTarget) dispatch(closeModal(closeTarget));
  };
  return createPortal(
    <Styled.Outer type={type} onClick={modalCloseHandler}>
      <Styled.Inner type={type} $bgcolor={"modal"}>
        {children}
      </Styled.Inner>
    </Styled.Outer>,
    document.getElementById("modal-root")
  );
};
