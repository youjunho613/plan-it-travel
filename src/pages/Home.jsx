import { Button, Input, Modal, Text } from "components/common";
import { Input2 } from "components/common/Input/Input.style";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "redux/modules/modal";
import Header from "components/Header/Header";
import { styled } from "styled-components";

export const Home = () => {
  // modal
  const { formIsOpen } = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const modalOpenHandler = () => dispatch(openModal("formIsOpen"));
  const modalCloseHandler = () => dispatch(closeModal("formIsOpen"));

  return (
    <div>
      <Header />
      <h1>Home</h1>
      <Button size={"medium"} $bgcolor={"green"} textColor={"white"} onClick={modalOpenHandler}>
        모달 오픈
      </Button>
      {formIsOpen && (
        <Modal closeTarget={"formIsOpen"}>
          <form>
            <p>안녕하세요</p>
            <p>저는 테스트입니다.</p>
            <p>크기는 안의 내용물을 따라갑니다.</p>
            <p>width & height는 default 값인 auto 입니다.</p>
            <p>폰트가 한글은 letter-spacing 조절이 필요해 보입니다.</p>
            <p>gggggg 가 밑줄의 한글에 겹치네요</p>
            <p>닫는 버튼은 따로 없고 바깥을 누르게 되면 닫히게 됩니다.</p>
            <p>물론 버튼을 추가하면 닫기 버튼도 가능합니다</p>
            <Button size={"small"} onClick={modalCloseHandler}>
              닫기
            </Button>
            <p>여러개의 모달을 관리하기 때문에 useSelector와</p>
            <p>useDispatch는 사용해야 됩니다.</p>
            <p>line-height도 조절해야 될 것 같네요.</p>
            <p>읽기 힘들어요.</p>
            <p>화요일 오전에는</p>
            <p>버튼 스몰,미디움,라지</p>
            <p>인풋 스몰,미디움,라지</p>
            <p>텍스트 스몰,미디움,라지</p>
            <p>크기를 정해봐요</p>
            <selection>
              <Input type="radio" name="gender" value="male" />
              남자
              <Input2 name="gender" value="female" />
              여자
              <Input type="radio" name="age" value="twenties" />
              20대
              <input type="radio" name="age" value="thirties" />
              30대
              <input type="reset" value="리셋" />
            </selection>
            <br />
            <selection>
              <input type="checkbox" name="color" value="blue" />
              파랑
              <input type="checkbox" name="color" value="red" />
              빨강
              <input type="reset" />
            </selection>
          </form>
        </Modal>
      )}
      <Text as={"span"}>버튼 스몰</Text>
      <Button size={"small"} fontSize={"10px"}>
        작성하기
      </Button>
      <Text as={"span"}>버튼 미디움</Text>
      <Button $bgcolor={"theme2"} size={"medium"} fontSize={"10px"}>
        작성하기
      </Button>
      <Text as={"span"}>버튼 라지</Text>
      <Button $bgcolor={"theme3"} size={"large"} fontSize={"10px"}>
        작성하기
      </Button>
      <Text as={"span"}>인풋 스몰</Text>
      <Input size={"small"} $bgcolor={"white"} />
      <Text as={"span"}>인풋 미디움</Text>
      <Input size={"medium"} $bgcolor={"black"} />
      <Text as={"span"}>인풋 라지</Text>
      <Input size={"large"} $bgcolor={"white"} />
      <Container />
    </div>
  );
};

const Container = styled.div`
  height: 2000px;
`;
