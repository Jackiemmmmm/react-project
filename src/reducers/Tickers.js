
import { PUB_WS } from 'actions/publicSocket';
// import { Map } from 'immutable';
// import { exchange } from '../mock/Exchange';

const defaultValue = {
  ticker: {},
};
// Map({ ticker: {} });

const Tickers = (state = defaultValue, action) => {
  switch (action.type) {
    case PUB_WS:
      return {
        ...state,
        ticker: action.msg,
      };
    // return state.merge('ticker', action.msg);
    default:
      return state;
  }
};

export default Tickers;
