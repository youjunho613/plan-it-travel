import axios from "axios";

const KEY = `${process.env.REACT_APP_YOUTUBE_KEY}`;

const youtubeApi = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    key: KEY
  }
});

export { youtubeApi };
