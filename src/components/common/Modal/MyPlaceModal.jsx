import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import sideBarLogo from "assets/sideBarLogo.png";
import { closeModal } from "redux/modules/modal";
import { useQuery } from "react-query";
import { getUserPost } from "api/userPost";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "server/firebase";

export const MyPlaceModal = ({ setState, state }) => {
  const dispatch = useDispatch();
  const [authData, setAuthData] = useState("");
  const { isLoading, data } = useQuery("userPosts", getUserPost);

  useEffect(() => {
    onAuthStateChanged(auth, users => setAuthData(users));
  }, []);

  if (isLoading) {
    return;
  }
  const myPlaceData = data?.filter(e => e.userId === authData.uid);
  const markers = [];
  for (let i = 0; i < myPlaceData?.length; i++) {
    const { y, x, place_name, id } = data[i];
    markers.push({ position: { lat: y, lng: x }, content: place_name, id: id });
  }

  const modalCloseHandler = () => {
    dispatch(closeModal("MyPlaceIsOpen"));
    setState({
      ...state,
      markers: [],
      position: { center: { lat: 37.566826, lng: 126.9786567 }, isPanto: false }
    });
  };

  const showInfoHandler = data => {
    console.log(markers);
    setState({
      ...state,
      info: { id: data.id },
      position: { center: { lat: data.y, lng: data.x }, isPanto: true },
      markers: markers
    });
  };

  return (
    <Modaldiv>
      <ImgBox>
        <Img src={sideBarLogo} alt={"plan-it-travel"} />
        <XButton onClick={modalCloseHandler}>
          <FontAwesomeIcon icon={faXmark} size="2xl" style={{ color: "#ffffff" }} />
        </XButton>
      </ImgBox>
      <ModalUl>
        {myPlaceData?.map(e => (
          <ModalLi key={e.id} onClick={() => showInfoHandler(e)}>
            {e.place_name}
          </ModalLi>
        ))}
      </ModalUl>
    </Modaldiv>
  );
};

const Modaldiv = styled.div`
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

const ModalLi = styled.li`
  padding: 5px 3px;
  width: 100%;
  &:hover {
    cursor: pointer;
    background-color: #a290e6;
    border-radius: 5px;
  }
`;
