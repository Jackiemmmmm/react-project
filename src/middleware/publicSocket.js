import { globalWS } from 'actions/publicSocket';

const onOpen = (ws, store) => {
  console.log('Open: ', ws, store);
};

const onError = (ws, store) => () => {
  console.log('Error: ', ws, store);
};

const onMessage = (ws, store) => (evt) => {
  const msg = JSON.parse(evt.data);
  store.dispatch(globalWS(msg));
};

let socket = null;

const poloniexSocket = store => next => (action) => {
  switch (action.type) {
    case 'CONNECTED':
      if (socket != null) {
        socket.close();
      }
      socket = new WebSocket('ws://microcoin.io:8080/v1/ws');
      socket.onmessage = onMessage(socket, store);
      socket.onerror = onError(socket, store);
      socket.onopen = onOpen(socket, store);
      break;
    case 'DISCONNECT':
      socket.close();
      break;
    default:
      return next(action);
  }
  return next(action);
};

export default poloniexSocket;
