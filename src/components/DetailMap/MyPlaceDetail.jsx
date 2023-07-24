import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import markerImg from "assets/marker.png";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteUserPost, getUserPost } from "api/userPost";
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

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const deleteUserPostHandler = id => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteMutation.mutate(id);
      navigate("/");
    }
  };

  const deleteMutation = useMutation(deleteUserPost, {
    onSuccess: () => queryClient.invalidateQueries("userPosts")
  });

  return (
    <>
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
          <Styled.TrashIcon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            onClick={() => deleteUserPostHandler(userPosts.id)}
          >
            <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
          </Styled.TrashIcon>
          <Styled.LargeFont>{userPosts.place_name}</Styled.LargeFont>
          <div>{userPosts.address_name}</div>
          <div>{userPosts.content}</div>
        </Styled.MapWrap>
      </Styled.Wrap>
    </>
  );
};
