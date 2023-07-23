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
    switch (type) {
      case "main":
        return css`
          background-color: transparent;
          pointer-events: none;
        `;
      case "youtube":
        return css`
          background-color: rgba(0, 0, 0, 0.5);
        `;
      case "setting":
        return css`
          background-color: rgba(0, 0, 0, 0.5);
        `;
      case "modify":
        return css`
          background-color: rgba(0, 0, 0, 0.5);
        `;
      default:
        return css`
          background-color: rgba(0, 0, 0, 0.3);
        `;
    }
  }}
`;

export const Inner = styled.div`
  ${({ type }) => {
    switch (type) {
      case "main":
        return css`
          display: flex;
          justify-content: center;
          align-items: center;

          width: 280px;
          height: 100%;

          padding: 20px;
          margin-right: auto;

          background-color: rgb(31, 31, 34, 1);

          pointer-events: auto;
        `;
      case "youtube":
        return css`
          display: flex;
          justify-content: center;
          align-items: center;

          padding: 50px;
        `;
      case "setting":
        return css`
          display: flex;
          flex-direction: column;

          background-color: rgba(83, 83, 83, 0.445);
          border-radius: 10px;
        `;
      case "modify":
        return css`
          display: flex;
          justify-content: center;
          align-items: center;

          padding: 50px;

          background-color: #000;
          border-radius: 10px;
        `;
      default:
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
`;
