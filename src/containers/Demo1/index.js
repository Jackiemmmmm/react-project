import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { DatePicker, version } from 'antd';

class Demo1 extends PureComponent {
  componentWillMount() {
    console.log('Demo1', version);
  }
  render() {
    return (
      <div>
        demo1
        <Link to="/">To Demo</Link>
        <br />
        <br />
        <Link to="/test">No match</Link>
        <br />
        <br />
        <button onClick={() => this.props.history.push('/')}>Test</button>
        <br />
        <br />
        <DatePicker />
      </div>
    );
  }
}

export default Demo1;
