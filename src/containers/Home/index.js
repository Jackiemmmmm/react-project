import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pagination, DatePicker } from 'antd';
import { demoTest } from 'actions/Demo';
import DatePickerTest from 'components/DatePicker';
import styles from './styles.css';

const { RangePicker } = DatePicker;


@connect(
  state => ({
    test: state.Home.test,
  }),
  dispatch => ({
    _getTest: () => dispatch(demoTest()),
  }),
)

export default class Home extends PureComponent {
  componentWillMount() {
    console.log(this.props.test);
  }
  render() {
    const { test, _getTest } = this.props;
    return (
      <div className={styles.test}>
        Home
        <Link to="/tradeSearch/allTransition">To Trade Search</Link>
        <br />
        <Pagination defaultCurrent={1} total={50} showSizeChanger />
        <br />
        <RangePicker />
        <br />
        <DatePickerTest />
        <br />
        {test}
        <button onClick={() => _getTest()}>Change reducer</button>
      </div>
    );
  }
}
