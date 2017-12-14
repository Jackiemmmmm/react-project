import React, { PureComponent } from 'react';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['系统退款', 'Mobi 转账', '币种兑换', '兑换撤销', '推特发送', '推特退款', '预付卡快递费', '预付卡月费', 'Onchain 收币', 'Onchain 发币', '预付卡交易', '预付卡充值'];

export default class ContentComponent extends PureComponent {
  state = {
    checkedList: [],
    checkAll: false,
  };
  componentWillMount() {
    console.log('Content Component');
  }
  _onChange = (checkedList) => {
    this.setState({
      checkedList,
      checkAll: checkedList.length === plainOptions.length,
    });
  }
  _onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      checkAll: e.target.checked,
    });
  }
  render() {
    const { url } = this.props;
    const { checkAll, checkedList } = this.state;
    return (
      <div>
        Content Component {url}
        <div>
          <Checkbox
            onChange={this._onCheckAllChange}
            checked={checkAll}
          >
            全部
          </Checkbox>
          <CheckboxGroup
            options={plainOptions}
            value={checkedList}
            onChange={this._onChange}
          />
        </div>
      </div>
    );
  }
}
