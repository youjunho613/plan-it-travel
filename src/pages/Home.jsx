import { Button } from "components/common";
// FIXME pages 폴더 스타일 컴포넌트 나누는지 협의
import { styled } from "styled-components";

export const Home = () => {
  // TODO 링크 걸어주기
  return (
    <ButtonBox>
      <Button $bgcolor={"theme1"} size={"large"} fontSize={"10px"}>
        추천보기
      </Button>
      <Button $bgcolor={"theme1"} size={"large"} fontSize={"10px"}>
        모두보기
      </Button>
      {/* <Button $bgcolor={"theme1"} size={"large"} fontSize={"10px"} onClick={OpenHandler}>
        임시 글작성
      </Button>
      {createPostIsOpen && (
        <Modal closeTarget={"createPostIsOpen"}>
          <CreatePost />
        </Modal>
      )} */}
    </ButtonBox>
  );
};

const ButtonBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 50px;

  transform: translate(-50%, -50%);
`;

/* 글 작성 모달 로직 start
import { Modal } from "components/common";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "redux/modules/modal";
import CreatePost from "components/CreatePost";
글 작성 모달 로직 end */

/* 글 작성 모달 로직 start
글 작성 모달 여는 트리거 버튼은 어디에 구현 되는지?
const { createPostIsOpen } = useSelector(state => state.modal);
const dispatch = useDispatch();
const OpenHandler = () => dispatch(openModal("createPostIsOpen"));
const closeHandler = () => dispatch(closeModal("createPostIsOpen"));
글 작성 모달 로직 end */
