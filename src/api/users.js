import axios from "axios";
// 유저 가져오기
const getUsers = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`);
  return response.data;
};

export { getUsers };
