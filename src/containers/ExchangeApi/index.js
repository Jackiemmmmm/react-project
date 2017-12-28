import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Table, Select } from 'antd';
import axios from 'axios';
import setting from '../../../setting.json';
import { exchange } from '../../mock/Exchange';

const { Option } = Select;

const columns = [{
  title: 'Market',
  dataIndex: 'market',
  key: 'market',
}, {
  title: 'Currency',
  dataIndex: 'id',
  key: 'currency',
}, {
  title: 'Price',
  dataIndex: 'last',
  key: 'price',
}];

const childColumns = [{
  title: 'Market',
  dataIndex: 'market',
  key: 'market',
}, {
  title: 'Price',
  dataIndex: 'last',
  key: 'price',
}, {
  title: 'Change',
  dataIndex: 'change',
  key: 'change',
}];

@connect(
  null,
  dispatch => ({
    _connectApi: () => dispatch({ type: 'CONNECTED' }),
  }),
)

export default class ExchangeApi extends PureComponent {
  state = {
    exchangeData: setting.defaultExchange,
  }
  async componentWillMount() {
    const { data } = await axios.get('http://dev.btcc.com:7001/');
    console.log(data);
  }
  _expandedRowRender = (record) => {
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
