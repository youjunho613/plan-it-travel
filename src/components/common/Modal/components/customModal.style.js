import { styled } from "styled-components";

export const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ImgBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const XButton = styled.button`
  position: absolute;
  top: 1%;
  left: 280px;
  background-color: #1f1f22;
  width: 30px;
  height: 50px;
  padding-right: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const Img = styled.img`
  display: inherit;
  align-self: center;
`;

export const ModalUl = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: baseline;
  gap: 10px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 5px;
    height: 100%;
  }
  &::-webkit-scrollbar-thumb {
    border: 2px solid #a290e6;
    background-color: #a290e6;
  }
`;

export const Result = styled.h1`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #1f1f22;
  color: white;
  padding-bottom: 5px;
`;

export const ModalLi = styled.li`
  padding: 5px 3px;
  width: 100%;
  color: white;
  &:hover {
    background-color: #a290e6;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export const MoveBtnBox = styled.div`
  display: flex;
  gap: 10px;

  margin-top: auto;
`;
