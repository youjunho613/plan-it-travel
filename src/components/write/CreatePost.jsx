import { Button, Input, Text } from "components/common";
import * as Styled from "./CreatePost.style";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { postUserPost } from "api/userPost";
import uuid from "react-uuid";
import { auth } from "server/firebase";
import { onAuthStateChanged } from "firebase/auth";

const { kakao } = window;

const CreatePost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [currentPosition, setCurrentPosition] = useState({ lat: "", lng: "" });
  const [clickPosition, setClickPosition] = useState({ lat: "", lng: "" });
  const [map, setMap] = useState();
  const [authData, setAuthData] = useState("");
  const [value, setValue] = useState({
    searchValue: "",
    titleValue: "",
    contentValue: "",
    addressValue: ""
  });

  useEffect(() => {
    // 현재 위치 정보 함수 호출
    currentLoaction();
    // 로그인 유저 정보
    onAuthStateChanged(auth, users => setAuthData(users));
  }, []);
  // json 서버로 유저 게시물 post
  const postMutation = useMutation(postUserPost, {
    onSuccess: () => queryClient.invalidateQueries("userPosts")
  });
  // 현재 위치 정보
  const currentLoaction = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      });
    }
  };
  // 위치 검색(유효성 검사 포함)
  const submitSearchValue = event => {
    event.preventDefault();
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(value.searchValue, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        const { y, x } = data[0];
        console.log(data[0].y);
        bounds.extend(new kakao.maps.LatLng(y, x));
        map.setBounds(bounds);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 없습니다. 검색어를 확인해주세요");
        return;
      }
    });
  };
  // 클릭한 마커 좌표 주소로 변환
  const geocorder = new kakao.maps.services.Geocoder();
  const getAddress = (lat, lng) => {
    const callback = (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const arr = { ...result };
        const _arr = arr[0].address.address_name;
        setValue({ ...value, addressValue: _arr });
      }
    };
    geocorder.coord2Address(lng, lat, callback);
  };
  // 맵에서 클릭시 마커로 좌표를 보내주는 이벤트
  const mapClickEvent = (_t, MouseEvent) => {
    setClickPosition({ lat: MouseEvent.latLng.getLat(), lng: MouseEvent.latLng.getLng() });
    getAddress(MouseEvent.latLng.getLat(), MouseEvent.latLng.getLng());
  };
  // 게시물 submit 핸들러(유효성 검사 포함)
  const submitHandler = e => {
    e.preventDefault();

    if (!value.addressValue) {
      return alert("마커를 지정해 주소를 넣어주세요!");
    }
    if (!value.titleValue) {
      return alert("장소명을 작성해주세요!");
    }
    if (!value.contentValue) {
      return alert("장소에 대한 내용을 작성해주세요!");
    }
    const newUserPost = {
      userId: authData.uid,
      id: uuid(),
      address_name: value.addressValue,
      place_name: value.titleValue,
      content: value.contentValue,
      x: clickPosition.lng,
      y: clickPosition.lat
    };

    postMutation.mutate(newUserPost);
    navigate(`/mypage/${authData.uid}`);
  };

  return (
    <Styled.Container>
      <Styled.ColumnBox>
        <Map
          center={currentPosition}
          style={{ width: "100%", height: "450px" }}
          level={5}
          onCreate={setMap}
          onClick={mapClickEvent}
        >
          {currentPosition && <MapMarker position={clickPosition} />}
        </Map>
        <form onSubmit={submitSearchValue}>
          <Input
            placeholder={"주소 검색"}
            type="text"
            size={"modal"}
            $bgcolor={"white"}
            value={value.searchValue}
            autoFocus
            onChange={e => setValue({ ...value, searchValue: e.target.value })}
          />
        </form>
      </Styled.ColumnBox>
      <Styled.Form>
        <Text> 글 작성 </Text>
        <Input
          placeholder={"지도에 마커를 찍어주세요!"}
          size={"modal"}
          $bgcolor={"white"}
          value={value.addressValue}
          disabled
        />
        <Input
          placeholder={"저 곳은 어떤 장소었나요?"}
          size={"modal"}
          $bgcolor={"white"}
          value={value.titleValue}
          onChange={e => setValue({ ...value, titleValue: e.target.value })}
        />
        <Input
          placeholder={"저 장소에서 어떤일이 있었나요?"}
          size={"modal"}
          $bgcolor={"white"}
          as={"textarea"}
          value={value.contentValue}
          onChange={e => setValue({ ...value, contentValue: e.target.value })}
        />
        <Styled.ButtonBox>
          <Button type="button" size={"medium"} $bgcolor={"black"}>
            취소
          </Button>
          <Button type="submit" size={"medium"} $bgcolor={"black"} onClick={submitHandler}>
            작성
          </Button>
        </Styled.ButtonBox>
      </Styled.Form>
    </Styled.Container>
  );
};

export default CreatePost;
