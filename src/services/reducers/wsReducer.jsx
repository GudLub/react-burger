import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsMessage,
  wsError
} from '../actions/wsActions.jsx';
import { WebsocketStatus } from '../../utils/orders.jsx';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  status: WebsocketStatus.OFFLINE,
  massiv: [],
  connectionError: '',
  loader: false,
  total: 0,
  totalToday: 0
};

export const wsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, state => {
          state.status = WebsocketStatus.CONNECTING;
          state.loader = true;
      })
    .addCase(wsOpen, state => {
        state.status = WebsocketStatus.ONLINE;
        state.connectionError = '';
        state.loader = true;
    })
    .addCase(wsMessage, (state, action) => {
      state.massiv = action.payload;
      state.total = action.payload;
      state.totalToday = action.payload;
      state.loader = false;
    })
    .addCase(wsClose, state => {
        state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
        state.connectionError = action.payload;
    })
    
})