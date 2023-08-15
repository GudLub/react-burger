import { rootReducer } from "./reducers/rootReducer";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { socketMiddleware } from "./middleware/socketMiddleware.jsx";
import {
  connect,
  disconnect,
  wsOpen,
  wsClose,
  wsMessage,
  wsError,
  wsConnecting,
} from "../services/actions/wsActions.jsx";
import {
  connectInProfile,
  disconnectInProfile,
  wsConnectingInProfile,
  wsOpenInProfile,
  wsCloseInProfile,
  wsMessageInProfile,
  wsErrorInProfile,
} from "../services/actions/wsProfileActions.jsx";

const ordersMiddlware = socketMiddleware({
  wsConnect: connect,
  wsDisconnect: disconnect,
  wsConnecting: wsConnecting,
  onOpen: wsOpen,
  onMessage: wsMessage,
  onClose: wsClose,
  onError: wsError,
});

const ordersProfileMiddlware = socketMiddleware({
  wsConnect: connectInProfile,
  wsDisconnect: disconnectInProfile,
  wsConnecting: wsConnectingInProfile,
  onOpen: wsOpenInProfile,
  onMessage: wsMessageInProfile,
  onClose: wsCloseInProfile,
  onError: wsErrorInProfile,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, ordersMiddlware, ordersProfileMiddlware)
  )
);

export default store;
