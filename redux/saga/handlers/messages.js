import { call, put } from "redux-saga/effects";
import { setMessages } from "../../messagesSlice";
import { requestGetMessages } from "../requests/messages";

export function* handleGetMessages(action) {
  try {
    const { payload } = action;
    const { username } = payload;
    const response = yield call(requestGetMessages, username);
    // yield put(setMessages({ ...response }));
  } catch (error) {
    console.log(error);
  }
}
