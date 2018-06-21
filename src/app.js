import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { hot } from 'react-hot-loader';
import NoMatch from 'containers/no-match';
import Loading from 'components/loading';
import Layout from 'containers/layout';
// import 'common/common.css';

class AsyncComponent extends React.Component {
  static Component = null;
  constructor(props) {
    super(props);
    this.state = { Component: null };
  }
  componentWillMount() {
    if (!this.state.Component) {
      this._rerenderComponent();
    }
  }
  componentWillReceiveProps() {
    if (module.hot) {
      setImmediate(() => this._rerenderComponent());
    }
  }
  _rerenderComponent() {
    const { getComponent } = this.props;
    return getComponent().then((Component) => {
      this.setState({ Component });
    }, () => {
      this.setState({ Component: NoMatch });
    });
  }
  render() {
    const { Component } = this.state;
    if (Component) {
      return <Component {...this.props} />;
    }
    return <Loading />;
  }
}

const asyncComponent = getComponent => props => (
  <AsyncComponent getComponent={getComponent} {...props} />
);

const Home = asyncComponent(() => import(/* webpackChunkName: "Asset" */'containers/home').then(module => module.default));
const TradeSearch = asyncComponent(() => import(/* webpackChunkName: "Trade" */'containers/trade-search').then(module => module.default));
const Mobx = asyncComponent(() => import(/* webpackChunkName: "Mobx" */'containers/mobx').then(module => module.default));

const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/tradeSearch/:searchname" component={TradeSearch} />
      <Route exact path="/mobx" component={Mobx} />
      <Redirect from="/tradeSearch" to="/tradeSearch/allTransition" />
    </Switch>
  </Layout>
);

export default hot(module)(App);
