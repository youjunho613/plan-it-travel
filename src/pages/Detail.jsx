import { useMutation, useQuery, useQueryClient } from "react-query";
import { addComment, deleteComment, getComments, modifyComment } from "../api/comments";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Button, Input } from "components/common";
import { getUsers } from "api/users";
import uuid from "react-uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { youtubeApi } from "../api/youtube";
import YouTube from "react-youtube";

export const Detail = () => {
  const params = useParams();
  const id = params.id;
  const [draggable, setDraggable] = useState(true);
  const [zoomable, setZoomable] = useState(true);
  const [comment, setComment] = useState("");
  const commentsData = useQuery("comments", getComments)
    .data?.filter(e => e.postId === id)
    .reverse();
  console.log("commentsData", commentsData);
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
      email: loginUserData.email,
      profileImg: loginUserData.profileImg,
      date: nowTime
    };
    commentMutation.mutate(newComment);
    setComment("");
  };

  const commentChangeHandler = e => {
    setComment(e.target.value);
  };

  const modifyMutation = useMutation(modifyComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
      return alert("수정이 완료되었습니다.");
    }
  });
  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    }
  });
  const modifyCommentHandler = id => {
    const changeComment = prompt("수정할 댓글 내용을 입력해 주세요", comment);
    if (changeComment !== null) {
      if (changeComment === "") return alert("댓글 내용은 1자리 이상 입력하셔야 합니다.");
      const newComment = {
        comment: changeComment
      };
      modifyMutation.mutate({ id, newComment });
    }
  };
  const deleteCommentHandler = id => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteMutation.mutate(id);
    }
  };

  const [youtubeRes, setYoutubeRes] = useState("");

  const onSearch = async () => {
    console.log("response");
    // var value = encodeURI("여행계획 목포해수욕장");
    const response = await youtubeApi.get("/search", {
      params: {
        q: "목포"
      }
    });
    setYoutubeRes(response.data.items[0].id.videoId);
    console.log(response.data.items, "response");
  };
  //유튜브
  useEffect(() => {
    onSearch();
  }, []);

  return (
    <Container>
      <Wrap>
        <Map // 지도를 표시할 Container
          center={position}
          style={{
            width: "600px",
            height: "600px"
          }}
          level={3}
          draggable={draggable}
          zoomable={zoomable}
        >
          <MapMarker position={position} />
        </Map>

        <YouTube
          videoId={youtubeRes}
          opts={{
            width: "700",
            height: "400",
            playerVars: {
              autoplay: 1,
              rel: 0,
              modestbranding: 1
            }
          }}
          onEnd={e => {
            e.target.stopVideo(0);
          }}
        ></YouTube>
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
      <CommentsWrap>
        {commentsData?.map(item => {
          return (
            <Flex key={item.id}>
              <ProfileImg src={item.profileImg} />
              <div>
                <NicknameBox>{item.nickname}</NicknameBox>
                <CommentBox>{item.comment}</CommentBox>
              </div>
              <DateBox>{item.date}</DateBox>
              {loginUserData?.email === item.email && (
                <div>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ margin: "0 10px 0 10px", cursor: "pointer" }}
                    onClick={() => modifyCommentHandler(item.id)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteCommentHandler(item.id)}
                  />
                </div>
              )}
            </Flex>
          );
        })}
      </CommentsWrap>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 60px;
  align-items: center;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
`;
const CommentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CommentsLeaveWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 600px;
`;
const CommentBox = styled.div`
  width: 600px;
`;
const DateBox = styled.div`
  width: 200px;
`;
