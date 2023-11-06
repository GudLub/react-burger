import { createAction } from "@reduxjs/toolkit";
import { TWsOrder } from "../../utils/types";

export const connect = createAction<string>('GET_ALL_ORDERS_CONNECT')
export const disconnect = createAction('GET_ALL_ORDERS_DISCONNECT');
export const wsConnecting = createAction('GET_ALL_ORDERS_WS_CONNECTING');
export const wsOpen = createAction('GET_ALL_ORDERS_WS_OPEN');
export const wsClose = createAction('GET_ALL_ORDERS_WS_CLOSE');
export const wsMessage = createAction<T | unknown>('GET_ALL_ORDERS_WS_MESSAGE');
export const wsError = createAction<string>('GET_ALL_ORDERS_WS_ERROR');

export type T = {
    type: typeof wsMessage,
    payload: unknown | {
    orders: TWsOrder[] | [],
    total: number | null,
    totalToday: number | null,
    succeess: boolean,
    }
  }