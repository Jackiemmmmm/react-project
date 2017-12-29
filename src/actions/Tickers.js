import axios from 'axios';

export const getTickerApi = () => async () => {
  const { data } = await axios.get('http://dev.btcc.com:7001/');
  console.log(data);
};

export default getTickerApi;
