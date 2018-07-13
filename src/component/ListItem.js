import React, {Component} from 'react';
import {Text, TouchableWithoutFeedback, View, Image, ScrollView, Linking  } from 'react-native';
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
	editPress() {
		Actions.employeeEdit({employee: this.props.employee});
	}
	ratingCompleted(rating) {
		console.log(rating, "RATING")
	}
	l_CommentRender() {
		const {L_comment} = this.props.employee
		console.log(this.props.employee, 'M Comment PROP')
		if(L_comment !== "") {
			return(
				<View style={{flex:1}}>
					<Text>Leo:</Text>
					<Text style={{padding:7, borderColor:'#c41f1f', borderWidth: 0.5, flex:3, borderRadius:2}}>{L_comment}</Text>
				</View>
			);
		}
	}
	p_CommentRender() {
		const {P_comment} = this.props.employee
		if(P_comment !== "") {
			return(
				<View style={{flex:1}}>
					<Text>Pete:</Text>
					<Text style={{padding:7, borderColor:'#214dc4', borderWidth: 0.5, flex:3, borderRadius:2}}>{P_comment}</Text>
				</View>
			);
		}
	}
	m_CommentRender() {
		const {M_comment} = this.props.employee
		if(M_comment !== "") {
			return(
				<View style={{flex:1}}>
					<Text>Marcos:</Text>
					<Text style={{padding:7, borderColor:'#18bc0a', borderWidth: 0.5, flex:3, borderRadius:2}}>{M_comment}</Text>
				</View>
			);
		}
	}
	a_CommentRender() {
		const {A_comment} = this.props.employee
		if(A_comment !== "") {
			return(
				<View style={{flex:1}}>
					<Text>Aaron:</Text>
					<Text style={{padding:7, borderColor:'#000000', borderWidth: 0.5, flex:3, borderRadius:2}}>{A_comment}</Text>
				</View>
			)
		}
	}

	render() {
		const {name, image_url, location, A_rating, L_rating, M_rating, P_rating, food_type, userEmail} = this.props.employee;
		return (
			<ScrollView style={{flex:1}}>
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
						<Text>
							User: {userEmail}
						</Text>
					</CardSection>
					<CardSection>
						<Text>
							{food_type}
						</Text>
					</CardSection>
					<CardSection>
						<Rating
							type='custom'
							ratingColor='#3498db'
							ratingBackgroundColor='#837979'
							imageSize={10}
							startingValue={P_rating}
							onFinishRating={this.ratingCompleted}
							style={{ paddingVertical: 10, paddingRight:20 }}
						/>
						<Rating
							type='custom'
							ratingColor='#d01515'
							ratingBackgroundColor='#837979'
							imageSize={10}
							startingValue={L_rating}
							onFinishRating={this.ratingCompleted}
							style={{ paddingVertical: 10, paddingRight:20 }}
						/>
						<Rating
							type='custom'
							ratingColor='#000000'
							ratingBackgroundColor='#837979'
							imageSize={10}
							startingValue={A_rating}
							onFinishRating={this.ratingCompleted}
							style={{ paddingVertical: 10, paddingRight:20 }}
						/>
						<Rating
							type='custom'
							ratingColor='#13c113'
							ratingBackgroundColor='#837979'
							imageSize={10}
							startingValue={M_rating}
							onFinishRating={this.ratingCompleted}
							style={{ paddingVertical: 10, paddingRight:20 }}
						/>
					</CardSection>
					<CardSection>
						{this.l_CommentRender()}
					</CardSection>
					<CardSection>
						{this.p_CommentRender()}
					</CardSection>
					<CardSection>
						{this.a_CommentRender()}
					</CardSection>
					<CardSection>
						{this.m_CommentRender()}
					</CardSection>
					<Button
						icon={{name: 'filter'}}
						onPress={this.onRowPress.bind(this)}
						backgroundColor='#03A9F4'
						buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
						title='Rate & Comment' 
						style={{marginTop:5,marginBottom:5}}
						/>
					<Button
						icon={{name: 'filter'}}
						onPress={() => Linking.openURL(this.props.employee.url)}
						backgroundColor='#d32323'
						buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
						title='View on Yelp' 
						style={{marginTop:5,marginBottom:5}}
					/>
					<Button
						icon={{name: 'filter'}}
						onPress={this.editPress.bind(this)}
						backgroundColor='#cb2727'
						buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
						title='Remove'
						style={{marginTop:5,marginBottom:5}}
						  />
				</Card>
			</ScrollView >
		);
	}
}

export default ListRestaurant;

