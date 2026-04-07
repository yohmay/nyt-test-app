import axios from "axios";

export const nytHttpClient = axios.create({
  baseURL: "https://api.nytimes.com/svc",
  timeout: 10000,
});
