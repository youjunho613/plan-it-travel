import styled from "styled-components";

export const Container = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  background-color: transparent;
  z-index: 999;
`;

export const Nav = styled.nav`
  display: inherit;
  flex-direction: row;
  align-items: center;
`;

export const Ul = styled.ul`
  display: inherit;
`;

export const Li = styled.li`
  margin: 0 10px;
`;

export const ButtonBox = styled.div`
  display: inherit;
  align-items: center;
  margin: 0 20px;
  gap: 20px;
`;

export const Img = styled.img`
  width: 60px;
  margin: 0 20px;
`;

export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;