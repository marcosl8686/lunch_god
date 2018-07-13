import _ from 'lodash';
import React, {Component} from 'react';
import {Text, ListView, View, Linking } from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import {foodUpdate, foodCreate, foodFetch} from '../actions';
import {Card, CardSection, Button} from './common';
import EmployeeForm from './EmployeeForm';
import moment from 'moment';
import ListRestaurant from './ListRestaurant';
import { List, ListItem, Icon } from 'react-native-elements'

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)

class FoodCreate extends Component {
	state = { showResults: false };

	componentWillMount() {
		console.log(this.props, "Create props")
    this.props.foodFetch();
		_.each(this.props.employee, (value, prop) => {
			this.props.foodUpdate({prop, value});
		});
		
  }

	onButtonPress() {
		console.log(this.props, "ONPRESS STATE")
		const {name, food_type, shift} = this.props;
		const {location, image_url, rating, url} = this.props.employee;
		const M_rating = 0,
					L_rating = 0,
					P_rating = 0,
					A_rating = 0,
					M_comment ='',
					L_comment = '',
					P_comment = '',
					A_comment = ''
		
		console.log(location, "location")
		console.log(image_url, "image url")
		console.log(rating, "rating")
		this.props.foodCreate({name,food_type,shift: shift || this.props.selected_day, location, image_url,rating, M_rating, L_rating, P_rating, A_rating, url, M_comment, L_comment, P_comment, A_comment });
	}

	render() {
		return(
		 <Card>
			<EmployeeForm {...this.props}/>
		 	<CardSection>
		 		<Button onPress={this.onButtonPress.bind(this)}>
		 			Create
		 		</Button>
		 	</CardSection>
		 	<CardSection style={{alignItems:'center'}}>
		 		<Icon
					raised
					name='yelp'
					type='material-community'
					color='#d32323'
					onPress={() => Linking.openURL(this.props.employee.url)} />
		 	</CardSection>
		 </Card>
		);
	}
}


const mapStateToProps = (state) => {
	const {name, food_type, shift} = state.foodForm;
	console.log(state, "STATE AT CREATE")
	return {name, food_type, shift};
}

export default connect(mapStateToProps, {foodUpdate, foodCreate, foodFetch})(FoodCreate);