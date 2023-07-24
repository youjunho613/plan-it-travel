import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import markerImg from "assets/marker.png";
import { useSelector } from "react-redux";
import * as Styled from "./DetailMap.style";
import { BookmarkIcon } from "pages";

export const DetailMap = ({ paramsId }) => {
  const [draggable, setDraggable] = useState(true);
  const [zoomable, setZoomable] = useState(true);

  const { x, y, address_name, place_name, phone } = useSelector(
    state => state.detailData
  ).dataList?.find(e => e.id === paramsId);
  const position = { lat: y, lng: x };

  useEffect(() => {
    setZoomable(false);
    setDraggable(false);
  }, []);

  return (
    <Styled.Wrap>
      <Styled.MapWrap>
        <Map
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
        <BookmarkIcon kakaoId={paramsId} top={43} left={230} height={"30px"} />
        <Styled.LargeFont>{place_name}</Styled.LargeFont>
        <div>{address_name}</div>
        <div>{phone}</div>
      </Styled.MapWrap>
    </Styled.Wrap>
  );
};
