import { useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const { kakao } = window;

// TODO 축소시 끊기는 렌더링
export const Map = () => {
  useEffect(() => {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        // TODO 렌더링화면 좌표 수정
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      };
    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);
  }, []);

  return (
    <Container>
      <SideBar>
        <h1>Logo</h1>
        <SideBarUl>
          <li>
            <FontAwesomeIcon icon={faHouse} style={{ color: "#BF94FF", marginRight: 10 }} />
            home
          </li>
          <li>
            <FontAwesomeIcon icon={faHouse} style={{ color: "#BF94FF", marginRight: 10 }} />
            home
          </li>
          <li>
            <FontAwesomeIcon icon={faHouse} style={{ color: "#BF94FF", marginRight: 10 }} />
            home
          </li>
          <li>
            <FontAwesomeIcon icon={faHouse} style={{ color: "#BF94FF", marginRight: 10 }} />
            home
          </li>
        </SideBarUl>
        <div>
          {" "}
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            style={{ color: "#BF94FF", marginRight: 10 }}
          />
          Logout
        </div>
      </SideBar>
      <MapContainer id="map">
        <input type="search" placeholder="Search" />
      </MapContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const SideBar = styled.div`
  width: 15vw;
  min-width: 200px;
  height: 100vh;
  background-color: #040404;
  color: white;
  padding: 20px;
  position: relative;

  & > h1 {
    margin: 25px 0 60px 0;
  }

  & > div {
    position: absolute;
    bottom: 20px;
    display: flex;
    cursor: pointer;
  }
`;

const SideBarUl = styled.ul`
  padding-left: 15px;

  & > li {
    display: flex;
    cursor: pointer;
    margin-bottom: 40px;
  }
`;

const MapContainer = styled.div`
  width: 85vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  & > input {
    width: 300px;
    height: 35px;
    border-radius: 5px;
    border: none;
    background-color: black;
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
