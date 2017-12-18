import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import FormComponent from './FormComponent';

@connect(state => ({
  locale: state.Intl.locale,
}))

export default class ContentComponent extends PureComponent {
  componentWillMount() {
    console.log('Content Component');
  }
  render() {
    const { url } = this.props;
    return (
      <div>
        Content Component {url}
        <FormComponent />
      </div>
    );
  }
}
