import styled from "styled-components";

const NavContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: transparent;
  position: sticky;
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
    color: white;
    cursor: pointer;
    font-weight: 800;
  }
  & > p {
    color: white;
    margin-left: 8px;
    font-size: 15px;
    font-family: sans-serif;
    cursor: pointer;
  }
`;

const Searchspan = styled.span`
  padding-right: 10px;
`;

export { NavContainer, Logospan, Searchspan };
