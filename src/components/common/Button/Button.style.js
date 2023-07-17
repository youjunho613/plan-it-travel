import { styled } from "styled-components";
import * as constants from "./Button.const";

export const Button = styled.button`
  ${props => `
    width: ${constants.BUTTON_WIDTH_MAP[props.size]}}px;
    height: ${constants.BUTTON_HEIGHT_MAP[props.size]}px;
  background-color: ${constants.BUTTON_COLOR_MAP[props.size]};
  border-radius: ${constants.BUTTON_BORDER_MAP[props.size]}px;
  `}
`;
