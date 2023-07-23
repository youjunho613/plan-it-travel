import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import markerImg from "assets/marker.png";
import { useQuery } from "react-query";
import { getUserPost } from "api/userPost";
import * as Styled from "./DetailMap.style";

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
    <>
      <Styled.Wrap>
        <Styled.MapWrap>
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
          <Styled.LargeFont style={{ paddingTop: "30px" }}>{userPosts.place_name}</Styled.LargeFont>
          <div>{userPosts.address_name}</div>
          <div>{userPosts.content}</div>
        </Styled.MapWrap>
      </Styled.Wrap>
    </>
  );
};
