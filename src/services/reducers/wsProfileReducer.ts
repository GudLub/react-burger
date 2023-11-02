import {
  wsConnectingInProfile,
  wsOpenInProfile,
  wsCloseInProfile,
  wsMessageInProfile,
  wsErrorInProfile
} from '../actions/wsProfileActions';
import { WebsocketStatus } from '../../utils/orders';
import { createReducer } from '@reduxjs/toolkit';
import { TWsOrder } from '../../utils/types';

type TWsProfileInitialState = {
  status: string,
  orders: {
    success: boolean;
    orders: TWsOrder[];
    total: number,
    totalToday: number
  },
  connectionError: string,
  success: boolean,
};

const initialState: TWsProfileInitialState = {
  status: WebsocketStatus.OFFLINE,
  orders: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0
  } ,
  connectionError: '',
  success: false
};

export const wsProfileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnectingInProfile, state => {
          state.status = WebsocketStatus.CONNECTING;
          state.success = true;
      })
    .addCase(wsOpenInProfile, state => {
        state.status = WebsocketStatus.ONLINE;
        state.connectionError = '';
        state.success = true;
    })
    .addCase(wsMessageInProfile, (state, action: any) => {
      state.orders = action.payload;
      state.success = false;
    })
    .addCase(wsCloseInProfile, state => {
        state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsErrorInProfile, (state, action) => {
        state.connectionError = action.payload;
    })
    
})