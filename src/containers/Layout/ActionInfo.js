import React, { PureComponent } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { connect } from 'react-redux';
import changeLang from 'actions/Layout';
import moment from 'moment';
import styles from './styles.css';

@connect(
  state => ({
    locale: state.Intl.get('locale'),
  }),
  dispatch => ({
    _changeLang: locale => dispatch(changeLang(locale)),
  }),
)

export default class ActionInfo extends PureComponent {
  componentWillMount() {
    const { locale } = this.props;
    moment.locale(locale === 'en' ? 'en' : 'zh-cn');
  }
  _languageMenu() {
    return (
      <Menu className={styles.language_menu} onClick={this._onClickButton}>
        <Menu.Item key="en">
          English
        </Menu.Item>
        <Menu.Item key="zh">
          中文
        </Menu.Item>
      </Menu>
    );
  }
  _onClickButton = (e) => {
    const { _changeLang, locale } = this.props;
    if (locale === e.key) return;
    moment.locale(e.key === 'en' ? 'en' : 'zh-cn');
    _changeLang(e.key);
  }
  render() {
    const { locale } = this.props;
    return (
      <div>
        <Dropdown overlay={this._languageMenu()} trigger={['click']}>
          <Button className={styles.language_menu}>{locale === 'zh' ? '中文' : 'English'}</Button>
        </Dropdown>
      </div>
    );
  }
}
