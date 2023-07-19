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
export { getComments, addComment };
