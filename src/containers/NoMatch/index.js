import React, { PureComponent } from 'react';

class NoMatch extends PureComponent {
  state = {
    time: 3,
  }
  componentWillMount() {
    setTimeout(() => {
      this.props.history.goBack();
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
