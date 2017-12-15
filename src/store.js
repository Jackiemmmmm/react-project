import Raven from 'raven-js';
import { createBrowserHistory } from 'history';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import reducers from './reducers';
import createRavenMiddleware from './createRavenMiddleware';

const prod = process.env.ENV === 'prod';
const RAVEN_DSN = 'http://9cda3aff14d3424e942c870f60022e4c@10.0.22.42:9000/2';

const create = (typeof window !== 'undefined' && window.devToolsExtension)
  ? window.devToolsExtension({ actionsBlacklist: ['@@redux-form'] })(createStore)
  : createStore;

export const history = createBrowserHistory();

const middleware = routerMiddleware(history);

let newMiddleware = applyMiddleware(thunk, middleware);
if (prod) {
  Raven.config(RAVEN_DSN).install();
  newMiddleware = applyMiddleware(thunk, middleware, createRavenMiddleware(Raven, {}));
}

export const store = newMiddleware(create)(combineReducers({
  ...reducers,
  router: routerReducer,
}));
