import Raven from 'raven-js';
import { createBrowserHistory } from 'history';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import reducers from './reducers';
import createRavenMiddleware from './createRavenMiddleware';
import publicSocket from './middleware/publicSocket';
import { RAVEN_DSN } from '../setting.json';

const prod = process.env.ENV === 'prod';

const create = (typeof window !== 'undefined' && window.devToolsExtension)
  ? window.devToolsExtension({ actionsBlacklist: ['@@redux-form'] })(createStore)
  : createStore;

export const history = createBrowserHistory();

const middleware = routerMiddleware(history);

let newMiddleware = applyMiddleware(thunk, middleware, publicSocket);
if (prod && RAVEN_DSN) {
  Raven.config(RAVEN_DSN).install();
  newMiddleware = applyMiddleware(
    thunk,
    middleware,
    createRavenMiddleware(Raven, {}),
    publicSocket,
  );
}

export const store = newMiddleware(create)(combineReducers({
  ...reducers,
  router: routerReducer,
}));
