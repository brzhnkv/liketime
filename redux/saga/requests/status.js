import axios from "axios";

export function requestGetStatus(username) {
  return axios.request({
    method: "POST",
    url: "http://localhost:5000/api/v1/user/status",
    data: { username: username },
  });
}
