import axios from "axios";

const instance = axios.create({
  baseUrl: "http://mongo-realtime.herokuapp.com",
});

export default instance;
