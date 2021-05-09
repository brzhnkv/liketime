import axios from "axios";

export function requestGetMessages(username) {
  return axios.request({
    method: "POST",
    //url: "http://localhost:5000/api/v1/user/messages", //office
    url: "https://liketimeserver.xyz/api/v1/user/messages", //production
    data: { username: username },
  });
}
