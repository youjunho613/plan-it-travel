import { useMutation, useQuery, useQueryClient } from "react-query";
import { addComment, deleteComment, getComments, modifyComment } from "api/comments";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Button, Input } from "components/common";
import uuid from "react-uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faComment, faSpinner, faSquareCaretUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { throttle } from "lodash";
import { useSelector } from "react-redux";
import markerImg from "assets/marker.png";
import { BookmarkIcon } from "pages/MyPage";

export const Detail = () => {
  const params = useParams();
  const paramsId = params.id;
  const [draggable, setDraggable] = useState(true);
  const [zoomable, setZoomable] = useState(true);
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const { x, y, address_name, place_name, phone } = useSelector(
    state => state.detailData
  ).dataList.find(e => e.id === paramsId);

  // 로그인한 현재 유저 정보 GET
  const { currentUser } = useSelector(state => state.userData);

  const commentsData = useQuery("comments", getComments)
    .data?.filter(e => e.postId === paramsId)
    .reverse();

  const position = { lat: y, lng: x };

  useEffect(() => {
    setZoomable(false);
    setDraggable(false);
  }, []);

  // 댓글 작성
  const leaveCommentHandler = event => {
    event.preventDefault();
    if (!currentUser?.email) return alert("본 서비스는 로그인 후 이용이 가능합니다.");
    const date = new Date();
    if (comment.length > 300 || comment.length < 1)
      return alert("내용은 1자 이상 300자 이하로 작성해 주세요.");
    const newComment = {
      id: uuid(),
      postId: paramsId,
      comment,
      date,
      email: currentUser?.email,
      displayName: currentUser?.displayName,
      photoURL: currentUser?.photoURL
    };

    commentMutation.mutate(newComment);
    setComment("");
    window.scrollTo({ top: 800, behavior: "smooth" });
  };

  const commentMutation = useMutation(addComment, {
    onSuccess: () => queryClient.invalidateQueries("comments")
  });

  // 댓글 수정
  const modifyCommentHandler = id => {
    const changeComment = prompt("수정할 댓글 내용을 입력해 주세요", comment);
    if (changeComment !== null) {
      if (changeComment === "") return alert("댓글 내용은 1자리 이상 입력하셔야 합니다.");
      const newComment = { comment: changeComment };
      modifyMutation.mutate({ id, newComment });
    }
  };
  const modifyMutation = useMutation(modifyComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
      return alert("수정이 완료되었습니다.");
    }
  });

  // 댓글 작성 인풋 채인지 함수
  const commentChangeHandler = e => setComment(e.target.value);

  // 댓글 삭제
  const deleteCommentHandler = id => {
    if (window.confirm("정말 삭제하시겠습니까?")) deleteMutation.mutate(id);
  };
  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => queryClient.invalidateQueries("posts")
  });

  // 무한스크롤
  // 페이지당 표시할 댓글 수를 설정합니다.
  const [loading, setLoading] = useState(false);
  const COMMENTS_PER_PAGE = 5;
  const [visibleComments, setVisibleComments] = useState(COMMENTS_PER_PAGE);
  const handleScroll = throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    // 스크롤이 페이지 아래로 내려가면 추가 댓글 데이터를 가져옵니다.
    if (scrollHeight - scrollTop === clientHeight) {
      // 현재 보여지고 있는 댓글 개수에 페이지당 표시할 댓글 수를 더해 새로운 개수를 설정합니다.
      const newVisibleComments = visibleComments + COMMENTS_PER_PAGE;
      setLoading(true);
      setVisibleComments(newVisibleComments);
    }
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // 컴포넌트가 unmount될 때 스크롤 이벤트 리스너를 제거합니다.
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Top 사이드바
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // 몇분,몇시간,몇일 전
  const displayWatch = item => {
    const timeDiff = Date.now() - new Date(item.date);
    const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    return { hours, diffDays, minutes };
  };

  return (
    <Container>
      <Wrap>
        <MapWrap>
          <Map // 지도를 표시할 Container
            center={position}
            style={{
              width: "500px",
              height: "500px"
            }}
            level={3}
            draggable={draggable}
            zoomable={zoomable}
          >
            <MapMarker
              position={position}
              image={{
                src: markerImg,
                size: { width: 60, height: 50 },
                options: { offset: { x: 30, y: 50 } }
              }}
            />
          </Map>

          {/* 북마크 컴포넌트 */}
          <BookmarkIcon kakaoId={paramsId} top={43} left={230} height={"30px"} />

          <LargeFont>{place_name}</LargeFont>
          <div>{address_name}</div>
          <div>{phone}</div>
        </MapWrap>
      </Wrap>
      <CommentsForm onSubmit={leaveCommentHandler}>
        <Input
          size={"small"}
          $bgcolor={"white"}
          type={"text"}
          value={currentUser?.displayName || "로그인 해주세요"}
          disabled={true}
        />
        <Input
          size={"large"}
          $bgcolor={"white"}
          type={"text"}
          style={{ margin: "0 20px 0 20px" }}
          value={comment}
          onChange={commentChangeHandler}
          placeholder={"내용을 입력하세요."}
        />
        <Button size={"small"} $bgcolor={"theme1"}>
          <FontAwesomeIcon icon={faComment} size="2xl" />
        </Button>
      </CommentsForm>
      <CommentsWrap>
        {commentsData?.slice(0, visibleComments).map(item => {
          const { hours, diffDays, minutes } = displayWatch(item);
          return (
            <Flex key={item.id}>
              <DivBox>
                <ProfileImg src={item.photoURL} />
                <div>
                  <NicknameBox>{item.displayName}</NicknameBox>
                  <CommentBox>{item.comment}</CommentBox>
                </div>
              </DivBox>
              <SideBox>
                {currentUser?.email === item.email ? (
                  <IconBox>
                    <CustomFontAwesomeIcon
                      icon={faPenToSquare}
                      onClick={() => modifyCommentHandler(item.id)}
                    />
                    <CustomFontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteCommentHandler(item.id)}
                    />
                  </IconBox>
                ) : null}
                <DateBox>
                  {hours >= 24
                    ? diffDays + "일전"
                    : hours === 0
                    ? minutes + "분전"
                    : hours + "시간전"}
                </DateBox>
              </SideBox>
            </Flex>
          );
        })}
        <SideBar>
          <CustomFontAwesomeIcon
            icon={faSquareCaretUp}
            onClick={scrollToTop}
            style={{ fontSize: "40px" }}
          />
        </SideBar>
        {loading && <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: "30px" }} />}
      </CommentsWrap>
    </Container>
  );
};

const LargeFont = styled.div`
  font-size: 25px;
  font-weight: 700;
  width: 450px;
  text-align: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const MapWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 30px 60px 30px;
  background-color: ${props => props.theme.colors.modalBlack};
  gap: 10px;
  line-break: anywhere;
  border-radius: 15px;
  position: relative;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommentsForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${props => props.theme.colors.modalBlack};
  height: 80px;
  width: 46%;
  min-width: 850px;
  margin: 20px auto;
`;

const CommentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 46%;
  min-width: 700px;
  margin: 15px 0;
  padding: 10px;
  background-color: ${props => props.theme.colors.modalBlack};
  border-radius: 20px;
`;

const DivBox = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px;
`;

const NicknameBox = styled.div`
  width: 100%;
  padding-bottom: 5px;
  font-weight: 700;
`;

const CommentBox = styled.div`
  width: 100%;
  line-break: anywhere;
`;

const SideBox = styled.div`
  display: flex;
`;

const IconBox = styled.div`
  display: inherit;
`;

const CustomFontAwesomeIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin: 0 10px;
  font-size: 25px;
`;

const DateBox = styled.div`
  margin-left: 20px;
  width: 80px;
`;

const SideBar = styled(CommentsWrap)`
  position: fixed;
  right: 20px;
  bottom: 20px;
`;
