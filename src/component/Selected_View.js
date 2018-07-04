import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {foodUpdate, foodSave, foodDelete} from '../actions';
import {CardSection, Button} from './common';
import {Rating } from 'react-native-elements';

class Selected_View extends Component {

	ratingCompleted(score) {
		console.log(score)
		console.log(this.state)
		console.log(this.props.employee, "Passed Props from List item11")
		const { currentUser } = firebase.auth();
	  console.log(currentUser.uid, "CURRENT USER")
		console.log("DRgkzDVuUSdzpYxteoswJuBNNIv1")
		const {name, food_type, shift, location, image_url, rating, M_rating, L_rating, P_rating, A_rating} = this.props.employee;
		switch (currentUser.uid) {
			case 'DRgkzDVuUSdzpYxteoswJuBNNIv1':
				console.log("marcos Rating")
				this.props.foodSave({name, food_type, shift, location, image_url, rating, M_rating: score, L_rating, P_rating, A_rating, uid: this.props.employee.uid})
				
				break;
			default:
				break;
						}
		
	}
  render() {
    return(
      <View>
      	<CardSection>
      		<Rating
						type='custom'
						imageSize={30}
						onFinishRating={this.ratingCompleted.bind(this)}
						style={{ paddingVertical: 10 }}
					/>
      	</CardSection>
      </View>
    );
  }
}


export default connect(null, {foodSave, foodUpdate})(Selected_View);