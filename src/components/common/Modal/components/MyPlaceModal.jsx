import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import sideBarLogo from "assets/sideBarLogo.png";
import { closeModal } from "redux/modules/modal";
import { useQuery } from "react-query";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "server/firebase";
import { getUserPost } from "api/userPost";

export const MyPlaceModal = ({ setState, state }) => {
  const dispatch = useDispatch();
  const [authData, setAuthData] = useState("");
  const [myPlaceData, setMyPlaceData] = useState([]);

  useEffect(() => {
    //마운트 시 유저 정보 가져옴
    onAuthStateChanged(auth, users => setAuthData(users));
  }, []);
  console.log(authData)
  //유저 게시물 데이터 가져와서 리스트업&마커 표시를 위해 mainMap 컴포넌트에 보내줌
  useQuery("userPosts", getUserPost, {
    onSuccess: data => {
      if (data.length === 0) return;
      else {
        const myPlaceData = data?.filter(e => e.userId === authData.uid);
        const newMarkers = myPlaceData?.map(e => ({
          position: { lat: e?.y, lng: e?.x },
          content: e?.place_name,
          id: e?.id
        }));
        setMyPlaceData(myPlaceData);
        setState({
          ...state,
          markers: newMarkers,
          position: { center: { lat: myPlaceData[0]?.y, lng: myPlaceData[0]?.x }, isPanto: true }
        });
      }
    },
    onError: error => {
      alert(error);
    },
    enabled: authData.uid !== ""
  });
  console.log(myPlaceData)
  // 모달 닫기
  const modalCloseHandler = () => {
    dispatch(closeModal("MyPlaceIsOpen"));
    setState({
      ...state,
      markers: [],
      position: { center: { lat: 37.566826, lng: 126.9786567 }, isPanto: false }
    });
  };
  // 리스트 클릭 시 마커로 이동 및 오버레이 표시
  const showInfoHandler = data => {
    setState({
      ...state,
      info: { id: data.id },
      position: { center: { lat: data.y, lng: data.x }, isPanto: true }
    });
  };

  return (
    <ModalDiv>
      <ImgBox>
        <Img src={sideBarLogo} alt={"plan-it-travel"} />
        <XButton onClick={modalCloseHandler}>
          <FontAwesomeIcon icon={faXmark} size="2xl" style={{ color: "#ffffff" }} />
        </XButton>
      </ImgBox>
      <ModalUl>
        <Result>나만의 장소 {myPlaceData?.length}건</Result>
        {myPlaceData?.map(e => (
          <ModalLi key={e.id} onClick={() => showInfoHandler(e)}>
            {e.place_name}
          </ModalLi>
        ))}
      </ModalUl>
    </ModalDiv>
  );
};

const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const XButton = styled.button`
  position: absolute;
  top: 1%;
  left: 280px;
  background-color: #1f1f22;
  width: 30px;
  height: 50px;
  padding-right: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const Img = styled.img`
  display: inherit;
  align-self: center;
`;

const ModalUl = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: baseline;
  gap: 10px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 5px;
    height: 100%;
  }
  &::-webkit-scrollbar-thumb {
    border: 2px solid #a290e6;
    background-color: #a290e6;
  }
`;

const Result = styled.h1`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #1f1f22;
  padding-bottom: 5px;
`;

const ModalLi = styled.li`
  padding: 5px 3px;
  width: 100%;
  &:hover {
    cursor: pointer;
    background-color: #a290e6;
    border-radius: 5px;
  }
`;
