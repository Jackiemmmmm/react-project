
const defaultValue = {
  defaultTableList: [],
  tableList: [],
  loading: false,
};
const Home = (state = defaultValue, action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS_LOADING':
      return {
        ...state,
        loading: !state.loading,
      };
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        tableList: action.data,
        defaultTableList: action.data,
        loading: false,
      };
    default:
      return state;
  }
};

export default Home;
