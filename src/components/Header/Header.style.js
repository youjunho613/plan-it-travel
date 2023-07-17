import styled from "styled-components";

const NavContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 999;

  & > div {
    display: flex;
    align-items: center;
  }

  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
  }
`;

const Logospan = styled.span`
  & > h1 {
    margin: 0 10px;
    color: #7fd1ae;
    cursor: pointer;
    font-weight: 800;
  }
  & > p {
    color: #6a9582;
    margin-left: 8px;
    font-size: 15px;
    font-family: sans-serif;
    cursor: pointer;
  }
`;

const Searchspan = styled.span`
  padding-right: 10px;
`;

const SearchForm = styled.form`
  margin-right: 20px;
  border: 1px solid #7fd1ae;
  background-color: transparent;
  border-radius: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;

  & > input {
    width: 0px;
    padding: 0;
    border: none;
    outline: none;
    transition: all 0.4s;
    background-color: transparent;
  }

  & > button {
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background-color: transparent;
    cursor: pointer;
  }

  &:hover > input {
    width: 240px;
    margin-left: 10px;
  }
  &:hover > button {
    background-color: transparent;
  }
`;

const Btn = styled.button`
  padding: 7px 13px;
  margin: 6px;
  border-radius: 17px;
  border: 1px solid #7fd1ae;
  background-color: transparent;
  font-family: sans-serif;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: #7fd1ae;
    color: white;
  }
`;
export { NavContainer, Logospan, Searchspan, SearchForm, Btn };
