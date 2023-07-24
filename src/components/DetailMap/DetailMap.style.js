import styled from "styled-components";

export const LargeFont = styled.div`
  width: 450px;

  font-size: 25px;
  font-weight: 700;
  text-align: center;
`;

export const MapWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  width: 600px;

  padding: 30px 30px 60px 30px;

  background-color: ${props => props.theme.colors.modalBlack};
  border-radius: 15px;
`;

export const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TrashIcon = styled.svg`
  position: relative;
  top: 43px;
  left: 230px;

  height: 30px;

  fill: ${props => props.theme.colors.white};

  transition: scale 0.3s;

  cursor: pointer;
  &:hover {
    fill: ${props => props.theme.colors.theme1};
    scale: 1.2;
  }
  &:active {
    scale: 0.8;
  }
`;
