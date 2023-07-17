import styled from "styled-components";

export const Outer = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);
`;

export const Inner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 50px;

  background-color: ${props => props.theme.colors[props.$bgcolor]};
  border-radius: 70px;
`;
