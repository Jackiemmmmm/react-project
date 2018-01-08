import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Table, Select } from 'antd';
import { getTickerApi } from 'actions/Tickers';
import setting from '../../../setting.json';

const { Option } = Select;

const columns = [{
  title: 'Market',
  dataIndex: 'market',
  key: 'market',
}, {
  title: 'Currency',
  dataIndex: 'trade_pair',
  key: 'currency',
}, {
  title: 'Price',
  dataIndex: 'sell_one',
  key: 'price',
}];

const childColumns = [{
  title: 'Market',
  dataIndex: 'trade_pair',
  key: 'market',
}, {
  title: 'Price',
  dataIndex: 'sell_one',
  key: 'price',
}, {
  title: 'Change',
  dataIndex: 'change',
  key: 'change',
}];

@connect(
  state => ({
    exchange: state.Tickers.ticker,
  }),
  dispatch => ({
    getTicker: () => dispatch(getTickerApi()),
    connectWS: () => dispatch({ type: 'CONNECTED' }),
    disconnectWS: () => dispatch({ type: 'DISCONNECT' }),
  }),
)

export default class ExchangeApi extends PureComponent {
  state = {
    exchangeData: setting.defaultExchange,
  }
  componentWillMount() {
    this.props.getTicker();
    this.props.connectWS();
  }
  componentWillUnmount() {
    this.props.disconnectWS();
  }
  _expandedRowRender = (record) => {
    const { exchange } = this.props;
    const newExchange = Object.assign({}, exchange, {
      [this.state.exchangeData]: [],
    });
    const n = [];
    for (let i = 0, len = Object.values(newExchange).length; i < len; i += 1) {
      Object.values(newExchange)[i].filter((val) => {
        const m = val;
        if (m.id === record.id) {
          m.key = i;
          m.market = Object.keys(newExchange)[i];
          m.change = Number(record.last) - Number(val.last);
          return n.push(val);
        }
        return false;
      });
    }
    const data = n;
    return (
      <Table
        columns={childColumns}
        dataSource={data}
        pagination={false}
      />
    );
  }
  _selectHandleChange = v => this.setState({ exchangeData: v });

  _exchangeData = (exchangeData) => {
    const { exchange } = this.props;
    if (Object.keys(exchange).length === 0) return [];
    const data = [];
    for (let i = 0, len = exchange[exchangeData].length; i < len; i += 1) {
      exchange[exchangeData][i].key = i;
      exchange[exchangeData][i].market = exchangeData;
      data.push(exchange[exchangeData][i]);
    }
    return data;
  }
  render() {
    const { exchangeData } = this.state;
    return (
      <div>
        Table
        <br />
        <Select
          defaultValue={exchangeData}
          style={{ width: 120 }}
          onChange={this._selectHandleChange}
        >
          {setting.exchange.map(v => <Option key={v} value={v}>{v}</Option>)}
        </Select>
        <Table
          columns={columns}
          dataSource={this._exchangeData(exchangeData)}
          expandedRowRender={this._expandedRowRender}
        />
      </div>
    );
  }
}
