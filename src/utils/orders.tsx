export const diffDays = (first: Date, second: Date) => {
  return Math.round((second.getTime() - first.getTime()) / (1000 * 60 * 60 * 24));
};

export const diffToString = (diff: number) => {
  switch (diff) {
    case 0:
      return "Сегодня";
    case 1:
      return "Вчера";
    default:
      return `${diff} дня назад`;
  }
};

type TWebsocketStatus = {
  CONNECTING: string,
  ONLINE: string,
  OFFLINE: string,
}
export const WebsocketStatus: TWebsocketStatus = {
  CONNECTING: "CONNECTING...",
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
};

type TOrdersActionType = {
  DATA: string,
  INSERT: string,
  DELETE: string,
  UPDATE: string,
  MOVE: string,
}
export const OrdersActionType: TOrdersActionType = {
  DATA: "data",
  INSERT: "insert",
  DELETE: "delete",
  UPDATE: "update",
  MOVE: "move",
};
