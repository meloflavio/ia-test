import axios from "axios";

export const server = axios.create({
  baseURL: "/api"
})
