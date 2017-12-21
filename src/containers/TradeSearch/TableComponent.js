import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Table, Button } from 'antd';
import 'file-saver';
import TableExport from 'tableexport';
import getTransactions from 'actions/getTransactions';
import stringifyVolumn from 'utils/format';
import antd from './styles.less';

const columns = [{
  title: <FormattedMessage id="createTime" />,
  dataIndex: 'createTime',
}, {
  title: <FormattedMessage id="mobiTransactions" />,
  dataIndex: 'mobiTransactions',
}, {
  title: <FormattedMessage id="type" />,
  dataIndex: 'type',
  render: text => <FormattedMessage id={text} />,
}, {
  title: <FormattedMessage id="status" />,
  dataIndex: 'status',
  render: text => <FormattedMessage id={text} />,
}, {
  title: <FormattedMessage id="transferAmount" />,
  dataIndex: 'transferAmount',
  render: text => stringifyVolumn(text),
}, {
  title: <FormattedMessage id="fee" />,
  dataIndex: 'fee',
}, {
  title: <FormattedMessage id="currency" />,
  dataIndex: 'currency',
}, {
  title: <FormattedMessage id="payer" />,
  dataIndex: 'payer',
}, {
  title: <FormattedMessage id="payerBalance" />,
  dataIndex: 'payerBalance',
  render: text => stringifyVolumn(text),
}, {
  title: <FormattedMessage id="payee" />,
  dataIndex: 'payee',
}, {
  title: <FormattedMessage id="payeeBalance" />,
  dataIndex: 'payeeBalance',
  render: text => stringifyVolumn(text),
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
    // const { data } = this.props;
    // if (data === null || !data.length) return;
    // let csvContent = 'data:text/csv;charset=utf-8,';
    // csvContent += `${Object.keys(data[0]).join(',')}\r\n`;
    // for (let i = 0, len = data.length; i < len; i += 1) {
    //   const numberToString =
    // Object.values(data[i]).map(v => (typeof v === 'string' ? v : v.toString()));
    //   const row = numberToString.join(',');
    //   console.log(row);
    //   csvContent += `${row}\r\n`;
    // }
    // const encodedUri = encodeURI(csvContent);
    // window.open(encodedUri);
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
