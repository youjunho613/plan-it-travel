import styled from "styled-components";
import { Input } from "components/common";
import Sidebar from "components/Sidebar/Sidebar";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export const Main = () => {
  // TODO 반응형
  return (
    <Container>
      <Sidebar />
      <MapContainer>
        <Input size={"large"} type="search" placeholder="Search" />
        <Map center={{ lat: 33.5563, lng: 126.79581 }} style={{ width: "100%", height: "100%" }}>
          {/* <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}> */}
          {/* <div style={{ color: "#000" }}>Hello World!</div> */}
          {/* </MapMarker> */}
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
    /* width: 438px;
    height: 56px;
    border-radius: 16px; */
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
