import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { foodFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.foodFetch();
    console.log(this.props, 'List component mounted')
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props
    console.log(nextProps, 'List component mounted NEXT PROPS')
    this.createDataSource(nextProps);
  }

  createDataSource({ selected_food }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(selected_food);
  }

  renderRow(employee) {
    return <ListItem employee={employee} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  const selected_food = _.map(state.selected_food, (val, uid) => {
    return { ...val, uid };
  });

  return { selected_food };
};

export default connect(mapStateToProps, { foodFetch })(EmployeeList);