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
  massiv: TWsOrder[],
  connectionError: string,
  loader: boolean,
};

const initialState: TWsProfileInitialState = {
  status: WebsocketStatus.OFFLINE,
  massiv: [],
  connectionError: '',
  loader: false
};

export const wsProfileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnectingInProfile, state => {
          state.status = WebsocketStatus.CONNECTING;
          state.loader = true;
      })
    .addCase(wsOpenInProfile, state => {
        state.status = WebsocketStatus.ONLINE;
        state.connectionError = '';
        state.loader = true;
    })
    .addCase(wsMessageInProfile, (state, action: any) => {
      state.massiv = action.payload;
      state.loader = false;
    })
    .addCase(wsCloseInProfile, state => {
        state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsErrorInProfile, (state, action) => {
        state.connectionError = action.payload;
    })
    
})