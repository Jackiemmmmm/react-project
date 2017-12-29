import { exchange } from '../mock/Exchange';

const defaultValue = {
  ticker: exchange,
};
const Tickers = (state = defaultValue, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default Tickers;
