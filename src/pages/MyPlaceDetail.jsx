import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import markerImg from "assets/marker.png";
import { useQuery } from "react-query";
import { getUserPost } from "api/userPost";

export const MyPlaceDetail = () => {
  const params = useParams();
  const paramsId = params.id;
  const [draggable, setDraggable] = useState(true);
  const [zoomable, setZoomable] = useState(true);

  const userPosts = useQuery("userPosts", getUserPost).data?.find(e => e.id === paramsId);

  const position = { lat: userPosts.y, lng: userPosts.x };

  useEffect(() => {
    setZoomable(false);
    setDraggable(false);
  }, []);

  return (
    <Container>
      <Wrap>
        <MapWrap>
          <Map // 지도를 표시할 Container
            center={position}
            style={{
              width: "500px",
              height: "500px"
            }}
            level={3}
            draggable={draggable}
            zoomable={zoomable}
          >
            <MapMarker
              position={position}
              image={{
                src: markerImg,
                size: { width: 60, height: 50 },
                options: { offset: { x: 30, y: 50 } }
              }}
            />
          </Map>
          <LargeFont>{userPosts.place_name}</LargeFont>
          <div>{userPosts.address_name}</div>
          <div>{userPosts.content}</div>
        </MapWrap>
      </Wrap>
    </Container>
  );
};

const LargeFont = styled.div`
  font-size: 25px;
  font-weight: 700;
  width: 450px;
  text-align: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const MapWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 30px 60px 30px;
  background-color: #50505037;
  gap: 10px;
  line-break: anywhere;
  border-radius: 15px;
  position: relative;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
`;
