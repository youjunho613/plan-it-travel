import styled from "styled-components";
import { Modal, MainListModal, MyPlaceModal } from "components/common";
import { Sidebar } from "components/Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainMap } from "components/Map/MainMap";
import { youtubeApi } from "api/youtube";
import { closeModal } from "redux/modules";

const { kakao } = window;

export const Main = () => {
  const initialPosition = { lat: 37.566826, lng: 126.9786567 };
  const { ListIsOpen, MyPlaceIsOpen } = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const [map, setMap] = useState();
  const [isLocation, setIsLocation] = useState(false);
  const [state, setState] = useState({
    searchValue: "",
    position: { center: initialPosition, isPanto: false },
    markers: [],
    info: ""
  });

  useEffect(() => {
    localStorage.removeItem("detailData");
    dispatch(closeModal("ListIsOpen"));
    onYoutube();
  }, [dispatch]);

  // 현재 위치 찾기
  const currentLocation = () => {
    if (isLocation === false) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude: lat, longitude: lng } = position.coords;
          setState({ ...state, position: { center: { lat, lng }, isPanto: true } });
        });
        return setIsLocation(true);
      } else {
        setState({ ...state, position: { center: initialPosition, isPanto: false } });
        alert("현재 위치를 알 수 없어 기본 위치로 이동합니다.");
      }
    }
    if (isLocation === true) {
      setState({ ...state, position: { center: initialPosition, isPanto: false } });
      return setIsLocation(false);
    }
  };

  //현재위치 사용 시 검색 함수 옵션
  const option = {
    location: new kakao.maps.LatLng(state.position.center.lat, state.position.center.lng),
    radius: 10000,
    sor: kakao.maps.services.SortBy.DISTANCE
  };

  //유튜브
  const [youtubeRes, setYoutubeRes] = useState("");

  const onYoutube = async () => {
    try {
      const response = await youtubeApi.get("/playlistItems", {
        params: { part: "snippet", playlistId: "PLnqE8gRs0CvlBJ_EYU3DFFUSaKdTultEj" }
      });

      const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

      const youtubeRandom = getRandomInt(0, response.data.items.length);
      const selectedVideoId = response.data.items[youtubeRandom].snippet.resourceId.videoId;

      setYoutubeRes(selectedVideoId);
    } catch (error) {}
  };

  const props = {
    kakao,
    state,
    setState,
    map,
    isLocation,
    currentLocation,
    option
  };
  return (
    <Container>
      {ListIsOpen && (
        <Modal type={"main"}>
          <MainListModal setState={setState} state={state} setIsLocation={setIsLocation} />
        </Modal>
      )}
      <Sidebar {...props} youtubeRes={youtubeRes} />
      <MainMap {...props} setMap={setMap} />
      {MyPlaceIsOpen && (
        <Modal type={"main"}>
          <MyPlaceModal setState={setState} state={state} />
        </Modal>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
`;
