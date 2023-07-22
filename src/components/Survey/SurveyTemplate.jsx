import { useState } from "react";
import { styled } from "styled-components";
import { Button, Text, Input } from "components/common";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { getServeyData } from "redux/modules/detailData";
import { SURVEY_TEXT, SURVEY_RESULT } from "surveyData/surveyData";

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
const buttonAttr = $bgcolor => ({ $bgcolor, size: "small", fontSize: "10px" });

function SurveyTemplate() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [inputValues, setInputValues] = useState();
  const [selectValues, setSelectValues] = useState([]);
  const [check, setCheck] = useState(initialValue);
  const dispatch = useDispatch();

  const moveStep = (event, num) => {
    event.preventDefault();
    if (!inputValues) return alert("보기를 선택해주세요");

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
    const filterd = SURVEY_RESULT.filter(item => item.resultId === Number(selectId));
    dispatch(getServeyData(filterd));
    navigate(`/detail/${filterd[0].id}`);
  };

  return (
    <Container>
      <SurveyContainer>
        <ProgressLevel>{step}/3</ProgressLevel>
        <Progress value={step} max="3"></Progress>
        <Text fontSize={"25px"} margin={"0 15px"}>{SURVEY_TEXT[step].question}</Text>
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

const ProgressLevel = styled.span`
  position: absolute;
  bottom: 15px;
  right: 276px;
`;

const Progress = styled.progress`
  position: absolute;
  bottom: 0px;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
  margin: 50px 15px;
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
  justify-content: center;
  align-items: center;
  position: relative;
  width: 586px;
  height: 600px;
  margin-top: 100px;
  padding: 30px;
  background-color: #000000a2;
`;

const ButtonBox = styled.div`
  position: absolute;
  bottom: 100px;
  right: 250px;
`;
