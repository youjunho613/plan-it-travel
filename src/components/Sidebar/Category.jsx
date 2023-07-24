import { useState } from "react";
import * as icons from "@fortawesome/free-solid-svg-icons";
import * as Styled from "./Sidebar.style";

export const Category = ({ SearchHandler }) => {
  const [isOpen, setIsOpen] = useState({ mountain: false, sea: false, hotel: false, Store: false });

  const openHandler = target =>
    isOpen[target]
      ? setIsOpen({ ...isOpen, [target]: false })
      : setIsOpen({ ...isOpen, [target]: true });

  const iconAttr = icon => ({
    icon: icons[icon],
    style: { color: "#bf94ff", marginRight: "10px" }
  });

  const ulMap = [
    {
      name: "산",
      func: "mountain",
      icon: "faMountain",
      liMap: [
        { name: "캠핑장", icon: "faCaravan" },
        { name: "계곡", icon: "faCampground" }
      ]
    },
    {
      name: "바다",
      func: "sea",
      icon: "faWater",
      liMap: [{ name: "해수욕장", icon: "faUmbrellaBeach" }]
    },
    {
      name: "숙박",
      func: "hotel",
      icon: "faHotel",
      liMap: [
        { name: "호텔", icon: "faHotel" },
        { name: "모텔", icon: "faHotel" }
      ]
    },
    {
      name: "편의시설",
      func: "Store",
      icon: "faShop",
      liMap: [
        { name: "음식점", icon: "faUtensils" },
        { name: "카페", icon: "faMugSaucer" },
        { name: "편의점", icon: "faBasketShopping" },
        { name: "마트", icon: "faCartShopping" },
        { name: "주차장", icon: "faSquareParking" }
      ]
    }
  ];

  return (
    <>
      {ulMap.map(ul => {
        return (
          <Styled.Ul key={ul.name} onClick={() => openHandler(ul.func)}>
            <Styled.IconDiv>
              <Styled.Icon {...iconAttr(ul.icon)} />
              {ul.name}
            </Styled.IconDiv>
            {isOpen[ul.func] &&
              ul.liMap.map(li => {
                return (
                  <Styled.Li key={li.name} onClick={() => SearchHandler(li.name)}>
                    <Styled.IconDiv>
                      <Styled.Icon {...iconAttr(li.icon)} />
                      {li.name}
                    </Styled.IconDiv>
                  </Styled.Li>
                );
              })}
          </Styled.Ul>
        );
      })}
    </>
  );
};
