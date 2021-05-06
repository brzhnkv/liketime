import { takeLatest } from "redux-saga/effects";
import { getMessages } from "../messagesSlice";
import { getStatus } from "../statusSlice";
import { handleGetMessages } from "./handlers/messages";
import { handleGetStatus } from "./handlers/status";

export function* watcherSaga() {
  yield takeLatest(getMessages.type, handleGetMessages);
  yield takeLatest(getStatus.type, handleGetStatus);
}
