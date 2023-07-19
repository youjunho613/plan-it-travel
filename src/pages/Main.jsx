import styled from "styled-components";
import { Input, Modal } from "components/common";
import Sidebar from "components/Sidebar/Sidebar";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "redux/modules/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import logo from "assets/logo.png";

const { kakao } = window;

export const Main = () => {
  const { ListIsOpen } = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const modalOpenHandler = target => dispatch(openModal(target));
  const [test, setTest] = useState("");
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [dataList, setDataList] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [position, setPosition] = useState({
    center: {
      lat: 37.566826,
      lng: 126.9786567
    },
    isPanto: false
  });

  const testSubmit = e => {
    e.preventDefault();
    const ps = new kakao.maps.services.Places();

    if (!test.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요!");
      return;
    }

    ps.keywordSearch(test, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        setPagination(_pagination);
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (let i = 0; i < data.length; i++) {
          setDataList(data);
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x
            },
            content: data[i].place_name
          });
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        map.setBounds(bounds);
        modalOpenHandler("ListIsOpen");
      }
    });
  };

  const prevPage = () => {
    if (pagination === null) return;
    if (pagination.hasPrevPage) pagination.prevPage();
  };
  const NextPage = () => {
    if (pagination === null) return;
    if (pagination.hasNextPage) pagination.nextPage();
  };

  const modalCloseHandler = () => {
    dispatch(closeModal("ListIsOpen"));
    setTest("");
    setMarkers([]);
    setDataList([]);
    setPosition({
      center: {
        lat: 37.566826,
        lng: 126.9786567
      },
      isPanto: false
    });
  };

  const showInfoHandler = data => {
    setInfo({ content: data.place_name });
    setPosition({
      center: { lat: data.y, lng: data.x },
      isPanto: true
    });
  };

  // TODO 반응형
  return (
    <Container>
      {ListIsOpen && (
        <Modal type={"main"}>
          <Modaldiv>
            <ImgBox>
              <Img src={logo} alt={"plan-it-travel"} />
              <XButton onClick={modalCloseHandler}>
                <FontAwesomeIcon icon={faXmark} size="2xl" style={{ color: "#ffffff" }} />
              </XButton>
            </ImgBox>
            <ModalUl>
              검색 결과:{pagination?.totalCount}건
              {dataList?.map(e => (
                <ModalLi key={e.id} onClick={() => showInfoHandler(e)}>
                  {e.place_name}
                </ModalLi>
              ))}
            </ModalUl>
            <MoveBtnBox>
              <button onClick={prevPage}>
                <FontAwesomeIcon icon={faChevronLeft} size="lg" style={{ color: "#ffffff" }} />
              </button>
              <span>
                {pagination?.current}...
                {pagination?.last}
              </span>
              <button onClick={NextPage}>
                <FontAwesomeIcon icon={faChevronRight} size="lg" style={{ color: "#ffffff" }} />
              </button>
            </MoveBtnBox>
          </Modaldiv>
        </Modal>
      )}
      <Sidebar />
      <MapContainer>
        <form onSubmit={testSubmit}>
          <Input
            size={"large"}
            $bgcolor={"black"}
            type="search"
            placeholder="Search"
            value={test}
            onChange={e => setTest(e.target.value)}
          />
        </form>
        {/* <Map center={{ lat: 33.5563, lng: 126.79581 }} style={{ width: "100%", height: "100%" }}>
          <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{ color: "#000" }}>Hello World!</div>
          </MapMarker>
        </Map> */}
        <Map // 로드뷰를 표시할 Container
          center={position.center}
          isPanto={position.isPanto}
          style={{
            width: "100%",
            height: "100%",
            zIndex: "1"
          }}
          level={3}
          onCreate={setMap}
        >
          {markers.map(marker => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
            >
              {info && info.content === marker.content && (
                <CustomOverlayMap
                  position={marker.position}
                  xAnchor={0.5}
                  yAnchor={1.45}
                  zIndex={3}
                >
                  <OverlayDiv>{marker.content}</OverlayDiv>
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
  margin-bottom: 60px;
`;

const XButton = styled.button`
  position: absolute;
  top: 1%;
  left: 15%;
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
  width: 150px;
  margin: 20px;
`;

const ModalUl = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: baseline;
  gap: 10px;
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

const MoveBtnBox = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
`;

const OverlayDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
  height: 100px;
  padding: 10px;
  border: 1px solid #1f1f22;
  background-color: #1f1f22;
  border-radius: 5px;
`;
