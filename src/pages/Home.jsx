import { Button } from "components/common";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <ButtonBox>
      <Link to={"/survey"}>
        <Button $bgcolor={"theme1"} size={"large"} fontSize={"10px"}>
          추천보기
        </Button>
      </Link>
      <Link to={"/main"}>
        <Button $bgcolor={"theme1"} size={"large"} fontSize={"10px"}>
          모두보기
        </Button>
      </Link>
    </ButtonBox>
  );
};

const ButtonBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 50px;

  transform: translate(-50%, -50%);
`;
