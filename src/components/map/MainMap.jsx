import React from "react";
import { Input } from "components/common";
import { CustomOverlayMap, Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { openModal } from "redux/modules/modal";
import { getDataList, getPagination } from "redux/modules/detailData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import markerImg from "assets/marker.png";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import * as Styled from "./MainMap.style";

export const MainMap = ({
  kakao,
  state,
  setState,
  map,
  setMap,
  isLocation,
  currentLoaction,
  option
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //검색
  const submitSearchValue = e => {
    e.preventDefault();
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(
      state.searchValue,
      (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          dispatch(getPagination(_pagination));
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];

          for (let i = 0; i < data.length; i++) {
            dispatch(getDataList(data));
            const { y, x, place_name, id } = data[i];
            markers.push({ position: { lat: y, lng: x }, content: place_name, id: id });
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          setState({ ...state, markers: markers });
          map.setBounds(bounds);
          dispatch(openModal("ListIsOpen"));
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          alert("검색 결과가 없습니다. 검색어를 확인해주세요");
          return;
        } else if (status === kakao.maps.services.Status.ERROR) {
          alert("검색 결과 중 오류가 발생했습니다.");
          return;
        }
      },
      isLocation ? option : ""
    );
  };
  //마커 클릭 시 디테일 페이지로 이동
  const markerClickHandler = id => {
    id.includes("-") ? navigate(`/myplacedetail/${id}`) : navigate(`/detail/${id}`);
  };
  return (
    <Styled.MapContainer>
      <form onSubmit={submitSearchValue}>
        <Input
          size={"large"}
          $bgcolor={"black"}
          type="search"
          placeholder="Search"
          value={state.searchValue}
          onChange={e => setState({ ...state, searchValue: e.target.value })}
        />
        <Styled.LocationBtn
          size={"small"}
          $bgcolor={"black"}
          type="button"
          onClick={currentLoaction}
        >
          {isLocation ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 0 512 512"
              fill="#A290E6"
            >
              <path d="M256 0c17.7 0 32 14.3 32 32V66.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H445.3C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.3C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H66.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zM128 256a128 128 0 1 0 256 0 128 128 0 1 0 -256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 512 512" fill="#fff">
              <path d="M256 0c17.7 0 32 14.3 32 32V66.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H445.3C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.3C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H66.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zM128 256a128 128 0 1 0 256 0 128 128 0 1 0 -256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" />
            </svg>
          )}
        </Styled.LocationBtn>
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
              size: { width: 60, height: 50 },
              options: { offset: { x: 30, y: 50 } }
            }}
            onClick={() => setState({ ...state, info: marker })}
          >
            {state.info && state.info.id === marker.id && (
              <CustomOverlayMap position={marker.position} xAnchor={0.5} yAnchor={1.56} zIndex={3}>
                <Styled.OverlayDiv>
                  <Styled.XButton onClick={() => setState({ ...state, info: "" })}>
                    <FontAwesomeIcon icon={faXmark} size="lg" style={{ color: "#ffffff" }} />
                  </Styled.XButton>
                  {marker.content}
                  <button onClick={() => markerClickHandler(marker.id)}>상세보기</button>
                </Styled.OverlayDiv>
              </CustomOverlayMap>
            )}
          </MapMarker>
        ))}
      </Map>
    </Styled.MapContainer>
  );
};
