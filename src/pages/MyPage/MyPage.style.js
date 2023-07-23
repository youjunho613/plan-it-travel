import { styled } from "styled-components";

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

export const OptionBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

export const SettingContentButton = styled.button`
  width: 300px;
  height: 50px;
  border-radius: 12px;
  color: white;
  &:hover {
    background-color: #8a8a8a81;
  }
`;
