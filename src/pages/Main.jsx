import styled from "styled-components";
import { MainListModal, Modal } from "components/common";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainMap } from "components/map/MainMap";
import { Sidebar } from "components/Sidebar";
import { closeModal } from "redux/modules";

const { kakao } = window;

export const Main = () => {
  const initialPosition = { lat: 37.566826, lng: 126.9786567 };
  const { ListIsOpen } = useSelector(state => state.modal);
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
  }, [dispatch]);

  // 현재 위치 찾기
  const currentLoaction = () => {
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

  const props = { kakao, state, setState, map, isLocation, currentLoaction, option };

  // TODO 반응형
  return (
    <Container>
      {ListIsOpen && (
        <Modal type={"main"}>
          <MainListModal setState={setState} state={state} setIsLocation={setIsLocation} />
        </Modal>
      )}
      <Sidebar {...props} />
      <MainMap {...props} setMap={setMap} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
`;
