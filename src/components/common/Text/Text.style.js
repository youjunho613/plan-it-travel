import { css, styled } from "styled-components";

export const Text = styled.p`
  ${props => css`
    font-size: ${props.fontSize};
    color: ${props.theme.colors[props.color]}; 
  `}
`;
