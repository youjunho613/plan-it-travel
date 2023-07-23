import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
  width: 586px;
  height: 600px;

  margin-top: 100px;
  padding: 30px;

  background-color: ${props => props.theme.colors.modalBlack};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  width: 100%;

  margin: 50px 15px;
`;

export const Label = styled.label`
  display: block;

  width: 100%;

  padding: 10px;

  background-color: ${props => props.theme.colors.white};
  border-radius: 5px;

  color: black;
`;

export const ButtonBox = styled.div`
  margin-top: 50px;
`;

export const ProgressLevel = styled.span`
  position: absolute;
  bottom: 15px;
  right: 276px;
`;

export const Progress = styled.progress`
  position: absolute;
  bottom: 0px;
  width: 100%;
`;
