import React, { PureComponent } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { connect } from 'react-redux';
import changeLang from 'actions/Layout';
import styles from './styles.css';

@connect(
  state => ({
    locale: state.Intl.locale,
  }),
  dispatch => ({
    _changeLang: locale => dispatch(changeLang(locale)),
  }),
)

export default class ActionInfo extends PureComponent {
  _languageMenu() {
    const { _changeLang } = this.props;
    return (
      <Menu className={styles.language_menu} onClick={e => _changeLang(e.key)}>
        <Menu.Item key="en">
          English
        </Menu.Item>
        <Menu.Item key="zh">
          中文
        </Menu.Item>
      </Menu>
    );
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
