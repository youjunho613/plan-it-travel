import axios from "axios";

// 댓글 가져오기
const getComments = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/comments`);
  return response.data;
};

// 댓글 작성
const addComment = async newComment => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/comments`, newComment);
};

// 댓글 수정
const modifyComment = async ({ id, newComment }) => {
  await axios.patch(`${process.env.REACT_APP_SERVER_URL}/comments/${id}`, newComment);
};

// 댓글 삭제
const deleteComment = async id => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/comments/${id}`);
};
export { getComments, addComment, modifyComment, deleteComment };
