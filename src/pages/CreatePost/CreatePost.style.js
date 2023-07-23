import { styled } from "styled-components";

export const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 100px;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;

  width: 1100px;

  padding: 50px;

  background-color: ${props => props.theme.colors.modalBlack};
  border-radius: 10px;
`;

export const ColumnBox = styled.div`
  display: inherit;
  width: 500px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const Map = styled.div`
  width: 500px;
  height: 500px;
  background-color: white;
`;

export const Form = styled.form`
  display: inherit;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  gap: 20px;
`;

export const AddressForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  gap: 20px;
`;

export const AddressInput = styled.input`
  width: 100%;

  padding: 7px 10px;

  border: none;
  border-radius: 5px;
  outline: none;

  color: ${props => props.theme.colors.black};

  font-size: 16px;
`;
