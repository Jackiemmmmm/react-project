import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LocaleProvider, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

@connect(state => ({
  antd: state.Intl.antd,
}))

export default class DatePickerComponent extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.antd !== this.props.antd) {
      this.forceUpdate();
    }
  }
  _onChange(e) {
    console.log(e);
  }
  render() {
    const { antd } = this.props;
    return (
      <LocaleProvider locale={antd}>
        <RangePicker onChange={this._onChange} />
      </LocaleProvider>
    );
  }
}
