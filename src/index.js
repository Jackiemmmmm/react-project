import ReactDOM from 'react-dom';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Demo from 'containers/Demo';
import Demo1 from 'containers/Demo1';
import NoMatch from 'containers/NoMatch';
import Provider from './provider';

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
