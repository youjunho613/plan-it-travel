import React, { useRef } from "react";
import useDispatch from "react-redux";
import { closeModal } from "./redux/module/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const RegisterModal = () => {
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
    <div onClick={overlayHandler}>
      <div ref={modalRef}>RegisterModal</div>
      <button onClick={closeModalHandler}>
        <FontAwesomeIcon icon={faXmark} style={{ color: "#000000" }} />
      </button>
    </div>
  );
};

export default RegisterModal;
