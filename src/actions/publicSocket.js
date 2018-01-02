export const PUB_WS = 'PUB_WS';

export const globalWS = msg => (dispatch) => {
  // const { Tickers } = getState;  , getState
  const exchange = {};
  for (let i = 0, len = msg.length; i < len; i += 1) {
    const val = msg[i];
    exchange[val.exchange] = Object.values(val.data);
  }
  console.log(exchange.binance.length);
  dispatch({ type: PUB_WS, msg: exchange });
};

export default globalWS;
