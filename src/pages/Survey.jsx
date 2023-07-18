import { styled } from "styled-components";
import { Button } from "components/common";

export const Survey = () => {
  return (
    <Container>
      <SurveyContainer>
        <Questions>당신은 어떤 종류의 휴가를 선호하나요?</Questions>
        <form>
          <Answer for="answer">
            <input id="answer" type="checkbox"></input>도시에서의 문화적인 휴가
          </Answer>
          <Answer for="answer">
            <input id="answer" type="checkbox"></input>자연 속에서의 모험적인 휴가
          </Answer>
          <Answer for="answer">
            <input id="answer" type="checkbox"></input>해변이나 풀에서의 휴식과 휴양
          </Answer>
          <div>
            <Button $bgcolor={"theme3"} size={"small"} fontSize={"10px"}>
              Cancel
            </Button>
            <Button $bgcolor={"theme3"} size={"small"} fontSize={"10px"}>
              Confirm
            </Button>
          </div>
        </form>
      </SurveyContainer>
    </Container>
  );
};
const Answer = styled.label`
  background-color: white;
  display: block;
  color: black;
  width: 300px;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  width: 586px;
  height: 600px;
  margin-top: 100px;
  padding: 30px;
`;

const Questions = styled.p`
  font-size: 25px;
  padding-bottom: 30px;
`;
