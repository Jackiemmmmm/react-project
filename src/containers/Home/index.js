import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { demoTest, crashButton } from 'actions/Demo';
import styles from './styles.css';

@connect(
  state => ({
    test: state.Home.get('test'),
  }),
  dispatch => ({
    _getTest: () => dispatch(demoTest()),
    _crashButton: () => dispatch(crashButton()),
  }),
)

export default class Home extends PureComponent {
  componentWillMount() {
    console.log(this.props.test);
  }
  render() {
    const { test, _getTest, _crashButton } = this.props;
    return (
      <div className={styles.test}>
        Home
        <Link to="/demo1">To Demo 1</Link>
        <br />
        {test}
        <button onClick={() => _getTest()}>Change reducer</button>
        <br />
        <button onClick={() => _crashButton()}>Crash reducer</button>
      </div>
    );
  }
}
