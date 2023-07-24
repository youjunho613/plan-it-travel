import { FlexColumnDiv } from "style/common/Flex";
import { styled } from "styled-components";

export const PageContainer = styled(FlexColumnDiv)`
  gap: 50px;
`;

export const UserContainer = styled(FlexColumnDiv)`
  margin-bottom: 30px;
`;

export const UserImg = styled.img`
  width: 150px;
  height: 150px;

  margin-bottom: 20px;

  border-radius: 50%;
`;

export const OptionBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

export const SettingContentButton = styled.button`
  width: 300px;
  height: 50px;

  border-radius: 12px;

  color: ${props => props.theme.colors.white};

  &:hover {
    background-color: #8a8a8a81;
  }
`;

export const BookContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;

  width: 1280px;

  flex-wrap: wrap;
`;

export const BookBiv = styled.div`
  display: flex;
  flex-direction: column;

  width: 400px;

  padding: 40px 40px 70px 40px;
  margin-bottom: 20px;

  background-color: rgba(73, 73, 73, 0.049);
  backdrop-filter: blur(10px);
  border: 1px solid white;
  border-radius: 5px;
`;

export const BookTitle = styled(FlexColumnDiv)``;

export const DetailSvg = styled.svg`
  position: relative;
  bottom: 30px;
  left: 170px;

  height: 25px;

  fill: ${props => props.theme.colors.white};

  transition: scale 0.3s;

  cursor: pointer;

  &:hover {
    scale: 1.2;
  }
  &:active {
    scale: 0.8;
  }
`;

export const LargeFont = styled.div`
  width: 300px;

  font-weight: 700;
  font-size: 20px;
  text-align: center;
`;

export const PinMarker = styled.span`
  margin: 5px;
`;

export const Address = styled.p`
  width: 300px;

  text-align: center;
`;

export const BookmarkSvg = styled.svg`
  position: relative;
  top: ${props => props.top}px;
  left: ${props => props.left}px;

  fill: ${props => (props.fill ? props.theme.colors.theme1 : props.theme.colors.white)};

  transition: scale 0.3s;

  cursor: pointer;

  &:hover {
    scale: 1.2;
  }
  &:active {
    scale: 0.8;
  }
`;

export const TrashIcon = styled.svg`
  position: relative;
  left: 170px;

  height: 30px;

  fill: ${props => props.theme.colors.white};

  transition: scale 0.3s;

  cursor: pointer;

  &:hover {
    fill: ${props => props.theme.colors.theme1};
    scale: 1.2;
  }
  &:active {
    scale: 0.8;
  }
`;
