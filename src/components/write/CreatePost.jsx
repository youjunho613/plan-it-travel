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
import markerImg from "assets/marker.png";

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
    currentLocations();
    // 로그인 유저 정보
    onAuthStateChanged(auth, users => setAuthData(users));
  }, []);
  // json 서버로 유저 게시물 post
  const postMutation = useMutation(postUserPost, {
    onSuccess: () => queryClient.invalidateQueries("userPosts")
  });
  // 현재 위치 정보
  const currentLocations = () => {
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
  const geoCorder = new kakao.maps.services.Geocoder();
  const getAddress = (lat, lng) => {
    const callback = (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const arr = { ...result };
        const _arr = arr[0].address.address_name;
        setValue({ ...value, addressValue: _arr });
      }
    };
    geoCorder.coord2Address(lng, lat, callback);
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
    navigate(`/main`);
  };

  return (
    <Styled.Layout>
      <Styled.Container>
        <Styled.ColumnBox>
          <Map
            center={currentPosition}
            style={{ width: "100%", height: "450px" }}
            level={5}
            onCreate={setMap}
            onClick={mapClickEvent}
          >
            {currentPosition && (
              <MapMarker
                position={clickPosition}
                image={{
                  src: markerImg,
                  size: { width: 60, height: 50 },
                  options: { offset: { x: 30, y: 50 } }
                }}
              />
            )}
          </Map>
          <Styled.AddressForm onSubmit={submitSearchValue}>
            <Styled.AddressInput
              placeholder={"주소 검색"}
              type="text"
              size={"modal"}
              $bgcolor={"white"}
              value={value.searchValue}
              autoFocus
              onChange={e => setValue({ ...value, searchValue: e.target.value })}
            />
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                height="1.5em"
                viewBox="0 0 512 512"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </button>
          </Styled.AddressForm>
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
          <div>
            <Button type="button" size={"medium"} $bgcolor={"black"}>
              취소
            </Button>
            <Button type="submit" size={"medium"} $bgcolor={"black"} onClick={submitHandler}>
              작성
            </Button>
          </div>
        </Styled.Form>
      </Styled.Container>
    </Styled.Layout>
  );
};

export default CreatePost;
