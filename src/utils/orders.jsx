export const diffDays = (first, second) => {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
};

export const diffToString = (diff) => {
  switch (diff) {
    case 0:
      return "Сегодня";
    case 1:
      return "Вчера";
    default:
      return `${diff} дня назад`;
  }
};

export const WebsocketStatus = {
  CONNECTING: "CONNECTING...",
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
};

export const OrdersActionType = {
  DATA: "data",
  INSERT: "insert",
  DELETE: "delete",
  UPDATE: "update",
  MOVE: "move",
};