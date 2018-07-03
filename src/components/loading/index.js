import React from 'react';
// import styles from './styles.css';

const Loading = ({ error = false, errorCallBack }) => (
  <div className="dot-wrap">
    {error
      ? (
        <a onClick={errorCallBack}>
          {error}
        </a>
      )
      : <div className="dot-overtaking" />}
  </div>
);

export default Loading;
