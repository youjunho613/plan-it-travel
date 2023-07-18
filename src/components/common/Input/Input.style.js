import { css, styled } from "styled-components";
import { SIZE, THEME } from "./Input.constants";

// TODO background 프롭스받기
export const Input = styled.input`
  ${props => css`
    width: ${SIZE[props.size]?.width};

    padding: 7px 10px;

    background-color: ${THEME[props.$bgcolor]?.backgroundColor};
    border: none;
    border-radius: ${SIZE[props.size]?.borderRadius};
    outline: none;

    color: ${THEME[props.$bgcolor]?.color};
    font-size: 1.5rem;

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
