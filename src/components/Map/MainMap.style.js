import { FlexColumnDiv } from "style/common/Flex";
import styled from "styled-components";

export const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 85vw;
  height: 100vh;
`;

export const Form = styled.form`
  position: fixed;
  top: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const OverlayDiv = styled(FlexColumnDiv)`
  gap: 10px;

  min-width: 150px;
  height: 100px;

  padding: 10px;

  background-color: ${props => props.theme.colors.black};
  border: 1px solid ${props => props.theme.colors.black};
  border-radius: 5px;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;

    width: 0;
    height: 0;

    margin-left: -10px;

    border-style: solid;
    border-width: 8px 10px 0 10px;
    border-color: #1f1f22 transparent transparent transparent;
  }
`;

export const XButton = styled.button`
  margin-left: auto;
`;

export const LocationBtn = styled.button`
  width: 30px;
  height: 30px;

  margin: 5px;
  padding: 5px;

  background-color: #1f1f22;
  border-radius: 100%;
`;
