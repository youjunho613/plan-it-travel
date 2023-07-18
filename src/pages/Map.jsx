import { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Input } from "components/common";
import { useNavigate } from "react-router";

const { kakao } = window;
//3000번으로 서버 열어야해요

export const Map = () => {
  // const [map, setMap] = useState(null);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const positions = [
  //     {
  //       content: "<div>카카오</div>",
  //       latlng: new kakao.maps.LatLng(33.450705, 126.570677)
  //     },
  //     {
  //       content: "<div>생태연못</div>",
  //       latlng: new kakao.maps.LatLng(33.450936, 126.569477)
  //     },
  //     {
  //       content: "<div>텃밭</div>",
  //       latlng: new kakao.maps.LatLng(33.450879, 126.56994)
  //     },
  //     {
  //       content: "<div>근린공원</div>",
  //       latlng: new kakao.maps.LatLng(33.451393, 126.570738)
  //     }
  //   ];

  //   const mapOption = {
  //     center: new kakao.maps.LatLng(33.450701, 126.570667),
  //     level: 3
  //   };

  //   // Create the map
  //   const map = new kakao.maps.Map(document.getElementById("map"), mapOption);
  //   setMap(map);

  //   positions.map((item)=>{
  //     const marker = new kakao.maps.Marker({
  //       map,
  //       position: item.latlng
  //     });

  //     const infowindow = new kakao.maps.InfoWindow({
  //       content: item.content
  //     });
  //     kakao.maps.event.addListener(marker, "mouseover", makeOverListener(map, marker, infowindow));
  //     kakao.maps.event.addListener(marker, "mouseout", makeOutListener(infowindow));

  //     kakao.maps.event.addListener(marker, "click", () =>
  //       clickMarkerListener(map, marker, infowindow, item)
  //     );
  //     });
  // }, []); // Empty dependency array ensures this effect runs only once after initial render

  // // Functions to handle mouseover and mouseout events for the markers
  // const makeOverListener = (map, marker, infowindow) => () => {
  //   infowindow.open(map, marker);
  // };

  // const makeOutListener = infowindow => () => {
  //   infowindow.close();
  // };
  
  // const clickMarkerListener = (map, marker, infowindow, item) => {
  //   const coordinates = item.latlng.Ma+","+item.latlng.La
  //   navigate(`/detail/${coordinates}`);
  // };


  
  // TODO 반응형
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
        <Input size={"large"} type="search" placeholder="Search" />
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
  background-color: #1f1f22;
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
