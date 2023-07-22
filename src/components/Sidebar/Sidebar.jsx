import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import * as Styled from "./Sidebar.style";
import { Link } from "react-router-dom";
import sideBarLogo from "assets/sideBarLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { getDataList, getPagination, openModal } from "redux/modules";
import { useAuth } from "hooks";
import { Text } from "components/common";
import { Category } from "./Category";

export const Sidebar = props => {
  const { kakao, state, setState, map, isLocation, option } = props;
  const dispatch = useDispatch();
  const modalOpenHandler = target => dispatch(openModal(target));

  const iconAttr = icon => ({
    icon: icons[icon],
    style: { color: "#bf94ff", marginRight: "10px" }
  });
  const {currentUser} = useSelector(state => state.userData);
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

      {currentUser?.uid === null || currentUser?.uid === undefined ? null : (
        <Styled.AuthBox>
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
