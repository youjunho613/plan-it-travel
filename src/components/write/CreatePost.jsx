import { Button, Input, Text } from "./common";
import * as Styled from "./CreatePost.style";

const CreatePost = () => {
  return (
    <Styled.Container>
      <Styled.ColumnBox>
        <Input placeholder={"주소 검색"} size={"modal"} $bgcolor={"white"} />
        <Text>마커 찍을 지도 필요</Text>
        {/* FIXME 지도를 따로 공용 컴포넌트로 뺄 필요성있음 */}
        <Styled.Map></Styled.Map>
        <Text>마커가 찍은 지도 실시간 주소 반영 되는 곳</Text>
      </Styled.ColumnBox>
      <Styled.Form>
        <Text> 글 작성 </Text>
        <Input placeholder={"안녕"} size={"modal"} $bgcolor={"white"} />
        <Input placeholder={"안녕"} size={"modal"} $bgcolor={"white"} as={"textarea"} />
        <Styled.ButtonBox>
          <Button type="button" size={"medium"} $bgcolor={"black"}>
            취소
          </Button>
          <Button type="button" size={"medium"} $bgcolor={"black"}>
            작성
          </Button>
        </Styled.ButtonBox>
      </Styled.Form>
    </Styled.Container>
  );
};

export default CreatePost;
