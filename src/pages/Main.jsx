import styled from "styled-components";
import { Input } from "components/common";
import Sidebar from "components/Sidebar/Sidebar";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";

export const Main = () => {
  // TODO 반응형 사이드바 고려 (햄버거 버튼)

  // 초기 지도 설정
  const mapOption = {
    center: { lat: 36.2683, lng: 127.6358 },
    style: { width: "100%", height: "100%" },
    level: 13
  };

  // 클러스터 로직
  const clusterOption = { averageCenter: true, minLevel: 10 };
  const [positions, setPositions] = useState([]);
  useEffect(() => {
    setPositions(clusterPositionsData.positions);
  }, []);

  //mock data
  const clusterPositionsData = {
    positions: [
      { lat: 33.55635, lng: 126.795841 },
      { lat: 35.50001, lng: 127.79001 },
      { lat: 36.55635, lng: 127.795841 },
      { lat: 36.55636, lng: 127.795842 },
      { lat: 36.55637, lng: 127.7958413 },
      { lat: 36.55635, lng: 128.795841 }
    ]
  };

  return (
    <Container>
      <Sidebar />
      <MapContainer>
        <Input size={"large"} type="search" placeholder="Search" />
        <Map {...mapOption}>
          <MarkerClusterer {...clusterOption}>
            {positions.map(pos => (
              <MapMarker key={`${pos.lat}-${pos.lng}`} position={pos} />
            ))}
          </MarkerClusterer>
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

  & > input {
    width: 300px;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #1f1f22;
    z-index: 999;
    position: fixed;
    top: 20px;
    outline: none;
    padding-left: 10px;

    &::placeholder {
      color: white;
    }
  }
`;