import { keyframes, styled } from "styled-components";
import { Link } from "react-router-dom";
import earthIcon from "assets/earth_icon.png";
import lunaIcon from "assets/luna_icon.png";

export const Home = () => {
  return (
    <ButtonBox>
      <Link to={"/main"}>
        <PlanetImg src={earthIcon} alt="지구아이콘" />
      </Link>
      <Link to={"/survey"}>
        <PlanetImg src={lunaIcon} alt="달아이콘" />
      </Link>
    </ButtonBox>
  );
};

const ButtonBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 250px;

  transform: translate(-50%, -50%);
`;

const moveUpDown = keyframes`
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
const PlanetImg = styled.img`
  animation: ${moveUpDown} 2.5s linear infinite;
`;
