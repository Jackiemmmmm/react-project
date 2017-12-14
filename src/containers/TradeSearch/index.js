import React, { PureComponent } from 'react';
import { Layout, Menu } from 'antd';
import ContentComponent from './ContentComponent';
import styles from './styles.css';

const {
  Content, Sider,
} = Layout;

export default class TradeSearch extends PureComponent {
  _handleClick = (e) => {
    localStorage.setItem('last_visited', e.key);
    this.props.history.push(`/tradeSearch/${e.key}`);
  };

  render() {
    const { match } = this.props;
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
              <Menu.Item key="allTransition">All Transition</Menu.Item>
              <Menu.Item key="mobiTransition">Mobi Transition</Menu.Item>
              <Menu.Item key="onchainTransition">Onchain Transition</Menu.Item>
              <Menu.Item key="cardTransition">Card Transition</Menu.Item>
            </Menu>
          </Sider>
          <ContentComponent url={searchname} />
        </Layout>
      </Content>
    );
  }
}
