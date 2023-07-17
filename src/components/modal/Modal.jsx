import React from "react";
import { useSelector } from "react-redux";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function Modal() {
  const { isOpen, type } = useSelector(state => state.modal);

  if (isOpen) {
    switch (type) {
      case "login":
        return <LoginModal />;
      case "register":
        return <RegisterModal />;
      default:
        return;
    }
  }
}

export default Modal;
