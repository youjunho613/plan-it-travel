import { styled, keyframes } from "styled-components";

const lunaMoveUpDown = keyframes`
  100% {transform: translateY(15px)}
  50% {transform: translateY(0)}
  0% {transform: translateY(15px)}
  `;

const earthMoveUpDown = keyframes`
  0% {transform: translateY(0)}
  50% {transform: translateY(15px)}
  100% {transform: translateY(0)}
`;

const ButtonBox = styled.div`
  position: absolute;
  top: 43%;
  transform: translate(-50%, -50%);
`;

export const ButtonBoxEarth = styled(ButtonBox)`
  left: 65%;
`;

export const ButtonBoxLuna = styled(ButtonBox)`
  left: 35%;
`;

export const DivBoxEarth = styled.div`
  position: relative;
  animation: ${earthMoveUpDown} 2.5s linear infinite;
`;

export const DivBoxLuna = styled.div`
  position: relative;
  animation: ${lunaMoveUpDown} 2.5s linear infinite;
`;

const BubbleImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 200px;
  height: 145px;

  padding-bottom: 15px;

  background-image: url(${props => props.src});
  background-size: cover;

  color: black;
  text-align: center;
  font-family: "Giants-Inline";
  font-size: 27px;
  font-weight: bolder;
`;

export const LunaBubbleImg = styled(BubbleImg)`
  position: absolute;
  bottom: 200px;
  right: -100px;
`;

export const EarthBubbleImg = styled(BubbleImg)`
  position: absolute;
  bottom: 200px;
  left: 100px;
`;
