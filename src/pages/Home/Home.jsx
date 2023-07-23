import { keyframes, styled } from "styled-components";
import { Link } from "react-router-dom";
import earthIcon from "assets/earth_icon.png";
import lunaIcon from "assets/luna_icon.png";
import bubbleIcon from "assets/title_bubble.png";
import { useState } from "react";

export const Home = () => {
  const [showEarthBubble, setShowEarthBubble] = useState(false);
  const [showLunaBubble, setShowLunaBubble] = useState(false);
  const earthDisplay = showEarthBubble ? "block" : "none";

  return (
    <>
      <ButtonBoxE>
        <DivBoxE>
          <Link to={"/main"}>
            <img
              src={earthIcon}
              alt="지구아이콘"
              onMouseEnter={() => setShowEarthBubble(true)}
              onMouseLeave={() => setShowEarthBubble(false)}
            />
          </Link>
          <EarthBubbleImg src={bubbleIcon} display={earthDisplay}>
            모두 보기
          </EarthBubbleImg>
        </DivBoxE>
      </ButtonBoxE>
      <ButtonBoxL>
        <DivBoxL>
          <Link to={"/survey"}>
            <img
              src={lunaIcon}
              alt="달아이콘"
              onMouseEnter={() => setShowLunaBubble(true)}
              onMouseLeave={() => setShowLunaBubble(false)}
            />
          </Link>
          {showLunaBubble && <LunaBubbleImg src={bubbleIcon}>추천 보기</LunaBubbleImg>}
        </DivBoxL>
      </ButtonBoxL>
    </>
  );
};

const earthMoveUpDown = keyframes`
  0% {
    transform: translateY(0); /* 시작 지점 */
  }
  50% {
    transform: translateY(15px); /* 절반 지점에서 위로 이동 */
  }
  100% {
    transform: translateY(0); /* 시작 지점으로 돌아옴 */
  }
`;

const ButtonBoxE = styled.div`
  position: absolute;
  top: 43%;
  left: 65%;
  transform: translate(-50%, -50%);
`;

const DivBoxE = styled.div`
  position: relative;
  animation: ${earthMoveUpDown} 2.5s linear infinite;
`;

const EarthBubbleImg = styled.div`
  display: ${props => props.display};

  position: absolute;
  bottom: 200px;
  left: 100px;

  width: 200px;
  height: 145px;

  padding-top: 50px;

  background-image: url(${props => props.src});
  background-size: cover;

  color: black;
  text-align: center;
  font-size: x-large;
  font-weight: bolder;
`;

const lunaMoveUpDown = keyframes`
  100% {
    transform: translateY(15px);
  }
  50% {
    transform: translateY(0);
  }
  0% {
    transform: translateY(15px);
  }
  `;

const ButtonBoxL = styled.div`
  position: absolute;
  top: 43%;
  left: 35%;
  transform: translate(-50%, -50%);
`;

const DivBoxL = styled.div`
  position: relative;
  animation: ${lunaMoveUpDown} 2.5s linear infinite;
`;

const LunaBubbleImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 200px;
  right: -100px;

  width: 200px;
  height: 145px;

  padding-bottom: 15px;

  background-image: url(${props => props.src});
  background-size: cover;

  color: black;
  font-size: x-large;
  font-weight: bolder;
`;
