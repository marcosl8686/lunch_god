import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {foodUpdate, foodSave, foodDelete} from '../actions';
import {CardSection, Button} from './common';
import {Rating } from 'react-native-elements';

let ViewRating = 0;

class Selected_View extends Component {
	componentWillMount() {
		const { currentUser } = firebase.auth();
		const {name, food_type, shift, location, image_url, rating, M_rating, L_rating, P_rating, A_rating} = this.props.employee;
		switch (currentUser.uid) {
			case 'DRgkzDVuUSdzpYxteoswJuBNNIv1':
				console.log("marcos Rating")
				ViewRating = M_rating
				break;
			case '43KPmdR4vRX2D4X88iRHh7zt1du2':
				ViewRating = L_rating
				break;
			case '2xSnkH0vIEVs2QfCpww3oI3rFM13':
				ViewRating = A_rating
				break;
			case 'ad08OE432idJzNzCWTS4YU1Od5k1':
				ViewRating = P_rating
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
		const {name, food_type, shift, location, image_url, rating, M_rating, L_rating, P_rating, A_rating} = this.props.employee;
		switch (currentUser.uid) {
			case 'DRgkzDVuUSdzpYxteoswJuBNNIv1':
				console.log("marcos Rating")
				this.props.foodSave({name, food_type, shift, location, image_url, rating, M_rating: score, L_rating, P_rating, A_rating, uid: this.props.employee.uid})
				break;
			case '43KPmdR4vRX2D4X88iRHh7zt1du2':
				this.props.foodSave({name, food_type, shift, location, image_url, rating, M_rating, L_rating: score, P_rating, A_rating, uid: this.props.employee.uid})
				break;
			case '2xSnkH0vIEVs2QfCpww3oI3rFM13':
				this.props.foodSave({name, food_type, shift, location, image_url, rating, M_rating, L_rating, P_rating, A_rating: score, uid: this.props.employee.uid})
				break;
			case 'ad08OE432idJzNzCWTS4YU1Od5k1':
				this.props.foodSave({name, food_type, shift, location, image_url, rating, M_rating, L_rating, P_rating: score, A_rating, uid: this.props.employee.uid})
				break;
			default:
				break;
						}
		
	}
	ratingVal() {
		
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
						startingValue={ViewRating}
					/>
      	</CardSection>
      </View>
    );
  }
}


export default connect(null, {foodSave, foodUpdate})(Selected_View);