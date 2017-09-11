import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
// import reduxLogger from "redux-logger";

import rootReducer from "../reducers";
import sagas from "../sagas";

// import customLogger from "./customLogger";

export default function configureStore(initialState = {}) {

  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  const storeEnhancers = [];

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...storeEnhancers)
  );

  sagaMiddleware.run(sagas);
  return store;
}
