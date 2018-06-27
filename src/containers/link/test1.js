import React, { PureComponent } from 'react';

export default class Test1 extends PureComponent {
  render() {
    const { match: { params: { id } } } = this.props;
    return (
      <div>
        Test1 ___
        {id}
      </div>
    );
  }
}
