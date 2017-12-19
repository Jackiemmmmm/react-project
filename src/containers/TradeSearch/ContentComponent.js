import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import FormComponent from './FormComponent';
import TableComponent from './TableComponent';

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
        <FormComponent />
        <TableComponent url={url} />
      </div>
    );
  }
}
