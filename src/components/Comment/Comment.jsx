import { addComment, deleteComment, getComments, modifyComment } from 'api/comments';
import { throttle } from 'lodash';
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import uuid from 'react-uuid';
import * as Styled from "./Comment.style";
import { Button, Input } from 'components/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faSpinner, faSquareCaretUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
export const Comment = ({paramsId}) => {
    const [comment, setComment] = useState("");
    const queryClient = useQueryClient();
  const { currentUser } = useSelector(state => state.userData);
  const commentsData = useQuery("comments", getComments)
  .data?.filter(e => e.postId === paramsId)
  .reverse();
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
    <>
    <Styled.CommentsForm onSubmit={leaveCommentHandler}>
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
      </Styled.CommentsForm>
      <Styled.CommentsWrap>
        {commentsData?.slice(0, visibleComments).map(item => {
          const { hours, diffDays, minutes } = displayWatch(item);
          return (
            <Styled.Flex key={item.id}>
              <Styled.DivBox>
                <Styled.ProfileImg src={item.photoURL} />
                <div>
                  <Styled.NicknameBox>{item.displayName}</Styled.NicknameBox>
                  <Styled.CommentBox>{item.comment}</Styled.CommentBox>
                </div>
              </Styled.DivBox>
              <Styled.SideBox>
                {currentUser?.email === item.email ? (
                  <Styled.IconBox>
                    <Styled.CustomFontAwesomeIcon
                      icon={faPenToSquare}
                      onClick={() => modifyCommentHandler(item.id)}
                    />
                    <Styled.CustomFontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteCommentHandler(item.id)}
                    />
                  </Styled.IconBox>
                ) : null}
                <Styled.DateBox>
                  {hours >= 24
                    ? diffDays + "일전"
                    : hours === 0
                    ? minutes + "분전"
                    : hours + "시간전"}
                </Styled.DateBox>
              </Styled.SideBox>
            </Styled.Flex>
          );
        })}
        <Styled.SideBar>
          <Styled.CustomFontAwesomeIcon
            icon={faSquareCaretUp}
            onClick={scrollToTop}
            style={{ fontSize: "40px" }}
          />
        </Styled.SideBar>
        {loading && <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: "30px" }} />}
      </Styled.CommentsWrap>
      </>
  )
}
