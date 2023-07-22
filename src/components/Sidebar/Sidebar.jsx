import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import * as Styled from "./Sidebar.style";
import { Link } from "react-router-dom";
import sideBarLogo from "assets/sideBarLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { getDataList, getPagination, openModal } from "redux/modules";
import { useAuth } from "hooks";
import { Text, Modal } from "components/common";
import { Category } from "./Category";
import YouTube from "react-youtube";

export const Sidebar = props => {
  const { kakao, state, setState, map, isLocation, option } = props;
  const dispatch = useDispatch();
  const modalOpenHandler = target => dispatch(openModal(target));

  const iconAttr = icon => ({
    icon: icons[icon],
    style: { color: "#bf94ff", marginRight: "10px" }
  });

  const { isYoutubeOpen } = useSelector(state => state.modal);
  const { currentUser } = useSelector(state => state.userData);
  const { logOut } = useAuth();

  // 키워드 검색
  const SearchHandler = keyword => {
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(
      keyword,
      (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          dispatch(getPagination(_pagination));
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];

          for (let i = 0; i < data.length; i++) {
            dispatch(getDataList(data));
            const { y, x, place_name, id } = data[i];
            markers.push({ position: { lat: y, lng: x }, content: place_name, id: id });
            bounds.extend(new kakao.maps.LatLng(y, x));
          }
          setState({ ...state, markers: markers });
          map.setBounds(bounds);
          modalOpenHandler("ListIsOpen");
        }
      },
      isLocation ? option : ""
    );
  };

  return (
    <Styled.SideBar>
      <Styled.Img src={sideBarLogo} alt={"plan-it-travel"} />
      <Link to={"/"}>
        <FontAwesomeIcon {...iconAttr("faHouse")} />
        home
      </Link>
      <Category SearchHandler={SearchHandler} />

      {isYoutubeOpen && (
        <Modal type={"youtube"} closeTarget={"isYoutubeOpen"}>
          <YouTube
            videoId={"wogyLl3BbjY"}
            opts={{
              width: "800",
              height: "500",
              playerVars: {
                autoplay: 1,
                rel: 0,
                modestbranding: 1
              }
            }}
            onEnd={e => {
              e.target.stopVideo(0);
            }}
          />
        </Modal>
      )}
      {currentUser?.uid === null || currentUser?.uid === undefined ? null : (
        <Styled.AuthBox>
          <Styled.FlexBox onClick={() => dispatch(openModal("isYoutubeOpen"))}>
            <svg
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: "10px" }}
              height="1em"
              viewBox="0 0 576 512"
            >
              <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
            </svg>
            <Text as={"span"}>여행 꿀팁</Text>
          </Styled.FlexBox>

          <Styled.FlexBox onClick={() => dispatch(openModal("MyPlaceIsOpen"))}>
            <FontAwesomeIcon {...iconAttr("faEye")} />
            <Text as={"span"}>나만의 장소 보기</Text>
          </Styled.FlexBox>
          <Styled.FlexBox>
            <Link to={"/post"}>
              <FontAwesomeIcon {...iconAttr("faLocationDot")} />
              <Text as={"span"}>나만의 장소 지정하기</Text>
            </Link>
          </Styled.FlexBox>
          <Styled.FlexBox onClick={logOut}>
            <FontAwesomeIcon {...iconAttr("faArrowRightFromBracket")} />
            <Text as={"span"}>Logout</Text>
          </Styled.FlexBox>
        </Styled.AuthBox>
      )}
    </Styled.SideBar>
  );
};
