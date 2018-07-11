import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import { ListItem } from 'react-native-elements'

class ListRestaurant extends Component {
  onRowPress() {
    Actions.employeeEdit({ employee: this.props.restaurant_list });
  }

  render() {
    const { name, location, image_url, id } = this.props.restaurant_list;


    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
				<ListItem
						roundAvatar
						key={id}
						title={name}
						subtitle={location.address1}
						avatar={{uri: image_url}}
						onPress={this.onRowPress}
					/>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default ListRestaurant;