import React, { PureComponent } from 'react';
import { IntlProvider, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, LocaleProvider } from 'antd';
import Breadcrumb from './breadcrumb';
import Login from './login';
import ActionInfo from './action-info';
import styles from './styles.css';
import messages from './messages';
// TODO: 为侧边栏多层嵌套数组提供案例
const {
  Sider, Header,
} = Layout;

const list = [
  { key: '/', icon: 'user', id: 'home' },
  { key: '/tradeSearch', icon: 'desktop', id: 'tradeSearch' },
  { key: '/mobx', icon: 'desktop', id: 'mobx' },
];

@connect(state => ({
  locale: state.Intl.get('locale'),
  antd: state.Intl.get('antd'),
}))

class LayoutComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }
  componentWillMount() {
    this.setState({ isLogin: localStorage.getItem('isLogin') });
  }
  _handleClick = e => this.props.history.push(e.key);
  _login = () => {
    localStorage.setItem('isLogin', true);
    this.setState({ isLogin: true });
  };
  _listRender = ({ key, icon, id }) => (
    <Menu.Item key={key}>
      <Icon type={icon} />
      <FormattedMessage id={id} />
    </Menu.Item>
  )
  render() {
    const {
      children, locale, location, antd,
    } = this.props;
    const { isLogin } = this.state;
    const selectName = location.pathname.split('/')[1];
    if (!isLogin) {
      return <Login login={this._login} />;
    }
    return (
      <LocaleProvider locale={antd}>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <Layout className={styles.layout}>
            <Sider
              className={styles.sider}
              collapsible
            >
              <div className={styles.logo} />
              <Menu
                onClick={this._handleClick}
                selectedKeys={[`/${selectName}`]}
                mode="inline"
                theme="dark"
              >
                {list.map(this._listRender)}
              </Menu>
            </Sider>
            <Layout>
              <Header className={styles.layout_header}>
                <Breadcrumb {...this.props} />
                <ActionInfo />
              </Header>
              {children}
            </Layout>
          </Layout>
        </IntlProvider>
      </LocaleProvider>
    );
  }
}

export default withRouter(LayoutComponent);
