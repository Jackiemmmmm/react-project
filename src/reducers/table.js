import { fromJS } from 'immutable';

const defaultValue = fromJS({
  defaultTableList: [],
  tableList: [],
  loading: false,
});
const Home = (state = defaultValue, action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS_LOADING':
      return state.merge({ loading: !state.get('loading') });
    case 'GET_TRANSACTIONS':
      return state.merge({
        tableList: action.data,
        defaultTableList: action.data,
        loading: false,
      });
    default:
      return state;
  }
};

export default Home;
