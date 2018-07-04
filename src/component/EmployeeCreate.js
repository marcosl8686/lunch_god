import React, {Component} from 'react';
import {Text} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import {foodUpdate, foodCreate} from '../actions';
import {Card, CardSection, Button} from './common';
import EmployeeForm from './EmployeeForm';

var yelpFeed;

class FoodCreate extends Component {
	state = { showResults: false };
	

	onButtonPress() {
		const {name, food_type, shift} = this.props;
		const {location, image_url, rating} = yelpFeed.data.businesses[0]
		const M_rating = 0,
					L_rating = 0,
					P_rating = 0,
					A_rating = 0
		
		console.log(location, "location")
		console.log(image_url, "image url")
		console.log(rating, "rating")
		this.props.foodCreate({name,food_type,shift: shift || 'Monday', location, image_url,rating, M_rating, L_rating, P_rating, A_rating });
	}
	onSearch() {
		const {name, food_type, shift} = this.props;
		const config = {
			headers: {'Authorization': 'Bearer 4IA1arV14_DtpacdNm6qpGFqs4Qrnaz9QNUPBWtk0vaC2j27cU5OIljku5OEdO0NMiFAjpSdFWWfZG9W7uggXQIT2o1OsDithxkuW3cDaBtlFObfoHubuDbE9REXW3Yx'},
			params: {
				term: name,
				location: '90638'
			}
		}
		axios.get('https://api.yelp.com/v3/businesses/search', config)
    .then(response => {
			yelpFeed = response
			this.setState({ showResults: !this.state.showModal });
		});
	}
	
	renderResults() {
		console.log(this.props, "PROPS")
		console.log(this.state, "STATE")
		if(this.state.showResults) {
			return <Text>SOMETHING</Text>
		}
	}
	
	render() {
		return(
		 <Card>
			<EmployeeForm {...this.props}/>
		 	<CardSection>
		 		<Button onPress={this.onSearch.bind(this)}>
		 			Search
		 		</Button>
		 		<Button onPress={this.onButtonPress.bind(this)}>
		 			Create
		 		</Button>
		 	</CardSection>
		 	<CardSection>
		 		{this.renderResults()}
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

export default connect(mapStateToProps, {foodUpdate, foodCreate})(FoodCreate);