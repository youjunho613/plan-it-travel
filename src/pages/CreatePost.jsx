import { Button, Input, Text } from "components/common";
import { styled } from "styled-components";

export const CreatePost = () => {
  return (
    <Container>
      <ColumnBox>
        <Input placeholder={"주소 검색"} size={"modal"} $bgcolor={"white"} />
        <Text>마커 찍을 지도 필요</Text>
        {/* FIXME 지도를 따로 공용 컴포넌트로 뺄 필요성있음 */}
        <Map></Map>
        <Text>마커가 찍은 지도 실시간 주소 반영 되는 곳</Text>
      </ColumnBox>
      <Form>
        <Text> 글 작성 </Text>
        <Input placeholder={"안녕"} size={"modal"} $bgcolor={"white"} />
        <Input placeholder={"안녕"} size={"modal"} $bgcolor={"white"} as={"textarea"} />
        <ButtonBox>
          <Button type="button" size={"medium"} $bgcolor={"black"}>
            취소
          </Button>
          <Button type="button" size={"medium"} $bgcolor={"black"}>
            작성
          </Button>
        </ButtonBox>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 30px;
`;

const ColumnBox = styled.div`
  display: inherit;
  flex-direction: column;
  align-items: center;

  gap: 10px;
`;

const Map = styled.div`
  width: 500px;
  height: 500px;
  background-color: white;
`;

const Form = styled.form`
  display: inherit;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 500px;

  gap: 20px;
`;
const ButtonBox = styled.div``;
