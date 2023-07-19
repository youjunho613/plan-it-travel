import axios from "axios";

const getUsers = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`);
  return response.data;
};

export { getUsers };
