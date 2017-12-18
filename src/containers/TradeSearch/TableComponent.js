import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import 'file-saver';
import TableExport from 'tableexport';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}];

const data = [];
for (let i = 1, length = 100; i <= length; i += 1) {
  data.push({
    key: i,
    name: 'John Brown',
    age: `${i}2`,
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}

@connect(state => ({
  locale: state.Intl.locale,
}))

export default class TableComponent extends PureComponent {
  _exportCSV = () => {
    TableExport(document.getElementsByClassName('ant-table-body')[0].children[0]);
  }
  render() {
    return (
      <div>
        <Button onClick={this._exportCSV}>Export</Button>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}
