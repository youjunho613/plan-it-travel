import { styled } from "styled-components";

export const BookmarkSvg = styled.svg`
  cursor: pointer;
  fill: ${props => (props.fill ? props.theme.colors.theme1 : props.theme.colors.white)};
  position: relative;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  transition: scale 0.3s;
  &:hover {
    scale: 1.2;
  }
  &:active {
    scale: 0.8;
  }
`;
