
import { PUB_WS } from 'actions/publicSocket';
// import { exchange } from '../mock/Exchange';

const defaultValue = {
  ticker: {},
};
const Tickers = (state = defaultValue, action) => {
  switch (action.type) {
    case PUB_WS:
      return {
        ...state,
        ticker: action.msg,
      };
    default:
      return state;
  }
};

export default Tickers;
