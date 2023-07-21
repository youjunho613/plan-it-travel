import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import sideBarLogo from "assets/sideBarLogo.png";
import { useDispatch } from "react-redux";
import { getDataList, getPagination } from "redux/modules/detailData";
import { openModal } from "redux/modules/modal";
import { useAuth } from "hooks";
import { Text } from "components/common";

const Sidebar = ({ kakao, state, setState, map, isLocation, option }) => {
  const dispatch = useDispatch();
  const modalOpenHandler = target => dispatch(openModal(target));

  const iconAttr = icon => ({
    icon: icons[icon],
    style: { color: "#bf94ff", marginRight: "10px" }
  });

  const [isOpen, setIsOpen] = useState({ mountain: false, sea: false, hotel: false, Store: false });
  const openHandler = target =>
    isOpen[target]
      ? setIsOpen({ ...isOpen, [target]: false })
      : setIsOpen({ ...isOpen, [target]: true });

  const { currentUser, logOut } = useAuth();

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
    <SideBar>
      <Img src={sideBarLogo} alt={"plan-it-travel"} />
      <Link to={"/"}>
        <FontAwesomeIcon {...iconAttr("faHouse")} />
        home
      </Link>
      <Ul onClick={() => openHandler("mountain")}>
        <FontAwesomeIcon {...iconAttr("faMountain")} />산
        {isOpen.mountain && (
          <>
            <Li onClick={() => SearchHandler("캠핑장")}>
              <FontAwesomeIcon {...iconAttr("faCaravan")} />
              캠핑장
            </Li>
            <Li onClick={() => SearchHandler("계곡")}>
              <FontAwesomeIcon {...iconAttr("faCampground")} />
              계곡
            </Li>
          </>
        )}
      </Ul>
      <Ul onClick={() => openHandler("sea")}>
        <FontAwesomeIcon {...iconAttr("faWater")} />
        바다
        {isOpen.sea && (
          <>
            <Li onClick={() => SearchHandler("해수욕장")}>
              <FontAwesomeIcon {...iconAttr("faUmbrellaBeach")} />
              해수욕장
            </Li>
          </>
        )}
      </Ul>
      <Ul onClick={() => openHandler("hotel")}>
        <FontAwesomeIcon {...iconAttr("faHotel")} />
        숙박
        {isOpen.hotel && (
          <>
            <Li onClick={() => SearchHandler("호텔")}>
              <FontAwesomeIcon {...iconAttr("faHotel")} />
              호텔
            </Li>
            <Li onClick={() => SearchHandler("모텔")}>
              <FontAwesomeIcon {...iconAttr("faHotel")} />
              모텔
            </Li>
          </>
        )}
      </Ul>
      <Ul onClick={() => openHandler("Store")}>
        <FontAwesomeIcon {...iconAttr("faShop")} />
        편의시설
        {isOpen.Store && (
          <>
            <Li onClick={() => SearchHandler("음식점")}>
              <FontAwesomeIcon {...iconAttr("faSpoon")} />
              음식점
            </Li>
            <Li onClick={() => SearchHandler("카페")}>
              <FontAwesomeIcon {...iconAttr("faMugSaucer")} />
              카페
            </Li>
            <Li onClick={() => SearchHandler("편의점")}>
              <FontAwesomeIcon {...iconAttr("faBasketShopping")} />
              편의점
            </Li>
            <Li onClick={() => SearchHandler("마트")}>
              <FontAwesomeIcon {...iconAttr("faCartShopping")} />
              마트
            </Li>
            <Li onClick={() => SearchHandler("주차장")}>
              <FontAwesomeIcon {...iconAttr("faSquareParking")} />
              주차장
            </Li>
          </>
        )}
      </Ul>
      {currentUser?.uid === null || currentUser?.uid === undefined ? null : (
        <AuthBox>
          <FlexBox onClick={() => dispatch(openModal("MyPlaceIsOpen"))}>
            <FontAwesomeIcon {...iconAttr("faEye")} />
            <Text as={"span"}>나만의 장소 보기</Text>
          </FlexBox>
          <FlexBox>
            <Link to={"/post"}>
              <FontAwesomeIcon {...iconAttr("faLocationDot")} />
              <Text as={"span"}>나만의 장소 지정하기</Text>
            </Link>
          </FlexBox>
          <FlexBox onClick={logOut}>
            <FontAwesomeIcon {...iconAttr("faArrowRightFromBracket")} />
            <Text as={"span"}>Logout</Text>
          </FlexBox>
        </AuthBox>
      )}
    </SideBar>
  );
};

export default Sidebar;

const SideBar = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 280px;
  height: 100vh;
  padding: 20px;
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  transition: 300ms;
`;

const Img = styled.img`
  display: inherit;
  align-self: center;
`;

const Ul = styled.ul`
  cursor: pointer;
`;

const Li = styled.li`
  margin: 10px 10px;
  cursor: pointer;
`;

const AuthBox = styled.div`
  position: absolute;
  bottom: 40px;

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
`;

const FlexBox = styled.div`
  cursor: pointer;
`;
