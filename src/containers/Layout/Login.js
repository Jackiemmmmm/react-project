import React, { PureComponent } from 'react';
import { Button } from 'antd';

export default class Login extends PureComponent {
  componentWillMount() {
    console.log('login in ');
  }
  render() {
    const { login } = this.props;
    return (
      <div>
        Please Login in
        <Button onClick={login}>Login</Button>
      </div>
    );
  }
}
