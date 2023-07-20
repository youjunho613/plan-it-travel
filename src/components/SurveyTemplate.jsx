import { useState, useRef } from "react";
import { styled } from "styled-components";
import { Button, Text, Input } from "components/common";
import { SURVEY_TEXT } from "../surveyData/surveyData";

function SurveyTemplate() {
  const [step, setStep] = useState(0);
  const [inputValues, setInputValues] = useState(); // 스테이트 배열 / 넥 = 푸쉬 프리브 = 팝
  const [isCheck, setIsCheck] = useState(false);

  const moveStep = num => {
    setStep(step + num);
  };

  // FIXME
  // test 주석
  const onChange = event => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
    // event.target.checked = false;
  };

  const onSubmit = () => {};

  const buttonAttr = $bgcolor => ({ $bgcolor, size: "small", fontSize: "10px" });

  return (
    <Container>
      <SurveyContainer>
        <Progress value={step} max="4"></Progress>
        <Text fontSize={"25px"}>{SURVEY_TEXT[step].question}</Text>
        <Form onSubmit={onSubmit}>
          {SURVEY_TEXT[step].option.map(item => {
            console.log(item.result);
            return (
              <Label key={item.id} htmlfor={`answer${item.id}`}>
                <Input
                  // checked={item.result === inputValues[step]}
                  type="radio"
                  id={`answer${item.id}`}
                  name={`question${step}`}
                  onChange={onChange}
                  value={item.result}
                />
                {item.text}
              </Label>
            );
          })}
        </Form>

        <ButtonBox>
          {step >= 1 && (
            <Button {...buttonAttr("theme2")} color={"black"} onClick={() => moveStep(-1)}>
              Prev
            </Button>
          )}
          {step <= 3 && (
            <Button {...buttonAttr("theme3")} onClick={() => moveStep(+1)}>
              Next
            </Button>
          )}

          {step >= 4 && <Button {...buttonAttr("theme3")}>Submit</Button>}
        </ButtonBox>

        {/* <Text
          fontSize={"20px"}
        >{`저는 첫번째 질문에 대한 ${inputValues.question0}답변입니다`}</Text>
        <br />
        <Text
          fontSize={"20px"}
        >{`저는 두번째 질문에 대한 ${inputValues.question1}답변입니다`}</Text>
        <br />
        <Text
          fontSize={"20px"}
        >{`저는 세번째 질문에 대한 ${inputValues.question2}답변입니다`}</Text>
        <br />
        <Text
          fontSize={"20px"}
        >{`저는 네번째 질문에 대한 ${inputValues.question3}답변입니다`}</Text>
        <br />
        <Text
          fontSize={"20px"}
        >{`저는 다섯번째 질문에 대한 ${inputValues.question4}답변입니다`}</Text>
        <br /> */}
      </SurveyContainer>
    </Container>
  );
}

export default SurveyTemplate;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  gap: 5px;
  margin: 15px;
`;

const Label = styled.label`
  display: block;

  width: 100%;

  padding: 10px;

  background-color: white;
  border-radius: 5px;

  color: black;
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

  position: relative;

  width: 586px;
  height: 600px;

  margin-top: 100px;
  padding: 30px;

  background-color: rgba(255, 255, 255, 0.1);
`;

const Progress = styled.progress`
  position: absolute;
  bottom: 0px;

  width: 100%;
`;

const Questions = styled.p`
  font-size: 25px;
  padding-bottom: 30px;
`;

const ButtonBox = styled.div``;
