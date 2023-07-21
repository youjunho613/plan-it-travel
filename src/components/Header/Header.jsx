import { Modal, Text, Button, RegisterModal, LoginModal } from "components/common";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "redux/modules/modal";
import logo from "assets/logo.png";
import * as Styled from "./Header.style";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "hooks";

const Header = () => {
  const { logInIsOpen, signUpIsOpen } = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const modalOpenHandler = target => dispatch(openModal(target));

  const { currentUser, logOut } = useAuth();

  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () =>
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <Styled.Container
      style={{
        backgroundColor: scrollPosition === 0 ? "transparent" : "#1f1f22"
      }}
    >
      <Styled.Nav>
        <Link to={"/"}>
          <Styled.Img src={logo} alt={"plan-it-travel"} />
        </Link>
        <Styled.Ul>
          <Styled.Li>
            <Link to={"/"}>
              <Text fontSize={"15px"}>Home</Text>
            </Link>
          </Styled.Li>
          <Styled.Li>
            <Link to={"/Main"}>
              <Text fontSize={"15px"}>Map</Text>
            </Link>
          </Styled.Li>
          <Styled.Li>
            <Link to={"/survey"}>
              <Text fontSize={"15px"}>recommend</Text>
            </Link>
          </Styled.Li>
        </Styled.Ul>
      </Styled.Nav>

      <Styled.ButtonBox>
        {!currentUser.uid ? (
          <>
            <Button
              $bgcolor={"theme1"}
              size={"small"}
              fontSize={"5px"}
              onClick={() => modalOpenHandler("logInIsOpen")}
            >
              Log In
            </Button>
            {logInIsOpen && (
              <Modal closeTarget={"logInIsOpen"}>
                <LoginModal />
              </Modal>
            )}
            <Button
              $bgcolor={"theme1"}
              size={"small"}
              fontSize={"5px"}
              onClick={() => modalOpenHandler("signUpIsOpen")}
            >
              Sign Up
            </Button>
            {signUpIsOpen && (
              <Modal closeTarget={"signUpIsOpen"}>
                <RegisterModal />
              </Modal>
            )}
          </>
        ) : (
          <>
            <Link to={`/mypage/${currentUser.uid}`}>
              <Styled.ProfileImg src={currentUser.photoURL} />
            </Link>
            <Button $bgcolor={"theme1"} size={"small"} fontSize={"5px"} onClick={logOut}>
              Log Out
            </Button>
          </>
        )}
      </Styled.ButtonBox>
    </Styled.Container>
  );
};

export default Header;
