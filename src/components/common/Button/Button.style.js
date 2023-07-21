import { css, styled } from "styled-components";
import { SIZE } from "./Button.constants";

export const Button = styled.button`
  ${props => css`
    width: ${SIZE[props.size]?.width};
    height: ${SIZE[props.size]?.height};
    background-color: ${props.theme.colors[props.$bgcolor]};
    background-color: ${SIZE[props.size]?.backgroundColor};
    border-radius: ${SIZE[props.size]?.borderRadius};

    margin: 5px;
    padding: 5px;

    color: ${props.theme.colors[props.color]};
    font-size: ${SIZE[props.size]?.fontSize};
    font-weight: ${props?.fontWeight};
    
    /* transition: 500ms; */
    transition: scale 0.3s;
    &:hover {
      scale: 1.1;
    }
  `}
`;
