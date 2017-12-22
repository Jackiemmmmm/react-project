import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

@connect(
  null,
  dispatch => ({
    _connectApi: () => dispatch({ type: 'CONNECTED' }),
  }),
)

export default class ExchangeApi extends PureComponent {
  componentWillMount() {
    // const { _connectApi } = this.props;
    // _connectApi();
  }
  render() {
    return (
      <div>Table</div>
    );
  }
}
