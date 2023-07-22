import { styled } from "styled-components";

export const SideBar = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 280px;
  height: 100vh;
  padding: 20px;
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  transition: 300ms;
`;

export const Img = styled.img`
  display: inherit;
  align-self: center;
`;

export const AuthBox = styled.div`
  position: absolute;
  bottom: 40px;

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
`;

export const FlexBox = styled.div`
  display: flex;
  cursor: pointer;
`;

export const IconBox = styled.div`
  width: 20px;
  margin-right: 10px;
`

export const Ul = styled.ul`
  cursor: pointer;
`;

export const Li = styled.li`
  margin: 10px 10px;
  cursor: pointer;
`;
