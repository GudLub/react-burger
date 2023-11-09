import { createAction } from "@reduxjs/toolkit";
import { T } from "./wsActions";

export const connectInProfile = createAction<string>('GET_ALL_ORDERS_IN_PROFILE_CONNECT')
export const disconnectInProfile = createAction<string>('GET_ALL_ORDERS_IN_PROFILE_DISCONNECT');
export const wsConnectingInProfile = createAction('GET_ALL_ORDERS_IN_PROFILE_WS_CONNECTING');
export const wsOpenInProfile = createAction('GET_ALL_ORDERS_IN_PROFILE_WS_OPEN');
export const wsCloseInProfile = createAction('GET_ALL_ORDERS_IN_PROFILE_WS_CLOSE');
export const wsMessageInProfile = createAction<T | unknown>('GET_ALL_ORDERS_IN_PROFILE_WS_MESSAGE');
export const wsErrorInProfile = createAction<string>('GET_ALL_ORDERS_IN_PROFILE_WS_ERROR');