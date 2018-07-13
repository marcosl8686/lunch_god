import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {foodUpdate, foodSave, foodDelete} from '../actions';
import {CardSection} from './common';
import {Rating , Button} from 'react-native-elements';

let ViewRating = 0;
let UserComment;

class Selected_View extends Component {
	componentWillMount() {
		console.log(this.props)
		const { currentUser } = firebase.auth();
		const {name, food_type, shift, location, image_url, rating, M_rating, L_rating, P_rating, A_rating, M_comment, L_comment, P_comment, A_comment} = this.props.employee;
		switch (currentUser.uid) {
			case 'DRgkzDVuUSdzpYxteoswJuBNNIv1':
				console.log("marcos Rating")
				ViewRating = M_rating
				UserComment = M_comment
				break;
			case '43KPmdR4vRX2D4X88iRHh7zt1du2':
				ViewRating = L_rating
				UserComment = L_comment
				break;
			case '2xSnkH0vIEVs2QfCpww3oI3rFM13':
				ViewRating = A_rating
				UserComment = A_rating
				break;
			case 'ad08OE432idJzNzCWTS4YU1Od5k1':
				ViewRating = P_rating
				UserComment = P_comment
				break;
			default:
				break;
						}
	}
	ratingCompleted(score) {
		console.log(score)
		console.log(this.state)
		console.log(this.props.employee, "Passed Props from List item11")
		const { currentUser } = firebase.auth();
	  console.log(currentUser.uid, "CURRENT USER")
		console.log("DRgkzDVuUSdzpYxteoswJuBNNIv1")
		const {name, food_type, shift, location, image_url, rating, M_rating, L_rating, P_rating, A_rating, userEmail, url, M_comment, L_comment, P_comment, A_comment} = this.props.employee;
		switch (currentUser.uid) {
			case 'DRgkzDVuUSdzpYxteoswJuBNNIv1':
				console.log("marcos Rating")
				this.props.foodSave({name, food_type, shift, location, image_url, rating, M_rating: score, L_rating, P_rating, A_rating, url, M_comment, L_comment, P_comment, A_comment, uid: this.props.employee.uid, userEmail})
				break;
			case '43KPmdR4vRX2D4X88iRHh7zt1du2':
				this.props.foodSave({name, food_type, shift, location, image_url, rating, M_rating, L_rating: score, P_rating, A_rating, url, M_comment, L_comment, P_comment, A_comment, uid: this.props.employee.uid, userEmail})
				break;
			case '2xSnkH0vIEVs2QfCpww3oI3rFM13':
				this.props.foodSave({name, food_type, shift, location, image_url, rating, M_rating, L_rating, P_rating, A_rating: score, url, M_comment, L_comment, P_comment, A_comment, uid: this.props.employee.uid, userEmail})
				break;
			case 'ad08OE432idJzNzCWTS4YU1Od5k1':
				this.props.foodSave({name, food_type, shift, location, image_url, rating, M_rating, L_rating, P_rating: score, A_rating, url, M_comment, L_comment, P_comment, A_comment, uid: this.props.employee.uid, userEmail})
				break;
			default:
				break;
						}
		
	}
	onSubmit() {
		console.log('ok')
	}
  render() {
    return(
      <View>
      	<CardSection>
      		<Rating
						type='custom'
						imageSize={30}
						onFinishRating={this.ratingCompleted.bind(this)}
						style={{ paddingVertical: 10 , marginLeft: 30}}
						startingValue={ViewRating}
					/>
      	</CardSection>
      	<CardSection>
      		<Text>
      			Comment:
      		</Text>
      		<TextInput
      		style={{height: 40, flex:1, borderColor: 'gray', borderWidth: 1}}
        	onChangeText={this.commentInput.bind(this)}
        	value={userComment}
      		  />
      	</CardSection>
      	<Button
						icon={{name: 'filter'}}
						onPress={this.onSubmit.bind(this)}
						backgroundColor='#19d871'
						buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
						title='Submit' 
						style={{marginTop:5,marginBottom:5}}
						/>
      </View>
    );
  }
}


export default connect(null, {foodSave, foodUpdate})(Selected_View);