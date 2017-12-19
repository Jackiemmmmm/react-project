import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import 'file-saver';
import TableExport from 'tableexport';
import getTransactions from 'actions/getTransactions';
import antd from './styles.less';
import messages from './messages.json';

const columns = [{
  title: 'Create Time',
  dataIndex: 'createTime',
}, {
  title: 'Mobi Transactions',
  dataIndex: 'mobiTransactions',
}, {
  title: 'Type',
  dataIndex: 'type',
}, {
  title: 'Status',
  dataIndex: 'status',
}, {
  title: 'Amount',
  dataIndex: 'transferAmount',
}, {
  title: 'Fee',
  dataIndex: 'fee',
}, {
  title: 'Currency',
  dataIndex: 'currency',
}, {
  title: 'Payer',
  dataIndex: 'payer',
}, {
  title: 'Payer Balance',
  dataIndex: 'payerBalance',
}, {
  title: 'Payee',
  dataIndex: 'payee',
}, {
  title: 'Payee Balance',
  dataIndex: 'payeeBalance',
}];


@connect(
  state => ({
    locale: state.Intl.locale,
    data: state.Table.tableList,
    loading: state.Table.loading,
  }),
  dispatch => ({
    _getTransactions: url => dispatch(getTransactions(url)),
  }),
)

export default class TableComponent extends PureComponent {
  componentWillMount() {
    const { _getTransactions, url } = this.props;
    _getTransactions(url);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.props.url) {
      console.log(nextProps.url);
    }
  }
  _exportCSV = () => {
    const table = TableExport(document.getElementsByClassName('ant-table-body')[0].children[0], {
      formats: ['csv'],
      exportButtons: false,
    }).getExportData();
    console.log(table);
  }
  render() {
    const { data, loading } = this.props;
    return (
      <div className={antd.tableComponent}>
        <div>
          <Button onClick={this._exportCSV}>Export</Button>
          数据条目：{data.length}
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          loading={loading}
        />
      </div>
    );
  }
}
