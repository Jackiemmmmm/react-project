import React from 'react';
import { Provider, connect } from 'react-redux';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import { addLocaleData, IntlProvider } from 'react-intl';
// import { Router } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from './store';

addLocaleData([...en, ...zh]);


const mapStateToProps = state => ({
  locale: state.Intl.get('locale'),
});

const ConnectIntlProvider = connect(mapStateToProps)(IntlProvider);

const ProviderWrapper = ({ children }) => (
  <Provider store={store}>
    <ConnectIntlProvider>
      <ConnectedRouter history={history}>
        {children}
      </ConnectedRouter>
    </ConnectIntlProvider>
  </Provider>
);

export default ProviderWrapper;
