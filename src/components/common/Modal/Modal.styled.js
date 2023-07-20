import styled, { css } from "styled-components";

export const Outer = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  width: 100%;
  height: 100%;

  ${({ type }) => {
    if (type === "main") {
      return css`
        background-color: transparent;
        pointer-events: none;
      `;
    } else {
      return css`
        background-color: rgba(0, 0, 0, 0.3);
      `;
    }
  }}
`;

export const Inner = styled.div`
  ${({ type }) => {
    if (type === "main") {
      return css`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 25px;
        background-color: rgb(31, 31, 34, 1);
        margin-right: auto;
        width: 14vw;
        min-width: 200px;
        height: 100%;
        pointer-events: auto;
      `;
    } else {
      return css`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 50px;
        background-color: ${props => props.theme.colors[props.$bgcolor]};
      `;
    }
  }}
`;
