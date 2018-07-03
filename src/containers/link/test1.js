import React, { PureComponent } from 'react';
import styles from './styles.css';

export default class Test1 extends PureComponent {
  render() {
    const { match: { params: { id } } } = this.props;
    return (
      <div className={styles.test1_wrap}>
        Test1 ___
        {id}
      </div>
    );
  }
}
