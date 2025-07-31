import axios from "axios";

const URL = "http://localhost:3333/";

export const API = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});
