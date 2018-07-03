import React, { PureComponent } from 'react';
import styles from './styles.css';

class NoMatch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      time: 5,
    };
    this.timeout = null;
    this.renderTimeout = null;
  }

  componentWillMount() {
    const { history } = this.props;
    for (let i = 1; i < 6; i += 1) {
      this.renderTimeout = setTimeout(() => {
        const { time } = this.state;
        this.setState({ time: time - 1 });
      }, i * 1000);
    }
    this.timeout = setTimeout(() => {
      history.replace('/');
    }, 6000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    clearTimeout(this.renderTimeout);
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        <br />
        <div className={styles.container}>
          <div className={styles['boo-wrapper']}>
            <div className={styles.boo}>
              <div className={styles.face} />
            </div>
            <div className={styles.shadow} />

            <h1>
              Whoops!
            </h1>
            <p>
              We couldn&apos;t find the page you were looking for.
              <br />

              {`${time}s later will go back`}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default NoMatch;
