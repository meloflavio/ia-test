import axios from "axios";

export const server = axios.create({
  baseURL: "https://ia-ser-mbkh.vercel.app"
})
