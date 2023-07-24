import * as Styled from "./Home.style";
import earthIcon from "assets/earth_icon.png";
import lunaIcon from "assets/luna_icon.png";
import bubbleIcon from "assets/title_bubble.png";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Home = () => {
  const [showBubble, setShowBubble] = useState({ earth: false, luna: false });

  return (
    <>
      <Styled.ButtonBoxEarth>
        <Styled.DivBoxEarth>
          <Link to={"/main"}>
            <img
              src={earthIcon}
              alt="지구아이콘"
              onMouseEnter={() => setShowBubble({ earth: true })}
              onMouseLeave={() => setShowBubble({ earth: false })}
            />
          </Link>
          {showBubble.earth && (
            <Styled.EarthBubbleImg src={bubbleIcon}>장소 검색하기</Styled.EarthBubbleImg>
          )}
        </Styled.DivBoxEarth>
      </Styled.ButtonBoxEarth>
      <Styled.ButtonBoxLuna>
        <Styled.DivBoxLuna>
          <Link to={"/survey"}>
            <img
              src={lunaIcon}
              alt="달아이콘"
              onMouseEnter={() => setShowBubble({ luna: true })}
              onMouseLeave={() => setShowBubble({ luna: false })}
            />
          </Link>
          {showBubble.luna && (
            <Styled.LunaBubbleImg src={bubbleIcon}>장소 추천받기</Styled.LunaBubbleImg>
          )}
        </Styled.DivBoxLuna>
      </Styled.ButtonBoxLuna>
    </>
  );
};
