import { createStore, applyMiddleware, compose } from "redux";
// import devTools from "remote-redux-devtools";
import createSagaMiddleware from "redux-saga";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
// import thunk from "redux-thunk";
import promise from "./Promise";
import reducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const reduxMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.RootStackReducer,
);
const middleware = [sagaMiddleware, reduxMiddleware];

export default function configureStore() {
  const enhancer = compose(applyMiddleware(...middleware, promise));
  const store = createStore(reducer, enhancer);

  sagaMiddleware.run(rootSaga);
  return { store };
}
