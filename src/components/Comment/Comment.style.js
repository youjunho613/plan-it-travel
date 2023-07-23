import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";


export const CommentsForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${props => props.theme.colors.modalBlack};
  height: 80px;
  width: 46%;
  min-width: 850px;
  margin: 20px auto;
`;

export const CommentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 46%;
  min-width: 700px;
  margin: 15px 0;
  padding: 10px;
  background-color: ${props => props.theme.colors.modalBlack};
  border-radius: 20px;
`;

export const DivBox = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px;
`;

export const NicknameBox = styled.div`
  width: 100%;
  padding-bottom: 5px;
  font-weight: 700;
`;

export const CommentBox = styled.div`
  width: 100%;
  line-break: anywhere;
`;

export const SideBox = styled.div`
  display: flex;
`;

export const IconBox = styled.div`
  display: inherit;
`;

export const CustomFontAwesomeIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin: 0 10px;
  font-size: 25px;
`;

export const DateBox = styled.div`
  margin-left: 20px;
  width: 80px;
`;

export const SideBar = styled(CommentsWrap)`
  position: fixed;
  right: 20px;
  bottom: 20px;
`;