import { styled } from "styled-components";

export const BookContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  width: 1280px;
  justify-content: center;
`;

export const BookBiv = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  width: 400px;
  padding: 40px 40px 70px 40px;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: rgba(73, 73, 73, 0.049);
  backdrop-filter: blur(10px);
`;

export const BookTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DetailSvg = styled.svg`
  cursor: pointer;
  fill: ${props => props.theme.colors.white};
  position: relative;
  bottom: 30px;
  left: 170px;
  height: 25px;
  transition: scale 0.3s;
  &:hover {
    scale: 1.2;
  }
  &:active {
    scale: 0.8;
  }
`;

export const LargeFont = styled.div`
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  width: 300px;
`;

export const PinMarker = styled.span`
  margin: 5px;
`;

export const Address = styled.p`
  width: 300px;
  text-align: center;
`;

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
