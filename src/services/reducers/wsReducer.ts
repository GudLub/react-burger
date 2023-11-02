import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsMessage,
  wsError
} from '../actions/wsActions';
import { WebsocketStatus } from '../../utils/orders';
import { createReducer } from '@reduxjs/toolkit';
import { TWsOrder } from '../../utils/types';

type TWsInitialState = {
  status: string,
  orders: {
    success: boolean;
    orders: TWsOrder[];
    total: number,
    totalToday: number
  },
  connectionError: string,
  success: boolean,
  total: number,
  totalToday: number 
}
const initialState: TWsInitialState = {
  status: WebsocketStatus.OFFLINE,
  orders: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0
  } ,
  connectionError: '',
  success: false,
  total: 0,
  totalToday: 0
};

export const wsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, state => {
          state.status = WebsocketStatus.CONNECTING;
          state.success = true;
      })
    .addCase(wsOpen, state => {
        state.status = WebsocketStatus.ONLINE;
        state.connectionError = '';
        state.success = true;
    })
    .addCase(wsMessage, (state, action: any) => {
      state.orders = action.payload;
      state.total = action.payload;
      state.totalToday = action.payload;
      state.success = false;
    })
    .addCase(wsClose, state => {
        state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
        state.connectionError = action.payload;
    })
    
})