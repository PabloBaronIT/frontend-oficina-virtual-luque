import axios from "axios";
import { BASE_URL } from "@/env";
export default function setToken() {
  let refresh = localStorage.getItem("refreshToken"); ///se toma el token refresh
  const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    headers: {
      "auth-header": localStorage.getItem("token"),
    },
  });
  apiClient
    .post("/refresh-token", {
      refreshToken: refresh,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.Token);
    })
    .catch((error) => {
      console.log(error.response, "soy el error del refreshToken");
    });
}
