import { jwtDecode } from "jwt-decode";

export default {
  getToken(token) {
    let asd = jwtDecode(token);
    return asd;
  },
};
