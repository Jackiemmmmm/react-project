import React, { PureComponent } from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { IntlProvider, FormattedMessage } from 'react-intl';
import ContentComponent from './ContentComponent';
import styles from './styles.css';
import messages from './messages.json';

const {
  Content, Sider,
} = Layout;

const list = ['allTransition', 'mobiTransition', 'onchainTransition', 'cardTransition'];

@connect(state => ({
  locale: state.Intl.locale,
}))


export default class TradeSearch extends PureComponent {
  _handleClick = (e) => {
    localStorage.setItem('last_visited', e.key);
    this.props.history.push(`/tradeSearch/${e.key}`);
  };

  render() {
    const { match, locale } = this.props;
    const { searchname } = match.params;
    return (
      <Content className={styles.transition_content}>
        <Layout className={styles.transition_layout}>
          <Sider width={200} className={styles.sider}>
            <Menu
              onClick={this._handleClick}
              mode="inline"
              defaultSelectedKeys={[`${searchname}`]}
            >
              {list.map(value => (
                <Menu.Item key={value}><FormattedMessage id={value} /></Menu.Item>
              ))}
            </Menu>
          </Sider>
          <IntlProvider locale={locale} messages={messages[locale]}>
            <ContentComponent url={searchname} />
          </IntlProvider>
        </Layout>
      </Content>
    );
  }
}
