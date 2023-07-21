import styled, { keyframes } from "styled-components";
import { useAuth } from "components/auth";
import { getBookmarks } from "api/bookmarks";
import { useQuery } from "react-query";
import { Bookmark } from "components/Bookmark";
import { useNavigate } from "react-router";
import { useState } from "react";
import { deleteUser, getAuth, signOut } from "firebase/auth";
const MyPage = () => {
  const [bookmarkOpen, setBookmarkOpen] = useState(false);
  const [userInfoOpen, setUserInfoOpen] = useState(true);
  const [settingModal, setSettingModal] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const bookmarksData = useQuery("bookmarks", getBookmarks).data?.filter(
    e => e.userEmail === currentUser?.email
  );
  const MoveDetailPageHandler = id => {
    navigate(`/detail/${id}`);
  };
  const showUserInfo = () => {
    setBookmarkOpen(false);
    setUserInfoOpen(true);
  };
  const showBookmark = () => {
    setUserInfoOpen(false);
    setBookmarkOpen(true);
  };
  // 설정 모달 열기
  const openSettingModal = () => setSettingModal(true);

  // 모달창 외부 클릭 시 모달창 닫힘 로직
  const clickOutside = event => {
    setSettingModal(false);
  };

  // 회원정보수정 모달창 열기
  const openUserInfoModal = () => {
    setSettingModal(false);
  };
  // 회원탈퇴 로직
  const userDelete = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log("user",user)
    const deleteConfirm = window.confirm('정말로 탈퇴하시겠습니까?');
    console.log("deleteConfirm",deleteConfirm)
    if(deleteConfirm){
      deleteUser(user).then(() => {
        alert('탈퇴가 정상적으로 처리되었습니다.');
        signOut(auth);
        navigate('/');
      }).catch((error) => {
        console.log('errorCode', error.code);
      });
    }else alert('취소 하셨습니다.');
    setSettingModal(false);
  };
  // 비밀번호변경 모달 열기
  const openPwdModifyModal = () => {
    setSettingModal(false);
  };
  return (
    <PageContainer>
      <UserContainer>
        <UserImg src={currentUser?.photoURL}></UserImg>
        <LargeFont>{currentUser?.displayName}</LargeFont>
      </UserContainer>
      <OptionBar>
        <OptionBarClickDiv onClick={showUserInfo}>회원정보 보기</OptionBarClickDiv>
        <div>|</div>
        <OptionBarClickDiv onClick={showBookmark}>북마크 보기</OptionBarClickDiv>
      </OptionBar>
      {userInfoOpen && (
        <UserInfoWrap>
          <SettingFlexBox>
            기본 회원 정보
            <SettingSvg
              onClick={openSettingModal}
              xmlns="http://www.w3.org/2000/svg"
              height="2em"
              viewBox="0 0 512 512"
            >
              <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
            </SettingSvg>
          </SettingFlexBox>
          <FlexBox>
            <label>이메일</label>
            <CurrentUserInfo>{currentUser?.email}</CurrentUserInfo>
          </FlexBox>
          <FlexBox>
            <label>닉네임</label>
            <CurrentUserInfo>{currentUser?.displayName}</CurrentUserInfo>
          </FlexBox>
        </UserInfoWrap>
      )}
      {/* 설정 모달  */}
      {settingModal && (
        <ModalOverlay onClick={clickOutside}>
          <SettingContentBox>
            <SettingContentButton onClick={openUserInfoModal}>정보 수정</SettingContentButton>
            <SettingContentButton onClick={userDelete}>회원 탈퇴</SettingContentButton>
            <SettingContentButton onClick={openPwdModifyModal}>비밀번호 변경 </SettingContentButton>
          </SettingContentBox>
        </ModalOverlay>
      )}
      {bookmarkOpen && (
        <BookContainer>
          {bookmarksData?.map(bookmark => {
            return (
              <BookBiv>
                <BookTitle>
                  <DetailSvg
                    onClick={() => MoveDetailPageHandler(bookmark.kakaoId)}
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                  >
                    <path d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
                  </DetailSvg>
                  <LargeFont>
                    <PinMarker>
                      <svg
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                        height="0.8em"
                        viewBox="0 0 384 512"
                        style={{ marginRight: "5px" }}
                      >
                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                      </svg>
                    </PinMarker>
                    {bookmark.place_name}
                  </LargeFont>
                  <Bookmark kakaoId={bookmark.kakaoId} left={170} height={"30px"} />
                  <Adress>{bookmark.address_name}</Adress>
                </BookTitle>
              </BookBiv>
            );
          })}
        </BookContainer>
      )}
    </PageContainer>
  );
};

export default MyPage;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.582);
  backdrop-filter: blur(2px);
`;

const SettingContentBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(83, 83, 83, 0.445);
  border-radius: 10px;
`;
const SettingContentButton = styled.button`
  width: 300px;
  height: 50px;
  border-radius: 12px;
  &:hover {
    background-color: #8a8a8a81;
  }
`;

const rotation = keyframes`
    100%{
      transform:rotate(180deg);
    }
    `;
const SettingSvg = styled.svg`
  height: 30px;
  fill: #616161;
  cursor: pointer;
  &:hover {
    animation: ${rotation} 0.6s linear;
  }
`;
const CurrentUserInfo = styled.div`
  background-color: #7e7e7e2c;
  padding: 10px;
  border-radius: 5px;
`;
const UserInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.049);
  border-radius: 5px;
`;
const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 30px;
  font-size: 20px;
`;
const SettingFlexBox = styled(FlexBox)`
  justify-content: space-between;
`;

const OptionBarClickDiv = styled.div`
  cursor: pointer;
  font-size: 20px;
`;
const OptionBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const DetailSvg = styled.svg`
  cursor: pointer;
  fill: ${props => props.theme.colors.white};
  position: relative;
  bottom: 30px;
  left: 170px;
  height: 25px;
  transition: scale 0.3s;
  &:hover {
    scale: 1.2;
  }
  &:active {
    scale: 0.8;
  }
`;
const Adress = styled.p`
  width: 300px;
  text-align: center;
`;

const PinMarker = styled.span`
  margin: 5px;
`;
const LargeFont = styled.div`
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  width: 300px;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
`;
const UserImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const BookContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  width: 1280px;
`;
const BookBiv = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  width: 400px;
  padding: 40px 40px 70px 40px;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.049);
  backdrop-filter: blur(10px);
`;

const BookTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
