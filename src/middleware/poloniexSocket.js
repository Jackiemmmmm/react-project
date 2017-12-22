import autobahn from 'autobahn';

const tickerEvent = function (args, kwargs) {
  console.log(args, kwargs);
};

const onOpen = (session) => {
  session.subscribe('ticker', tickerEvent);
};

// const onError = (ws, store) => () => {
//   console.log('Error: ', ws, store);
// };

// const onMessage = (ws, store) => (evt) => {
//   console.log('Message: ', ws, store, evt);
// };

const poloniexSocket = store => next => (action) => {
  let socket = null;
  const polows = 'wss://api.poloniex.com';
  switch (action.type) {
    case 'CONNECTED':
      if (socket != null) {
        socket.close();
      }
      socket = new autobahn.Connection({
        url: polows,
        realm: 'realm1',
      });
      // socket.onmessage = onMessage(socket, store);
      // socket.onerror = onError(socket, store);
      socket.onopen = session => onOpen(session, store);
      socket.open();
      break;
    default:
      return next(action);
  }
  return next(action);
};

export default poloniexSocket;
