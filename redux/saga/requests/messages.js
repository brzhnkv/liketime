import axios from "axios";

export function requestGetMessages(username) {
  return axios.request({
    method: "POST",
    url: "http://localhost:5000/api/v1/user/messages",
    data: { username: username },
  });
}
