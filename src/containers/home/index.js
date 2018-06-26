import React, { PureComponent } from 'react';
// import { connect } from 'react-redux';
import { Pagination, DatePicker } from 'antd';
import styles from './styles.css';

const { RangePicker } = DatePicker;

let forceRerender = 0;

// @connect(
//   state => ({
//     test: state.Home.get('test'),
//   }),
//   dispatch => ({
//     _getTest: () => dispatch(demoTest()),
//     _crashButton: () => dispatch(crashButton()),
//   }),
// )

export default class Home extends PureComponent {
  componentWillMount() {
    console.log(this.props.test);
  }
  render() {
    // const { test, _getTest, _crashButton } = this.props;
    forceRerender += 1;
    return (
      <div className={styles.test}>
        Home
        <br />
        <Pagination defaultCurrent={1} total={50} showSizeChanger />
        <br />
        Range Picker: <RangePicker key={forceRerender} />
        <br />
        {/* {test} */}
        {/* <button onClick={() => _getTest()}>Change reducer</button>
        <br />
        <button onClick={() => _crashButton()}>Crash reducer</button> */}
      </div>
    );
  }
}
