import ReactDOM from 'react-dom';
import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
// import NoMatch from 'containers/NoMatch';
import Layout from 'containers/Layout';
import Provider from './provider';

const asyncComponent = getComponent => (
  class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then((Component) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }
    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  }
);

/* global System */
const Home = asyncComponent(() => (
  System.import(/* webpackChunkName: "Home" */'containers/Home').then(module => module.default)
));
const TradeSearch = asyncComponent(() => (
  System.import(/* webpackChunkName: "TradeSearch" */'containers/TradeSearch').then(module => module.default)
));
const ExchangeApi = asyncComponent(() => (
  System.import(/* webpackChunkName: "ExchangeApi" */'containers/ExchangeApi').then(module => module.default)
));

ReactDOM.render(
  <Provider>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/tradeSearch/:searchname" component={TradeSearch} />
        <Route exact path="/exchange" component={ExchangeApi} />
        <Redirect from="/tradeSearch" to="/tradeSearch/allTransition" />
      </Switch>
    </Layout>
  </Provider>,
  document.getElementById('app'),
);

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  require('offline-plugin/runtime').install();
}
