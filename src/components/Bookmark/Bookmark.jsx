import React from "react";
import * as Styled from "./Bookmark.style";
import { useAuth } from "components/auth";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { addBookmark, deleteBookmark, getBookmarks } from "api/bookmarks";
import uuid from "react-uuid";

export const Bookmark = ({ kakaoId, top, left, height }) => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();
  const detailData = useSelector(state => state.detailData).dataList?.find(e => e.id === kakaoId);
  console.log("detailData", detailData);
  const bookmarksData = useQuery("bookmarks", getBookmarks).data?.find(
    e => e.userEmail === currentUser?.email && e.kakaoId === kakaoId
  );
  const bookmarkClickHandler = () => {
    const date = Date.now();
    const nowDate = new Date(date).toLocaleString();
    if (!currentUser?.email) return alert("본 서비스는 로그인 후 이용이 가능합니다.");

    if (bookmarksData) {
      deleteBookmarkMutation.mutate(bookmarksData.id);
    } else {
      const bookmark = {
        id: uuid(),
        kakaoId,
        userEmail: currentUser.email,
        date: nowDate,
        place_name: detailData.place_name,
        address_name: detailData.address_name,
        phone: detailData.phone
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
    <Styled.BookmarkSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      onClick={bookmarkClickHandler}
      fill={bookmarksData}
      top={top}
      left={left}
      height={height}
    >
      <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
    </Styled.BookmarkSvg>
  );
};
