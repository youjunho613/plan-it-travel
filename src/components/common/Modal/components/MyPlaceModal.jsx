import { useEffect, useState } from "react";
import * as Styled from "./customModal.style";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import sideBarLogo from "assets/sideBarLogo.png";
import { closeModal } from "redux/modules/modal";
import { useQuery } from "react-query";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "server/firebase";
import { getUserPost } from "api/userPost";
import toast from "react-simple-toasts";

export const MyPlaceModal = ({ setState, state }) => {
  const dispatch = useDispatch();
  const [authData, setAuthData] = useState("");
  const [myPlaceData, setMyPlaceData] = useState([]);

  useEffect(() => {
    //마운트 시 유저 정보 가져옴
    onAuthStateChanged(auth, users => setAuthData(users));
  }, []);

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
        if (myPlaceData?.length === 0) {
          setMyPlaceData(myPlaceData);
          setState({ position: { center: { lat: 37.566826, lng: 126.9786567 }, isPanto: false } });
        } else {
          setMyPlaceData(myPlaceData);
          setState({
            ...state,
            markers: newMarkers,
            position: { center: { lat: myPlaceData[0]?.y, lng: myPlaceData[0]?.x }, isPanto: true }
          });
        }
      }
    },
    onError: error => {
      toast(error, { theme: "failure", zIndex: 9999 });
    },
    enabled: authData.uid !== "",
    retry: false,
    refetchOnWindowFocus: false
  });

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
    <Styled.ModalDiv>
      <Styled.ImgBox>
        <Styled.Img src={sideBarLogo} alt={"plan-it-travel"} />
        <Styled.XButton onClick={modalCloseHandler}>
          <FontAwesomeIcon icon={faXmark} size="2xl" style={{ color: "#ffffff" }} />
        </Styled.XButton>
      </Styled.ImgBox>
      <Styled.ModalUl>
        <Styled.Result>나만의 장소 {myPlaceData?.length}건</Styled.Result>
        {myPlaceData?.map(e => (
          <Styled.ModalLi key={e.id} onClick={() => showInfoHandler(e)}>
            {e.place_name}
          </Styled.ModalLi>
        ))}
      </Styled.ModalUl>
    </Styled.ModalDiv>
  );
};
