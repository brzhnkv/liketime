import { takeLatest } from "redux-saga/effects";
import { getMessages } from "../messagesSlice";
import { handleGetMessages } from "./handlers/messages";

export function* watcherSaga() {
  yield takeLatest(getMessages.type, handleGetMessages);
}
