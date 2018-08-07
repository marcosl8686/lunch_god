import React, {Component} from 'react';
import {Text, ListView, View} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import {foodUpdate, foodCreate, foodFetch} from '../actions';
import {Card, CardSection, Button} from './common';
import EmployeeForm from './EmployeeForm';
import moment from 'moment';
import ListRestaurant from './ListRestaurant';
import { List, ListItem, SearchBar } from 'react-native-elements'

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)


var yelpFeed;

class YelpSearch extends Component {
	state = { showResults: false, searchTerm: '' };

	componentWillMount() {
    this.props.foodFetch();
    console.log(this.props, '~~22')
    this.createDataSource(this.props);
  }

	createDataSource(x) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
		console.log(x,"x")
    this.dataSource = ds.cloneWithRows(x);
  }

	onSearch() {
		const {searchTerm} = this.state;
		const config = {
			headers: {'Authorization': 'Bearer 4IA1arV14_DtpacdNm6qpGFqs4Qrnaz9QNUPBWtk0vaC2j27cU5OIljku5OEdO0NMiFAjpSdFWWfZG9W7uggXQIT2o1OsDithxkuW3cDaBtlFObfoHubuDbE9REXW3Yx'},
			params: {
				term: searchTerm,
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
	myList() {
			const ds = new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			});
			this.dataSource = ds.cloneWithRows(this.props.myFav);
			this.setState({ showResults: !this.state.showModal });
	}

  renderRow(searchData) {
		console.log(searchData, "OK!!!")
    return <ListRestaurant selected_day={this.props.dateString} restaurant_list={searchData} />;
  }
	
	renderResults() {
		console.log(this.props, "PROPS")
		console.log(this.state, "STATE")
		console.log(this.dataSource, "DATA SOURCE")
        if (this.state.showResults) {
            console.log(this.dataSource, "DATA SOURCE!!")
			return <ListView
        dataSource={this.dataSource}
        renderRow={this.renderRow.bind(this)}
        style={{height: 450}}
      />
		}
	}

	searchInput(input) {
		this.setState({searchTerm: input})
	}
	clearInput() {
		console.log('CLEAR!!!')
	}
	render() {
		return(
		 <Card>
			<SearchBar
			lightTheme
			onChangeText={this.searchInput.bind(this)}
			onClear={this.clearInput.bind(this)}
			placeholder='Type Here...' />
		 	<CardSection>
		 		<Button onPress={this.onSearch.bind(this)}>
		 			Search
		 		</Button>
		 		<Button onPress={this.myList.bind(this)}>
		 			My List
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

export default connect(mapStateToProps, {foodUpdate, foodCreate, foodFetch})(YelpSearch);