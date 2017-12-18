import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Checkbox, DatePicker, Form, Input, Select, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from './messages.json';

const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;

let forceRerender = 0;

@Form.create()

@connect(state => ({
  locale: state.Intl.locale,
}))

export default class FormComponent extends PureComponent {
  _handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  _handleReset = () => this.props.form.resetFields();
  _renderSelectCurrency = () => {
    const { locale } = this.props;
    const { selectPlaceholder } = messages[locale];
    return (
      this._selectRender(['usd', 'btc'], {
        mode: 'tags',
        style: { width: '100%' },
        placeholder: selectPlaceholder,
      })
    );
  }
  _selectRender = (arr, { mode = 'default', style, placeholder = '' }) => (
    <Select mode={mode} style={style} placeholder={placeholder}>
      {arr.map(key => <Select.Option key={key} value={key}>{key}</Select.Option>)}
    </Select>
  )
  _prefixSelector = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      getFieldDecorator('prefix', {
        initialValue: '86',
      })(this._selectRender(['86', '87'], {}))
    );
  }
  render() {
    const { locale, form } = this.props;
    const {
      all, systemRefund, mobiTransfer, currencyExchange, exchangeCanceled,
      twitterSent, twiiterRefunds, prepaidCardCourierFee, prepaidCardMonthlyFee,
      onchainReceive, onchainSent, prepaidCardTransactions, prepaidCardDeposit, exchangeID,
    } = messages[locale];
    const { getFieldDecorator } = form;
    const formItemFirstLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 4 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 20 } },
    };
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 8 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 24, offset: 0 },
      },
    };
    forceRerender += 1;
    return (
      <Form layout="inline" onSubmit={this._handleSearch} style={{ padding: '10px' }}>
        <Form.Item
          {...formItemFirstLayout}
          label={<FormattedMessage id="exchangeTypeLabel" />}
        >
          {getFieldDecorator('checkboxValues')(<CheckboxGroup
            options={[all, systemRefund, mobiTransfer, currencyExchange, exchangeCanceled,
              twitterSent, twiiterRefunds, prepaidCardCourierFee, prepaidCardMonthlyFee,
              onchainReceive, onchainSent, prepaidCardTransactions, prepaidCardDeposit]}
          />)}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={<FormattedMessage id="searchItemLabel" />}
          style={{ width: '50%', margin: 0 }}
        >
          {getFieldDecorator('rangePickerValues')(<RangePicker key={forceRerender} />)}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={<FormattedMessage id="exchangeLabel" />}
          style={{ width: '50%', margin: 0 }}
        >
          {getFieldDecorator('exchangeID')(<Input placeholder={exchangeID} />)}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={<FormattedMessage id="selectCurrencyLabel" />}
          style={{ width: '50%', margin: 0 }}
        >
          {getFieldDecorator('selectCurrencyValues')(this._renderSelectCurrency())}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={<FormattedMessage id="phoneNumberLabel" />}
          style={{ width: '50%', margin: 0 }}
        >
          {getFieldDecorator('phoneNumberValues')(<Input addonBefore={this._prefixSelector()} style={{ width: '100%' }} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout} style={{ width: '100%', textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            <FormattedMessage id="search" />
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={this._handleReset}>
            <FormattedMessage id="clear" />
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
