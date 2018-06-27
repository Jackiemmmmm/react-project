import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class MobxDemo extends PureComponent {
  render() {
    return (
      <div>
        <Link replace to="/">Back Button</Link>
        <br />
        Mobx Demo
      </div>
    );
  }
}
