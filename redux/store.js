import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import counterReducer from "./counterSlice";

import { watcherSaga } from "./saga/rootSaga";
import messagesReducer from "./messagesSlice";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const reducer = combineReducers({
  counter: counterReducer,

  messages: messagesReducer,
});

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), ...middleware],
});

sagaMiddleware.run(watcherSaga);

export default store;
