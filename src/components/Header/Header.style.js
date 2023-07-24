import styled from "styled-components";

export const Container = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 70px;

  background-color: transparent;
`;

export const Nav = styled.nav`
  display: inherit;
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
  gap: 20px;

  margin: 0 20px;
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
