import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Breadcrumb } from 'antd';
import styles from './styles.css';

export default class BreadcrumbComponent extends PureComponent {
  _renderLocationPathname() {
    const { location } = this.props;
    if (location.pathname === '/') {
      return (
        <Breadcrumb.Item>
          <FormattedMessage id="home" />
        </Breadcrumb.Item>
      );
    }
    const name = location.pathname.split('/');
    return name.reduce((accumulator, currentValue) => {
      if (accumulator) {
        const { length } = accumulator;
        const { key } = length > 0 ? accumulator[length - 1] : accumulator;
        return [
          accumulator,
          <Breadcrumb.Item key={`${key}/${currentValue}`}>
            {this._changePathname(currentValue)}
          </Breadcrumb.Item>,
        ];
      }
      return (
        <Breadcrumb.Item key={currentValue}>
          <Link to={`/${currentValue}`}>
            {this._changePathname(currentValue)}
          </Link>
        </Breadcrumb.Item>
      );
    });
  }
  _changePathname(name) {
    localStorage.setItem('last_visited', name);
    switch (name) {
      case 'tradeSearch':
      case 'allTransition':
      case 'mobiTransition':
      case 'onchainTransition':
      case 'cardTransition':
        return <FormattedMessage id={name} />;
      default:
        return <FormattedMessage id="home" />;
    }
  }
  render() {
    return (
      <Breadcrumb className={styles.layout_breadcrumb}>
        {this._renderLocationPathname()}
      </Breadcrumb>
    );
  }
}
