import axios from "axios";
import { BASE_URL } from "@/env";

export default function setTokenRelations() {
  let refresh = localStorage.getItem("refreshToken");

  //console.log(refresh);
  ///se toma el token refresh
  const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
  });
  apiClient
    .post("/refresh-token-relations", {
      refreshToken: refresh.toString(),
    })
    .then((response) => {
      localStorage.setItem("token", response.data.Token);
    })
    .catch((error) => {
      console.log(error.response, "soy el error del refreshToken");
    });
}
