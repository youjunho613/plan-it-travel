import React, { useState } from "react";
import { styled } from "styled-components";
import { Button } from "components/common";
import { SURVEY_TEXT } from "../surveyData/surveyData";

function SurveyTemplate() {
  const [step, setStep] = useState(0);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [answer, setAnswer] = useState([]);

  const nextStepHandle = () => {
    setCheck1(false);
    setCheck2(false);
    setCheck3(false);
    setAnswer();
    setStep(step + 1);
  };

  // const checkOnlyOne = checkThis => {
  //   const checkboxes = document.getElementsByName("test");
  //   for (let i = 0; i < checkboxes.length; i++) {
  //     if (checkboxes[i] !== checkThis) {
  //       checkboxes[i].checked = false;
  //     }
  //   }
  // };

  const isCheckHandle = e => {
    switch (e.target.id) {
      case "answer1":
        setCheck1(!check1);
        setCheck2(false);
        setCheck3(false);
        break;
      case "answer2":
        setCheck2(!check2);
        setCheck1(false);
        setCheck3(false);
        break;
      case "answer3":
        setCheck3(!check3);
        setCheck2(false);
        setCheck1(false);
        break;
    }
  };

  const submitHandle = () => {};

  return (
    <Container>
      <SurveyContainer>
        <Questions>{SURVEY_TEXT[step].question}</Questions>
        <form>
          <Answer for="answer1">
            <input
              checked={check1}
              id="answer1"
              name="test"
              type="radio"
              onClick={e => isCheckHandle(e)}
              // onChange={e => checkOnlyOne(e.target)}
            ></input>
            {SURVEY_TEXT[step].option[0].text}
          </Answer>
          <Answer for="answer2">
            <input
              checked={check2}
              id="answer2"
              name="test"
              type="radio"
              onClick={e => isCheckHandle(e)}
              // onChange={e => checkOnlyOne(e.target)}
            ></input>
            {SURVEY_TEXT[step].option[1].text}
          </Answer>
          <Answer for="answer3">
            <input
              checked={check3}
              id="answer3"
              name="test"
              type="radio"
              onClick={e => isCheckHandle(e)}
              // onChange={e => checkOnlyOne(e.target)}
            ></input>
            {SURVEY_TEXT[step].option[2].text}
          </Answer>
        </form>
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
