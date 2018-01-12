import React, { PureComponent } from 'react';

class NoMatch extends PureComponent {
  state = {
    time: 3,
  }
  componentWillMount() {
    for (let i = 1; i < 4; i += 1) {
      setTimeout(() => {
        const { time } = this.state;
        this.setState({ time: time - 1 });
      }, i * 1000);
    }
    setTimeout(() => {
      this.props.history.replace('/');
    }, 3000);
  }
  render() {
    return (
      <div>
        404
        <br />
        {`${this.state.time}s later will go back`}
      </div>
    );
  }
}

export default NoMatch;
