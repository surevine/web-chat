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

//   if (true) {
//     /* process.env.NODE_ENV !== 'production' */ middleware.push(
//       reduxLogger({
//         collapsed: true
//         // logger: customLogger
//       })
//     );

//     storeEnhancers.push(window.devToolsExtension ? window.devToolsExtension() : f => f);
//   }

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...storeEnhancers)
  );

  // const store = createStore(
  //   rootReducer,
  //   initialState
  // );

  sagaMiddleware.run(sagas);
  return store;
}
