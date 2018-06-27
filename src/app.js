import React from 'react';
import {
  Route,
  Switch,
  Router,
} from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { createBrowserHistory } from 'history';
import NoMatch from 'containers/no-match';
import Loading from 'components/loading';
// import 'common/common.css';

class AsyncComponent extends React.Component {
  static Component = null;

  constructor(props) {
    super(props);
    this.state = { Component: null };
  }

  componentWillMount() {
    const { Component } = this.state;
    if (!Component) {
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

export const history = createBrowserHistory();

const Home = asyncComponent(() => import(/* webpackChunkName: "Home" */'containers/home').then(module => module.default));
const LinkTest = asyncComponent(() => import(/* webpackChunkName: "Link" */'containers/link').then(module => module.default));
const MobxTest = asyncComponent(() => import(/* webpackChunkName: "Mobx" */'containers/mobx').then(module => module.default));

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/link-test" component={LinkTest} />
      <Route path="/mobx-test" component={MobxTest} />
      <Route exact path="*" component={NoMatch} />
    </Switch>
  </Router>
);

export default hot(module)(App);
