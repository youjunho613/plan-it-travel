import React, { useRef } from "react";
import useDispatch from "react-redux";
import { closeModal } from "./redux/module/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styled

const LoginModal = () => {
  const dispatch = useDispatch();
  const modalRef = useRef("");

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  const overlayHandler = e => {
    if (e.currentTarget === e.target) {
      dispatch(closeModal());
    }
  };

  return (
    <Cover onClick={overlayHandler}>
      <ModalDiv ref={modalRef}>
        LoginModal
        <button onClick={closeModalHandler}>
          <FontAwesomeIcon icon={faXmark} style={{ color: "#000000" }} />
        </button>
      </ModalDiv>
    </Cover>
  );
};

const Cover = styled.div`
  position: fixed;
  z-index: 2;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalDiv = styled.div`
  width: 400px;
  height: 200px;
  z-index: 999;
  position: absolute;
  font-size: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export default LoginModal;
