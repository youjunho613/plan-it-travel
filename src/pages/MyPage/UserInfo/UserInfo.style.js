import { styled, keyframes } from "styled-components";

export const UserInfoWrap = styled.div`
  display: flex;
  flex-direction: column;

  padding: 30px;

  background-color: ${props => props.theme.colors.modalBlack};
  border-radius: 5px;
`;

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  margin: 30px;

  font-size: 20px;
`;

export const SettingFlexBox = styled(FlexBox)`
  justify-content: space-between;
`;

const rotation = keyframes`100%{transform:rotate(360deg)}`;

export const SettingSvg = styled.svg`
  height: 30px;

  fill: #e2e2e2;

  cursor: pointer;

  &:hover {
    animation: ${rotation} 1.8s linear infinite;
  }
`;

export const CurrentUserInfo = styled.div`
  padding: 10px;

  background-color: #ffffff45;
  border-radius: 5px;

  color: white;
`;
