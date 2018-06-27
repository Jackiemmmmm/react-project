import React, { PureComponent } from 'react';

class NoMatch extends PureComponent {
  state = {
    time: 3,
  }

  componentWillMount() {
    const { history } = this.props;
    setTimeout(() => {
      history.goBack();
    }, 3000);
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        404
        <br />
        {`${time}s later will go back`}
      </div>
    );
  }
}

export default NoMatch;
