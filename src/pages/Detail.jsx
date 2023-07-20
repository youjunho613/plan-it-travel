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
import { faComment, faSpinner, faSquareCaretUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { throttle } from "lodash";
import { useSelector } from "react-redux";
import { youtubeApi } from "../api/youtube";
import YouTube from "react-youtube";
import { addBookmark, deleteBookmark, getBookmarks } from "api/bookmarks";

export const Detail = () => {
  const params = useParams();
  const paramsId = params.id;
  const [draggable, setDraggable] = useState(true);
  const [zoomable, setZoomable] = useState(true);
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const { id, x, y, address_name, place_name, phone } = useSelector(
    state => state.detailData
  ).dataList.find(e => e.id === paramsId);

  const commentsData = useQuery("comments", getComments)
    .data?.filter(e => e.postId === paramsId)
    .reverse();

  const loginUserData = useQuery("users", getUsers).data?.find(
    e => e.email === "kimjinsu0210@naver.com"
  );

  const bookmarksData = useQuery("bookmarks", getBookmarks).data?.find(
    e => e.userEmail === loginUserData.email && e.kakaoId === paramsId
  );
  const position = {
    lat: y,
    lng: x
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
      postId: paramsId,
      comment,
      nickname: loginUserData.nickname,
      email: loginUserData.email,
      profileImg: loginUserData.profileImg,
      date
    };
    commentMutation.mutate(newComment);
    setComment("");
    window.scrollTo({ top: 800, behavior: "smooth" });
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
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleComments]);

  // Top 사이드바
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // 몇분,몇시간,몇일 전
  const displayWatch = item => {
    const date = Date.now();
    const nowDate = new Date(date);
    const commentDate = new Date(item.date);
    const milliDate = Math.abs(nowDate - commentDate);
    const diffDays = Math.ceil(milliDate / (1000 * 60 * 60 * 24)); //
    const timeDiff = nowDate - commentDate;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60)); //
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60); //
    return { hours, diffDays, minutes };
  };

  // //유튜브
  // const [youtubeRes, setYoutubeRes] = useState("");

  // const onYoutube = async () => {
  //   try {
  //     const response = await youtubeApi.get("/videos", {
  //       params: {
  //         part: "snippet",
  //         chart: "mostPopular",
  //         maxResults: 5,
  //         videoCategoryId: 19,
  //         regionCode: "KR"
  //         // q: "소녀시대"
  //         // videoCategoryId: 2,
  //         // id: "ZaB4MmTOZRs"
  //       }
  //     });
  //     console.log("response", response.data.items);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // //유튜브
  // useEffect(() => {
  //   onYoutube();
  // }, []);

  // const bookmarksData = useQuery("bookmarks", getBookmarks).data?.find(
  //   e => e.userEmail === loginUserData.email && e.kakaoId === paramsId
  // );

  // 북마크 관련 로직
  const bookmarkClickHandler = () => {
    const date = Date.now();
    const nowDate = new Date(date).toLocaleString();
    if (bookmarksData) {
      deleteBookmarkMutation.mutate(bookmarksData.id);
    } else {
      const bookmark = {
        id: uuid(),
        kakaoId: paramsId,
        userEmail: loginUserData.email,
        date: nowDate,
        place_name,
        address_name,
        phone
      };
      bookmarkMutation.mutate(bookmark);
    }
  };

  const bookmarkMutation = useMutation(addBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries("bookmarks");
    }
  });

  const deleteBookmarkMutation = useMutation(deleteBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries("bookmarks");
    }
  });

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
            <MapMarker position={position} />
          </Map>

          <BookmarkSvg
            xmlns="http://www.w3.org/2000/svg"
            height="2em"
            viewBox="0 0 384 512"
            onClick={bookmarkClickHandler}
            fill={bookmarksData}
          >
            <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
          </BookmarkSvg>
          <LargeFont>{place_name}</LargeFont>
          <div>{address_name}</div>
          <div>{phone}</div>
        </MapWrap>
      </Wrap>
      <CommentsLeaveWrap>
        <form onSubmit={leaveCommentHandler}>
          <Input
            size={"small"}
            $bgcolor={"white"}
            type={"text"}
            value={loginUserData?.nickname || ""}
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
        </form>
      </CommentsLeaveWrap>
      <CommentsWrap>
        {commentsData?.slice(0, visibleComments).map(item => {
          const { hours, diffDays, minutes } = displayWatch(item);
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
        {loading && <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: "30px" }} />}
      </CommentsWrap>
    </Container>
  );
};

const BookmarkSvg = styled.svg`
  cursor: pointer;
  fill: ${props => (props.fill ? props.theme.colors.theme1 : props.theme.colors.white)};
  position: relative;
  top: 43px;
  left: 230px;
`;
const LargeFont = styled.div`
  font-size: 25px;
  font-weight: 700;
  width: 450px;
  text-align: center;
`;
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
const MapWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 30px 60px 30px;
  background-color: #50505037;
  gap: 10px;
  line-break: anywhere;
  border-radius: 15px;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  background-color: #50505037;
  border-radius: 20px;
  padding: 10px;
  line-break: anywhere;
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
  margin: 10px;
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
  margin-left: 30px;
  width: 80px;
`;
