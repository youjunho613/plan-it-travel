import * as Styled from "./MyPage.styled";
import { useDispatch, useSelector } from "react-redux";
import { UserInfo } from "./UserInfo";
import { useState } from "react";
import { useAuth } from "hooks";
import { Modal, Text, UserModifyModal } from "components/common";
import { openModal, closeModal } from "redux/modules";
import { Bookmark } from "components/Bookmark";

export const MyPage = () => {
  const [isOpen, setIsOpen] = useState({ bookmarkIsOpen: false, userInfoIsOpen: true });

  const { removeUser } = useAuth();
  const { currentUser } = useSelector(state => state.userData);

  const { modifyIsOpen, settingIsOpen } = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const modalOpenHandler = target => dispatch(openModal(target));
  const modalCloseHandler = target => dispatch(closeModal(target));

  const openHandler = target => {
    setIsOpen({ bookmarkIsOpen: target === "bookmark", userInfoIsOpen: target === "userInfo" });
  };

  return (
    <Styled.PageContainer>
      <Styled.UserContainer>
        <Styled.UserImg src={currentUser?.photoURL} />
        <Text fontSize={"20px"}>{currentUser?.displayName}</Text>
      </Styled.UserContainer>
      <Styled.OptionBar>
        <Text
          style={{ cursor: "pointer" }}
          fontSize={"20px"}
          onClick={() => openHandler("userInfo")}
        >
          회원정보 보기
        </Text>
        <Text fontSize={"20px"}>|</Text>
        <Text
          style={{ cursor: "pointer" }}
          fontSize={"20px"}
          onClick={() => openHandler("bookmark")}
        >
          북마크 보기
        </Text>
      </Styled.OptionBar>
      {isOpen.userInfoIsOpen && <UserInfo currentUser={currentUser} />}
      {settingIsOpen && (
        <Modal type={"setting"} closeTarget={"settingIsOpen"}>
          <Styled.SettingContentButton
            onClick={() => {
              modalOpenHandler("modifyIsOpen");
              modalCloseHandler("settingIsOpen");
            }}
          >
            정보 수정
          </Styled.SettingContentButton>
          <Styled.SettingContentButton onClick={removeUser}>회원 탈퇴</Styled.SettingContentButton>
        </Modal>
      )}
      {modifyIsOpen && (
        <Modal type={"modify"} closeTarget={"modifyIsOpen"}>
          <UserModifyModal />
        </Modal>
      )}
      {isOpen.bookmarkIsOpen && <Bookmark currentUser={currentUser} />}
    </Styled.PageContainer>
  );
};
