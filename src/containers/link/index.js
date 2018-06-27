import React, { PureComponent } from 'react';
import { Route, Link } from 'react-router-dom';
import Test1 from './test1';

export default class LinkTest extends PureComponent {
  render() {
    console.log(this.props);
    const { match: { path } } = this.props;
    return (
      <div>
        Link page
        <br />
        <Link to={`${path}/test1`}>Show Test1 Page</Link>
        <br />
        <Route exact path={`${path}/:id`} component={Test1} />
      </div>
    );
  }
}
