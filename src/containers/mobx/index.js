import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import mobxDemo from '../../stores/mobx-demo';
import styles from './styles.css';

@observer
export default class MobxDemo extends Component {
  _up = false;

  _down = false;

  _onChange(e, type) {
    const { updateTotal } = mobxDemo;
    updateTotal(e.target.value, type);
  }

  _checkTotal() {
    const { total, lastTotal } = mobxDemo;
    if (!lastTotal) {
      return null;
    }
    if (total > lastTotal) {
      if (!this._up) {
        this._up = true;
        return styles.up;
      }
      this._up = false;
      return styles.up1;
    }
    if (total < lastTotal) {
      if (!this._down) {
        this._down = true;
        return styles.down;
      }
      this._down = false;
      return styles.down1;
    }
    return null;
  }

  render() {
    const { price, amount, total } = mobxDemo;
    return (
      <div>
        <Link replace to="/">
          Back Button
        </Link>
        <br />
        <input type="number" value={price} onChange={e => this._onChange(e, 'price')} />
        <br />
        <input type="number" value={amount} onChange={e => this._onChange(e, 'amount')} />
        <br />
        <span className={classnames(this._checkTotal(), styles.init)}>
          {total}
        </span>
      </div>
    );
  }
}
