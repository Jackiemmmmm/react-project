import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';


export default class Home extends PureComponent {
  componentWillMount() {
    console.log(this.props.test);
  }
  render() {
    return (
      <div className={styles.test}>
        Home
        <br />
        <Link to="/link-test">Link test page</Link>
        <br />
      </div>
    );
  }
}
