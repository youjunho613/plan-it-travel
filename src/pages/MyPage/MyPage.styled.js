const { styled, keyframes } = require("styled-components");

export const SettingContentButton = styled.button`
  width: 300px;
  height: 50px;
  border-radius: 12px;
  color: white;
  &:hover {
    background-color: #8a8a8a81;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 35px;
`;

export const ButtonBox = styled.div`
  display: inherit;
  align-items: center;
  margin: 0 20px;
  gap: 20px;
`;

export const rotation = keyframes`
    100%{
      transform:rotate(360deg);
    }
    `;

export const SettingSvg = styled.svg`
  height: 30px;
  fill: #e2e2e2;
  cursor: pointer;
  &:hover {
    animation: ${rotation} 1.8s linear infinite;
  }
`;

export const CurrentUserInfo = styled.div`
  background-color: #ffffff45;
  color: white;
  padding: 10px;
  border-radius: 5px;
`;
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

export const OptionBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;
`;

export const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
`;
export const UserImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
`;
