import { Modal, Text, Button, RegisterModal, LoginModal } from "components/common";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "redux/modules";
import logo from "assets/logo.png";
import * as Styled from "./Header.style";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "hooks";

const Header = () => {
  const { logInIsOpen, signUpIsOpen } = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const modalOpenHandler = target => dispatch(openModal(target));
  const { currentUser } = useSelector(state => state.userData);
  const { logOut } = useAuth();

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollStyle = {
    style: { backgroundColor: scrollPosition === 0 ? "transparent" : "#1f1f22" }
  };

  const updateScroll = () =>
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const buttonAttr = { $bgcolor: "theme1", size: "small", fontSize: "5px" };
  const headerNav = [
    { path: "/", name: "Home" },
    { path: "/main", name: "Map" },
    { path: "/survey", name: "Recommend" }
  ];

  return (
    <Styled.Container {...scrollStyle}>
      <Styled.Nav>
        <Link to={"/"}>
          <Styled.Img src={logo} alt={"plan-it-travel"} />
        </Link>
        <Styled.Ul>
          {headerNav.map(li => {
            return (
              <Styled.Li key={li.name}>
                <Link to={li.path}>
                  <Text fontSize={"15px"}>{li.name}</Text>
                </Link>
              </Styled.Li>
            );
          })}
        </Styled.Ul>
      </Styled.Nav>

      {!currentUser?.uid ? (
        <Styled.ButtonBox>
          <Button {...buttonAttr} onClick={() => modalOpenHandler("logInIsOpen")}>
            Log In
          </Button>
          {logInIsOpen && (
            <Modal closeTarget={"logInIsOpen"}>
              <LoginModal />
            </Modal>
          )}
          <Button {...buttonAttr} onClick={() => modalOpenHandler("signUpIsOpen")}>
            Sign Up
          </Button>
          {signUpIsOpen && (
            <Modal closeTarget={"signUpIsOpen"}>
              <RegisterModal />
            </Modal>
          )}
        </Styled.ButtonBox>
      ) : (
        <Styled.ButtonBox>
          <Link to={`/mypage/${currentUser?.uid}`}>
            <Styled.ProfileImg src={currentUser?.photoURL} />
          </Link>
          <Button {...buttonAttr} onClick={logOut}>
            Log Out
          </Button>
        </Styled.ButtonBox>
      )}
    </Styled.Container>
  );
};

export default Header;
