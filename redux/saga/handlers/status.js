import { call, put } from "redux-saga/effects";
import { setStatus } from "../../statusSlice";
import { requestGetStatus } from "../requests/status";

export function* handleGetStatus(action) {
  try {
    const { payload } = action;
    const { username } = payload;
    const response = yield call(requestGetStatus, username);
    const { data } = response;
    yield put(setStatus({ ...data }));
  } catch (error) {
    console.log(error);
  }
}
