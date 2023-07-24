import { useState } from "react";
import * as Styled from "./Survey.style";
import { Button, Text, Input } from "components/common";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { getSurveyData } from "redux/modules/detailData";
import { SURVEY_RESULT, SURVEY_TEXT } from "surveyData/surveyData";

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

export const Survey = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [inputValues, setInputValues] = useState();
  const [selectValues, setSelectValues] = useState([]);
  const [check, setCheck] = useState(initialValue);
  const dispatch = useDispatch();

  const moveStep = event => {
    event.preventDefault();
    if (!inputValues) return alert("보기를 선택해주세요");

    setSelectValues([...selectValues, inputValues]);
    setStep(step + 1);
    setCheck(initialValue);
  };

  const onChange = event => {
    setCheck({ id: true });
    setInputValues(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();

    selectValues.push(Math.random() < 0.5 ? 1 : 2);
    const selectId = selectValues.join("");
    const filtered = SURVEY_RESULT.filter(item => item.resultId === Number(selectId));
    dispatch(getSurveyData(filtered));
    navigate(`/detail/${filtered[0].id}`);
  };

  return (
    <Styled.Container>
      <Styled.SurveyContainer>
        <Text fontSize={"25px"} margin={"0 15px"}>
          {SURVEY_TEXT[step].question}
        </Text>
        <Styled.Form onSubmit={onSubmit}>
          {SURVEY_TEXT[step].option?.map(item => {
            return (
              <Styled.Label key={item.id} htmlFor={`answer${item.id}`}>
                <Input
                  checked={check[item.id]}
                  type="radio"
                  id={`answer${item.id}`}
                  name={`question${step}`}
                  onChange={event => onChange(event, item.id)}
                  value={item.id}
                />
                {item.text}
              </Styled.Label>
            );
          })}

          <Styled.ButtonBox>
            {step <= 2 && (
              <Button type={"reset"} {...buttonAttr("theme3")} onClick={moveStep}>
                Next
              </Button>
            )}
            {step >= 3 && (
              <Button {...buttonAttr("theme3")} onSubmit={onSubmit}>
                Submit
              </Button>
            )}
          </Styled.ButtonBox>
        </Styled.Form>
        <Styled.ProgressLevel>{step}/3</Styled.ProgressLevel>
        <Styled.Progress value={step} max="3"></Styled.Progress>
      </Styled.SurveyContainer>
    </Styled.Container>
  );
};
