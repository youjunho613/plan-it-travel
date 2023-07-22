import axios from "axios";

export const getUserPosts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/userPosts`);
  return response.data;
};
