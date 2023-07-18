import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "assets/logo.png";

const Sidebar = () => {
  const iconAttr = icon => ({
    icon: icons[icon],
    style: { color: "#bf94ff", marginRight: "10px" }
  });

  const [isOpen, setIsOpen] = useState({ mountain: false, sea: false, hotel: false, Store: false });
  const openHandler = target =>
    isOpen[target]
      ? setIsOpen({ ...isOpen, [target]: false })
      : setIsOpen({ ...isOpen, [target]: true });

  // 키워드 검색
  const SearchHandler = () => {};

  return (
    <SideBar>
      <Img src={logo} alt={"plan-it-travel"} />
      <Link to={"/"}>
        <FontAwesomeIcon {...iconAttr("faHouse")} />
        home
      </Link>
      <Ul onClick={() => openHandler("mountain")}>
        <FontAwesomeIcon {...iconAttr("faMountain")} />산
        {isOpen.mountain && (
          <>
            <Li onClick={() => SearchHandler()}>
              <FontAwesomeIcon {...iconAttr("faCaravan")} />
              캠핑장
            </Li>
            <Li onClick={() => SearchHandler()}>
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
            <Li onClick={() => SearchHandler()}>
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
            <Li onClick={() => SearchHandler()}>
              <FontAwesomeIcon {...iconAttr("faHotel")} />
              호텔
            </Li>
            <Li onClick={() => SearchHandler()}>
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
            <Li onClick={() => SearchHandler()}>
              <FontAwesomeIcon {...iconAttr("faSpoon")} />
              음식점
            </Li>
            <Li onClick={() => SearchHandler()}>
              <FontAwesomeIcon {...iconAttr("faMugSaucer")} />
              카페
            </Li>
            <Li onClick={() => SearchHandler()}>
              <FontAwesomeIcon {...iconAttr("faBasketShopping")} />
              <FontAwesomeIcon size="lg" {...iconAttr("faBarcode")} />
              편의점
            </Li>
            <Li onClick={() => SearchHandler()}>
              <FontAwesomeIcon {...iconAttr("faCartShopping")} />
              마트
            </Li>
            <Li onClick={() => SearchHandler()}>
              <FontAwesomeIcon {...iconAttr("faSquareParking")} />
              주차장
            </Li>
          </>
        )}
      </Ul>

      <AuthBox>
        <FontAwesomeIcon {...iconAttr("faArrowRightFromBracket")} />
        Logout
      </AuthBox>
    </SideBar>
  );
};

export default Sidebar;

const SideBar = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 15vw;
  min-width: 200px;
  height: 100vh;

  padding: 20px;

  background-color: ${props => props.theme.colors.black};

  color: ${props => props.theme.colors.white};

  transition: 300ms;
`;

const Img = styled.img`
  display: inherit;
  align-self: center;

  width: 150px;

  margin: 20px;
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
  align-items: center;
  cursor: pointer;
`;
