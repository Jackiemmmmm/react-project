import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import { addLocaleData } from 'react-intl';
import { store, history } from './store';

addLocaleData([...en, ...zh]);

const ProviderWrapper = ({ children }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {children}
    </ConnectedRouter>
  </Provider>
);

export default ProviderWrapper;
