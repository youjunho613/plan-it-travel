import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

export const AuthBox = styled.ul`
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

export const Ul = styled.ul`
  display: flex;
  flex-direction: column;

  cursor: pointer;
`;

export const Li = styled.li`
  display: flex;

  margin: 7px 10px;
  cursor: pointer;
`;

export const IconDiv = styled.div`
  display: flex;
`;

export const Icon = styled(FontAwesomeIcon)`
  width: 20px;
`;
