import { css, styled } from "styled-components";
import { SIZE, THEME } from "./Input.constants";

// TODO background 프롭스받기
export const Input = styled.input`
  ${props => css`
    width: ${SIZE[props.size]?.width};
    height: ${SIZE[props.size]?.height};

    padding: 5px;

    background-color: ${THEME[props.$bgcolor]?.backgroundColor};
    border: none;
    border-radius: ${SIZE[props.size]?.borderRadius};
    outline: none;

    color: ${THEME[props.$bgcolor]?.color};
    font-size: ${SIZE[props.size]?.fontSize};

    &[type="radio"] {
      width: 20px;
    }
  `}
`;

export const Input2 = styled(Input).attrs(props => ({
  type: "radio"
}))`
  width: 20px;
`;
