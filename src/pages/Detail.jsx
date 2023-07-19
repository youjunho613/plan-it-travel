import { useMutation, useQuery, useQueryClient } from "react-query";
import { addComment, getComments } from "../api/comments";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Button, Input } from "components/common";
import { getUsers } from "api/users";
import uuid from "react-uuid";

export const Detail = () => {
  const params = useParams();
  const id = params.id;
  const [draggable, setDraggable] = useState(true);
  const [zoomable, setZoomable] = useState(true);
  const [comment, setComment] = useState("");
  const commentsData = useQuery("comments", getComments).data?.filter(e => e.postId === id);
  const usersData = useQuery("users", getUsers).data;
  const loginUserData = usersData?.filter(e => e.email === "kimjinsu0210@naver.com")[0];
  const position = {
    lat: 33.450701,
    lng: 126.570667
  };

  const queryClient = useQueryClient();
  const commentMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    }
  });
    useEffect(() => {
      setZoomable(false);
      setDraggable(false);
    }, []);

  const leaveCommentHandler = event => {
    event.preventDefault();
    const date = new Date();
    const nowTime = date.toLocaleString();
    if (comment.length > 300 || comment.length < 1) {
      return alert("내용은 1자 이상 300자 이하로 작성해 주세요.");
    }
    const newComment = {
      id: uuid(),
      postId: id,
      comment,
      nickname: loginUserData.nickname,
      profileImg: loginUserData.profileImg,
      date: nowTime
    };
    commentMutation.mutate(newComment);
    setComment("");
  };

  const commentChangeHandler = e => {
    setComment(e.target.value);
  };

  return (
    <Container>
      <Wrap>
        <Map // 지도를 표시할 Container
          center={position}
          style={{
            width: "700px",
            height: "700px"
          }}
          level={3}
          draggable={draggable}
          zoomable={zoomable}
        >
          <MapMarker position={position} />
        </Map>
        <CommentsWrap>
          {commentsData?.map(item => {
            return (
              <Flex key={item.id}>
                <ProfileImg src={item.profileImg} />
                <div>
                  <NicknameBox>{item.nickname}</NicknameBox>
                  <CommentBox>{item.comment}</CommentBox>
                </div>
                <div>{item.date}</div>
              </Flex>
            );
          })}
        </CommentsWrap>
      </Wrap>
      <CommentsLeaveWrap>
        <form onSubmit={leaveCommentHandler}>
          <Input
            size={"small"}
            $bgcolor={"white"}
            type={"text"}
            value={loginUserData?.nickname}
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
            댓글 작성
          </Button>
        </form>
      </CommentsLeaveWrap>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 60px;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
`;
const CommentsWrap = styled.div`
  width: 50%;
`;
const CommentsLeaveWrap = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  position: absolute;
  right: 260px;
  height: 150px;
`;
const ProfileImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url("/defaultImg.png");
  background-position: center;
  background-size: cover;
  margin: 10px 10px 10px 50px;
`;
const NicknameBox = styled.div`
  padding-bottom: 5px;
  font-weight: 700;
`;
const CommentBox = styled.div`
  width: 600px;
`;
