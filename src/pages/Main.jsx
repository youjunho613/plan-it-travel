import styled from "styled-components";
import { MainListModal, Modal } from "components/common";
import Sidebar from "components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "redux/modules/modal";
import { MainMap } from "components/map/MainMap";
import { MyPlaceModal } from "components/common/Modal/MyPlaceModal";

const { kakao } = window;

export const Main = () => {
  const { ListIsOpen, MyPlaceIsOpen } = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const [map, setMap] = useState();
  const [isLocation, setIsLocation] = useState(false);
  const [state, setState] = useState({
    searchValue: "",
    position: { center: { lat: 37.566826, lng: 126.9786567 }, isPanto: false },
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
          setState({
            ...state,
            position: {
              center: { lat: position.coords.latitude, lng: position.coords.longitude },
              isPanto: true
            }
          });
        });
        return setIsLocation(true);
      } else {
        setState({
          ...state,
          position: {
            center: { lat: 37.566826, lng: 126.9786567 },
            isPanto: false
          }
        });
        alert("현재 위치를 알 수 없어 기본 위치로 이동합니다.");
      }
    }
    if (isLocation === true) {
      setState({
        ...state,
        position: {
          center: { lat: 37.566826, lng: 126.9786567 },
          isPanto: false
        }
      });
      return setIsLocation(false);
    }
  };
  //현재위치 사용 시 검색 함수 옵션
  const option = {
    location: new kakao.maps.LatLng(state.position.center.lat, state.position.center.lng),
    radius: 10000,
    sor: kakao.maps.services.SortBy.DISTANCE
  };

  // TODO 반응형
  return (
    <Container>
      {ListIsOpen && (
        <Modal type={"main"}>
          <MainListModal setState={setState} state={state} setIsLocation={setIsLocation} />
        </Modal>
      )}
      {MyPlaceIsOpen && (
        <Modal type={"main"}>
          <MyPlaceModal setState={setState} state={state} />
        </Modal>
      )}
      <Sidebar
        kakao={kakao}
        state={state}
        setState={setState}
        map={map}
        isLocation={isLocation}
        currentLoaction={currentLoaction}
        option={option}
      />
      <MainMap
        kakao={kakao}
        state={state}
        setState={setState}
        map={map}
        setMap={setMap}
        isLocation={isLocation}
        currentLoaction={currentLoaction}
        option={option}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
`;
