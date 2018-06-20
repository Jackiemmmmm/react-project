import Raven from 'raven-js';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, combineReducers } from 'redux'; // compose,
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import reducers from './reducers';
import createRavenMiddleware from './createRavenMiddleware';
// import dealerSocket from './middleware/dealerSocket';
import { RAVEN_DSN } from '../setting.json';

const prod = process.env.ENV === 'prod';

const create = (typeof window !== 'undefined' && window.devToolsExtension && !prod)
  ? window.devToolsExtension({ actionsBlacklist: ['@@redux-form'] })(createStore)
  : createStore;

export const history = createBrowserHistory();

const middleware = routerMiddleware(history);

let newMiddleware = applyMiddleware(thunk, middleware); //  dealerSocket,
if (prod && RAVEN_DSN) {
  Raven.config(RAVEN_DSN).install();
  newMiddleware = applyMiddleware(
    thunk,
    middleware,
    createRavenMiddleware(Raven, {}),
    // dealerSocket,
  );
}

const createArgs = connectRouter(history)(combineReducers({ ...reducers }));
export const store = newMiddleware(create)(createArgs);
