import { createAction } from "@reduxjs/toolkit";

export const connectInProfile = createAction('GET_ALL_ORDERS_IN_PROFILE_CONNECT')
export const disconnectInProfile = createAction('GET_ALL_ORDERS_IN_PROFILE_DISCONNECT');
export const wsConnectingInProfile = createAction('GET_ALL_ORDERS_IN_PROFILE_WS_CONNECTING');
export const wsOpenInProfile = createAction('GET_ALL_ORDERS_IN_PROFILE_WS_OPEN');
export const wsCloseInProfile = createAction('GET_ALL_ORDERS_IN_PROFILE_WS_CLOSE');
export const wsMessageInProfile = createAction('GET_ALL_ORDERS_IN_PROFILE_WS_MESSAGE');
export const wsErrorInProfile = createAction('GET_ALL_ORDERS_IN_PROFILE_WS_ERROR');