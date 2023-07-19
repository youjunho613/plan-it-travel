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
import { youtubeApi } from "../api/youtube";
import YouTube from "react-youtube";
import { faSpinner, faSquareCaretUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { throttle } from "lodash";

export const Detail = () => {
  const params = useParams();
  const id = params.id;
  const [draggable, setDraggable] = useState(true);
  const [zoomable, setZoomable] = useState(true);
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const commentsData = useQuery("comments", getComments)
    .data?.filter(e => e.postId === id)
    .reverse();
  const usersData = useQuery("users", getUsers).data;
  const loginUserData = usersData?.filter(e => e.email === "kimjinsu0210@naver.com")[0];
  const position = {
    lat: 33.450701,
    lng: 126.570667
  };

  useEffect(() => {
    setZoomable(false);
    setDraggable(false);
  }, []);

  // 댓글 작성
  const leaveCommentHandler = event => {
    event.preventDefault();
    const date = new Date();
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
      date
    };
    commentMutation.mutate(newComment);
    setComment("");
  };
  const commentMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    }
  });

  // 댓글 수정
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
  const modifyMutation = useMutation(modifyComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
      return alert("수정이 완료되었습니다.");
    }
  });
  const commentChangeHandler = e => {
    setComment(e.target.value);
  };

  // 댓글 삭제
  const deleteCommentHandler = id => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteMutation.mutate(id);
    }
  };
  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    }
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
  }, 500);
  useEffect(() => {
    // 스크롤 이벤트 리스너를 추가합니다.
    window.addEventListener("scroll", handleScroll);
    // 컴포넌트가 unmount될 때 스크롤 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleComments]);

  // Top 사이드바
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        {commentsData?.slice(0, visibleComments).map(item => {
          const date = Date.now();
          const nowDate = new Date(date);
          const commentDate = new Date(item.date);
          const milliDate = Math.abs(nowDate - commentDate);
          const diffDays = Math.ceil(milliDate / (1000 * 60 * 60 * 24));
          const timeDiff = nowDate - commentDate;
          const hours = Math.floor(timeDiff / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
          return (
            <Flex key={item.id}>
              <ProfileImg src={item.profileImg} />
              <div>
                <NicknameBox>{item.nickname}</NicknameBox>
                <CommentBox>{item.comment}</CommentBox>
              </div>
              <DateBox>
                {hours >= 24
                  ? diffDays + "일전"
                  : hours === 0
                  ? minutes + "분전"
                  : hours + "시간전"}
              </DateBox>
              {loginUserData?.email === item.email ? (
                <div>
                  <CustomFontAwesomeIcon
                    icon={faPenToSquare}
                    onClick={() => modifyCommentHandler(item.id)}
                  />
                  <CustomFontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteCommentHandler(item.id)}
                  />
                </div>
              ) : (
                <div style={{ width: "50px" }}></div>
              )}
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
        {loading && (
          <FontAwesomeIcon icon={faSpinner} spin style={{ color: "#ffffff", fontSize: "30px" }} />
        )}
      </CommentsWrap>
    </Container>
  );
};
const CustomFontAwesomeIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin: 0 10px 0 10px;
  font-size: 25px;
`;
const SideBar = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
  margin-bottom: 30px;
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
  height: 180px;
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
  width: 80px;
`;
