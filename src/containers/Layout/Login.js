import React, { PureComponent } from 'react';
import styles from './styles.css';

export default class Login extends PureComponent {
  componentWillMount() {
    console.log('login in ');
  }
  render() {
    const { login } = this.props;
    return (
      <div className={styles.loginComponent}>
        Please Login in
        <button onClick={login}>Login</button>
      </div>
    );
  }
}
