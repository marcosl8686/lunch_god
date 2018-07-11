import React, {Component} from 'react';
import {Text, ListView, View} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import {foodUpdate, foodCreate, foodFetch} from '../actions';
import {Card, CardSection, Button} from './common';
import EmployeeForm from './EmployeeForm';
import moment from 'moment';
import ListRestaurant from './ListRestaurant';
import { List, ListItem } from 'react-native-elements'

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)


var yelpFeed;

class FoodCreate extends Component {
	state = { showResults: false };

	componentWillMount() {
    this.props.foodFetch();
    console.log(this.props, 'List component mounted')
    this.createDataSource(this.props);
  }

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
		this.props.foodCreate({name,food_type,shift: shift || _today, location, image_url,rating, M_rating, L_rating, P_rating, A_rating });
	}

	createDataSource(x) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
		console.log(x,"x")
    this.dataSource = ds.cloneWithRows(x);
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
			var yelpArray = yelpFeed.data.businesses
			console.log(yelpArray, "YELP ARRAY")
			const ds = new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			});
			this.dataSource = ds.cloneWithRows(yelpArray);
			this.setState({ showResults: !this.state.showModal });
		});
	}
	onRowPress() {
		console.log(this.props, "ON PRESS EVENT");
	}

  renderRow(searchData) {
		console.log(searchData, "OK!!!")
    return <ListRestaurant restaurant_list={searchData} />;
  }
	
	renderResults() {
		console.log(this.props, "PROPS")
		console.log(this.state, "STATE")
		console.log(this.dataSource, "DATA SOURCE")
		if(this.state.showResults) {
			return <ListView
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        style={{height: 300}}
      />
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
		 		<List style={{flex:1}}>
		 			{this.renderResults()}
		 	</List>
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