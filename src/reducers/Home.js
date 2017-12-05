const defaultValue = {
  test: 'default',
};
const Home = (state = defaultValue, action) => {
  switch (action.type) {
    case 'TEST':
      return {
        ...state,
        test: action.test,
      };
    default:
      return state;
  }
};

export default Home;
