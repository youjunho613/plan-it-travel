import { Modal } from "components/common";
import LoginModal from "components/common/Modal/LoginModal";
import RegisterModal from "components/common/Modal/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "redux/modules/modal";
import * as Styled from "./Header.style";
import { Button } from "components/common";
import { logOut } from "components/auth";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const { LoginIsOpen, SignupIsOpen } = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const modalOpenHandler = target => dispatch(openModal(target));

  return (
    <Styled.NavContainer>
      <Styled.Logospan>
        <h1>Logo</h1>
        <p onClick={()=>navigate("/main")}>Home</p>
        <p>Mypage</p>
      </Styled.Logospan>
      <Styled.Searchspan>
        <Button
          $bgcolor={"theme1"}
          size={"small"}
          fontSize={"5px"}
          onClick={() => modalOpenHandler("LoginIsOpen")}
        >
          Log In
        </Button>
        {LoginIsOpen && (
          <Modal closeTarget={"LoginIsOpen"}>
            <LoginModal />
          </Modal>
        )}
        <Button $bgcolor={"theme1"} size={"small"} fontSize={"5px"} onClick={logOut}>
          Log Out
        </Button>
        <Button
          $bgcolor={"theme1"}
          size={"small"}
          fontSize={"5px"}
          onClick={() => modalOpenHandler("SignupIsOpen")}
        >
          Sign Up
        </Button>
        {SignupIsOpen && (
          <Modal closeTarget={"SignupIsOpen"}>
            <RegisterModal />
          </Modal>
        )}
      </Styled.Searchspan>
    </Styled.NavContainer>
  );
};

export default Header;
