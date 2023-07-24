import axios from "axios";

const getUserPost = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/userPosts`);
  return response.data;
};

const postUserPost = async newUserPost => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/userPosts`, newUserPost);
};

const deleteUserPost = async id => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/userPosts/${id}`);
};
export { getUserPost, postUserPost, deleteUserPost };
