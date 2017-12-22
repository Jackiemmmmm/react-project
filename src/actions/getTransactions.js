
import { createTime, type, status, fee, currency, phoneFirst, phoneLast } from 'mock/TableComponent';

const random = arr => arr[Math.floor(Math.random() * arr.length)];

const dataTransactions = [];
for (let i = 1, length = Math.floor(Math.random() * 1000); i <= length; i += 1) {
  const insideRandom = Math.random();
  dataTransactions.push({
    key: i,
    createTime: random(createTime),
    mobiTransactions: Math.floor(insideRandom * 1e20).toString() + i,
    type: random(type),
    status: random(status),
    transferAmount: 1000.09,
    fee: random(fee),
    currency: random(currency),
    payer: `${random(phoneFirst)} ${random(phoneLast)}`,
    payerBalance: '0 USD',
    payee: `${random(phoneFirst)} ${random(phoneLast)}`,
    payeeBalance: 1098890.78,
  });
}

const timeout = (api, ms) => (
  new Promise(resolve => setTimeout(() => resolve(api), ms))
);

const getTransactions = url => async (dispatch) => {
  console.log(url);
  dispatch({ type: 'GET_TRANSACTIONS_LOADING' });
  const data = await timeout(dataTransactions, 0);
  dispatch({ type: 'GET_TRANSACTIONS', data });
};

export default getTransactions;
