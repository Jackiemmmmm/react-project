import ReactDOM from 'react-dom';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
// import Demo from 'containers/Demo';
// import Demo1 from 'containers/Demo1';
import NoMatch from 'containers/NoMatch';
import Provider from './provider';

function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
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
  };
}
/* global System */
const Demo = asyncComponent(() => (
  System.import(/* webpackChunkName: "Demo" */'containers/Demo').then(module => module.default)
));
const Demo1 = asyncComponent(() => (
  System.import(/* webpackChunkName: "Demo1" */'containers/Demo1').then(module => module.default)
));

ReactDOM.render(
  <Provider>
    <Router>
      <Switch>
        <Route exact path="/" component={Demo} />
        <Route path="/demo1" component={Demo1} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
