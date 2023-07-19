import React, { useState } from "react";
import { styled } from "styled-components";
import { Button } from "components/common";
import { SURVEY_TEXT } from "../surveyData/surveyData";

function SurveyTemplate() {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState([]);

  const nextStepHandle = () => {
    setAnswer();
    setStep(step + 1);
  };

  const checkOnlyOne = checkThis => {
    const checkboxes = document.getElementsByName("test");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      }
    }
  };

  const submitHandle = () => {};

  return (
    <Container>
      <SurveyContainer>
        <Questions>{SURVEY_TEXT[step].question}</Questions>
        {SURVEY_TEXT[step].option.map(item => {
          return (
            <>
              <form>
                <Answer for="answer">
                  <input
                    id="answer"
                    name="test"
                    type="checkbox"
                    onChange={e => checkOnlyOne(e.target)}
                  ></input>
                  {item}
                </Answer>
              </form>
            </>
          );
        })}
        <div>
          {step == 0 ? null : (
            <Button
              onClick={() => {
                setStep(step - 1);
              }}
              $bgcolor={"theme3"}
              size={"small"}
              fontSize={"10px"}
            >
              Cancel
            </Button>
          )}
          {step == 4 ? (
            <Button onClick={nextStepHandle} $bgcolor={"theme3"} size={"small"} fontSize={"10px"}>
              Submit
            </Button>
          ) : (
            <Button onClick={nextStepHandle} $bgcolor={"theme3"} size={"small"} fontSize={"10px"}>
              Confirm
            </Button>
          )}

          <div>
            <progress value={step} max="4"></progress>
          </div>
        </div>
      </SurveyContainer>
    </Container>
  );
}

export default SurveyTemplate;

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
