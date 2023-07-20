import styled from "styled-components";
import { Input, Modal } from "components/common";
import Sidebar from "components/Sidebar/Sidebar";
import { CustomOverlayMap, Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "redux/modules/modal";
import { getDataList, getPagination } from "redux/modules/detailData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import markerImg from "assets/marker.png";
import { useNavigate } from "react-router";
import MainListModal from "components/common/Modal/MainListModal";

const { kakao } = window;

export const Main = () => {
  const { ListIsOpen } = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const modalOpenHandler = target => dispatch(openModal(target));
  const [state, setState] = useState({
    searchValue: "",
    position: { center: { lat: 37.566826, lng: 126.9786567 }, isPanto: false },
    markers: [],
    info: ""
  });
  const navigate = useNavigate();
  const [map, setMap] = useState();

  const submitSearchValue = e => {
    e.preventDefault();
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(state.searchValue, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        dispatch(getPagination(_pagination));
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (let i = 0; i < data.length; i++) {
          dispatch(getDataList(data));
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x
            },
            content: data[i].place_name,
            id: data[i].id
          });
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setState({ ...state, markers: markers });
        map.setBounds(bounds);
        modalOpenHandler("ListIsOpen");
      }
    });
  };

  const markerClickHandler = id => {
    navigate(`/detail/${id}`);
  };
  // TODO 반응형
  return (
    <Container>
      {ListIsOpen && (
        <Modal type={"main"}>
          <MainListModal setState={setState} state={state} />
        </Modal>
      )}
      <Sidebar state={state} setState={setState} map={map} />
      <MapContainer>
        <form onSubmit={submitSearchValue}>
          <Input
            size={"large"}
            $bgcolor={"black"}
            type="search"
            placeholder="Search"
            value={state.searchValue}
            onChange={e => setState({ ...state, searchValue: e.target.value })}
          />
        </form>
        <Map
          center={state.position.center}
          isPanto={state.position.isPanto}
          style={{
            width: "100%",
            height: "100%",
            zIndex: "1"
          }}
          level={3}
          onCreate={setMap}
          onZoomChanged={map => map.getLevel()}
        >
          <ZoomControl />
          {state.markers.map(marker => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              image={{
                src: markerImg,
                size: { width: 80, height: 70 },
                options: { offset: { x: 37, y: 60 } }
              }}
              onClick={() => setState({ ...state, info: marker })}
            >
              {state.info && state.info.content === marker.content && (
                <CustomOverlayMap position={marker.position} xAnchor={0.5} yAnchor={1.6} zIndex={3}>
                  <OverlayDiv>
                    <XButton onClick={() => setState({ ...state, info: "" })}>
                      <FontAwesomeIcon icon={faXmark} size="large" style={{ color: "#ffffff" }} />
                    </XButton>
                    {marker.content}
                    <button onClick={() => markerClickHandler(marker.id)}>상세보기</button>
                  </OverlayDiv>
                </CustomOverlayMap>
              )}
            </MapMarker>
          ))}
        </Map>
      </MapContainer>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  width: 100%;
`;

const MapContainer = styled.div`
  width: 85vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  & > form {
    z-index: 999;
    position: fixed;
    top: 20px;
  }
`;

const OverlayDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 150px;
  gap: 10px;
  height: 100px;
  padding: 10px;
  border: 1px solid #1f1f22;
  background-color: #1f1f22;
  border-radius: 5px;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    margin-left: -10px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 10px 0 10px;
    border-color: #1f1f22 transparent transparent transparent;
  }
`;

const XButton = styled.button`
  margin-left: auto;
`;
