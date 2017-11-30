import React, { PureComponent } from 'react';
import styles from './styles.css';

export default class Demo extends PureComponent {
  componentWillMount() {
    console.log('test');
  }
  render() {
    return (
      <div className={styles.test}>demo</div>
    );
  }
}
