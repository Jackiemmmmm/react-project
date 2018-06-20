import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import FormComponent from './form-component';
import TableComponent from './table-component';

@connect(state => ({
  locale: state.Intl.get('locale'),
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
