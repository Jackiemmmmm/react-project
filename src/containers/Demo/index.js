import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { demoTest } from 'actions/Demo';
import styles from './styles.css';

@connect(
  state => ({
    test: state.Home.test,
  }),
  dispatch => ({
    _getTest: () => dispatch(demoTest()),
  }),
)

export default class Demo extends PureComponent {
  componentWillMount() {
    console.log('Demo');
  }
  render() {
    const { test, _getTest } = this.props;
    return (
      <div className={styles.test}>
        demo
        <Link to="/demo1">To Demo 1</Link>
        <br />
        {test}
        <button onClick={() => _getTest()}>Change reducer</button>
      </div>
    );
  }
}
