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
    case 'CRUSH_IN_THE_REDUCER':
      throw new Error('Crash Test send');
    default:
      return state;
  }
};

export default Home;
