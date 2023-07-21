import styled from "styled-components";

export const MapContainer = styled.div`
  width: 85vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  & > form {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    position: fixed;
    top: 20px;
  }
`;

export const OverlayDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 150px;
  gap: 10px;
  height: 100px;
  padding: 10px;
  border: 1px solid #1f1f22;
  background-color: #1f1f22;
  border-radius: 5px;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    margin-left: -10px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 10px 0 10px;
    border-color: #1f1f22 transparent transparent transparent;
  }
`;

export const XButton = styled.button`
  margin-left: auto;
`;

export const LocationBtn = styled.button`
  width: 30px;
  height: 30px;
  background-color: #1f1f22;
  border-radius: 100%;
  margin: 5px;
  padding: 5px;
`;
