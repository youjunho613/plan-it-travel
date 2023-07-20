import { useState } from "react";
import { styled } from "styled-components";
import { Button, Text, Input } from "components/common";
import { SURVEY_TEXT, SURVEY_RESULT } from "../surveyData/surveyData";
import { useNavigate } from "react-router";

const initialValue = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false
};

function SurveyTemplate() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [inputValues, setInputValues] = useState();
  const [selectValues, setSelectValues] = useState([]);
  const [check, setCheck] = useState(initialValue);

  const moveStep = (event, num) => {
    event.preventDefault();
    // TODO alert 수정 필요
    if (!inputValues) return alert("누르고 다음으로 가셔야죠");
    setSelectValues([...selectValues, inputValues]);
    setStep(step + num);
    setCheck(initialValue);
  };

  const onChange = (event, id) => {
    setCheck({ id: true });
    setInputValues(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();

    const randomNumber = () => {
      if (Math.random() < 0.5) {
        return 1;
      } else {
        return 2;
      }
    };
    selectValues.push(randomNumber());
    const selectId = selectValues.join("");
    const filterd = SURVEY_RESULT.filter(item => item.id === Number(selectId));
    navigate(`/detail/${filterd[0].kakaoId}`);
  };

  const buttonAttr = $bgcolor => ({ $bgcolor, size: "small", fontSize: "10px" });

  return (
    <Container>
      <SurveyContainer>
        <Progress value={step} max="3"></Progress>
        <Text fontSize={"25px"}>{SURVEY_TEXT[step].question}</Text>
        <Form onSubmit={onSubmit}>
          {SURVEY_TEXT[step].option?.map(item => {
            return (
              <Label key={item.id} htmlFor={`answer${item.id}`}>
                <Input
                  checked={check[item.id]}
                  type="radio"
                  id={`answer${item.id}`}
                  name={`question${step}`}
                  onChange={event => onChange(event, item.id)}
                  value={item.id}
                />
                {item.text}
              </Label>
            );
          })}

          <ButtonBox>
            {step <= 2 && (
              <Button
                type={"reset"}
                {...buttonAttr("theme3")}
                onClick={event => moveStep(event, +1)}
              >
                Next
              </Button>
            )}
            {step >= 3 && (
              <Button {...buttonAttr("theme3")} onSubmit={onSubmit}>
                Submit
              </Button>
            )}
          </ButtonBox>
        </Form>
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

const ButtonBox = styled.div``;
