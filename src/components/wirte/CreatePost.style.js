import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 30px;
`;

export const ColumnBox = styled.div`
  display: inherit;
  flex-direction: column;
  align-items: center;

  gap: 10px;
`;

// FIXME 임시 지도
export const Map = styled.div`
  width: 500px;
  height: 500px;
  background-color: white;
`;

export const Form = styled.form`
  display: inherit;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 500px;

  gap: 20px;
`;
export const ButtonBox = styled.div``;
