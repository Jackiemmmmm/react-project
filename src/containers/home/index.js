import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';


export default class Home extends PureComponent {
  render() {
    return (
      <div className={styles.test}>
        Home
        <br />
        Link Demo: <Link to="/link-test">Link test page</Link>
        <br />
        Mobx Demo: <Link to="/mobx-test">Mobx test Page</Link>
        <br />
      </div>
    );
  }
}
