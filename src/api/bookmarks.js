import axios from "axios";

// 북마크 조회
const getBookmarks = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/bookmarks`);
  return response.data;
};

// 북마크 추가
const addBookmark = async newBookmark => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/bookmarks`, newBookmark);
};

// 북마크 삭제
const deleteBookmark = async id => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/bookmarks/${id}`);
};
export { addBookmark, getBookmarks, deleteBookmark };
