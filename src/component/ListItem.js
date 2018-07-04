import React, {Component} from 'react';
import {Text, TouchableWithoutFeedback, View, Image } from 'react-native';
import { Card, ListItem, Button, Rating } from 'react-native-elements';
import {CardSection} from './common';
import {Actions} from 'react-native-router-flux';

class ListRestaurant extends Component {
	componentWillMount() {
		const {name, image_url, location} = this.props.employee;
		console.log(this.props, "LIST ITEM PROPS")
		console.log(image_url, 'img url')
	}
	onRowPress() {
		Actions.Selected_view({employee: this.props.employee});
	}
	ratingCompleted(rating) {
		console.log(rating, "RATING")
	}
	
	render() {
		const {name, image_url, location, A_rating, L_rating, M_rating, P_rating} = this.props.employee;
		return (
			<View>
				<Card
					title= {name}
					image={{uri:image_url}}>
					<Text style={{marginBottom: 10}}>
						{location.display_address[0]}
					</Text>
					<Text style={{marginBottom: 10}}>
						{location.display_address[1]}
					</Text>
					<CardSection>
						<Rating
							type='custom'
							ratingColor='#3498db'
							ratingBackgroundColor='#c8c7c8'
							imageSize={10}
							startingValue={P_rating}
							onFinishRating={this.ratingCompleted}
							style={{ paddingVertical: 10, paddingRight:20 }}
						/>
						<Rating
							type='custom'
							ratingColor='#cedb34'
							ratingBackgroundColor='#c8c7c8'
							imageSize={10}
							startingValue={L_rating}
							onFinishRating={this.ratingCompleted}
							style={{ paddingVertical: 10, paddingRight:20 }}
						/>
						<Rating
							type='custom'
							ratingColor='#db3434'
							ratingBackgroundColor='#c8c7c8'
							imageSize={10}
							startingValue={A_rating}
							onFinishRating={this.ratingCompleted}
							style={{ paddingVertical: 10, paddingRight:20 }}
						/>
						<Rating
							type='custom'
							ratingColor='#000000'
							ratingBackgroundColor='#c8c7c8'
							imageSize={10}
							startingValue={M_rating}
							onFinishRating={this.ratingCompleted}
							style={{ paddingVertical: 10, paddingRight:20 }}
						/>
					</CardSection>
					
					<Button
						icon={{name: 'filter'}}
						onPress={this.onRowPress.bind(this)}
						backgroundColor='#03A9F4'
						buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
						title='Show More' />
				</Card>
			</View>
		);
	}
}

export default ListRestaurant;

