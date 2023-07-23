import styled from "styled-components";

export const LargeFont = styled.div`
  font-size: 25px;
  font-weight: 700;
  width: 450px;
  text-align: center;
`;

export const MapWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 30px 60px 30px;
  background-color: ${props => props.theme.colors.modalBlack};
  gap: 10px;
  width: 600px;
  border-radius: 15px;
`;

export const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
