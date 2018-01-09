import React, { PureComponent } from 'react';
import { IntlProvider } from 'react-intl';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Login from './Login';
import messages from './messages';

@connect(state => ({
  locale: state.Intl.get('locale'),
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

  render() {
    const {
      children, locale,
    } = this.props;
    const { isLogin } = this.state;
    // const selectName = location.pathname.split('/')[1];
    if (!isLogin) {
      return <Login login={this._login} />;
    }
    return (
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    );
  }
}

export default withRouter(LayoutComponent);
