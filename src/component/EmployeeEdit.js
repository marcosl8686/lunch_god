import _ from 'lodash';
import React, {Component} from 'react';
import EmployeeForm from './EmployeeForm';
import Communications from 'react-native-communications';
import {connect} from 'react-redux';
import {foodUpdate, foodSave, foodDelete} from '../actions';
import {Card, CardSection, Button, Confirm} from './common';

class EmployeeEdit extends Component {
	state = { showModal: false };
	
	
	componentWillMount() {
		console.log(this.props.employee, "passed props from list item")
		_.each(this.props.employee, (value, prop) => {
			this.props.foodUpdate({prop, value});
		});
	}
	
//	onButtonPress() {
//		const {name,food_type,shift, image_url,rating, M_rating, L_rating, P_rating, A_rating } = this.props;
//		this.props.foodSave({name,food_type,shift, image_url,rating, M_rating, L_rating, P_rating, A_rating, uid: this.props.employee.uid})
//		console.log(name, food_type, shift);
//	}
	onTextPress() {
		const {food, shift} = this.props;
		Communications.text(food_type, `on ${shift}`);
	}
	onAccept() {
		const {uid} = this.props.employee;
		
		this.props.foodDelete({uid});
	}
	onDecline() {
		this.setState({showModal:false});
	}
	render() {
		return(
			<Card>
				<EmployeeForm />
				<CardSection>
					<Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
						Delete
					</Button>
				</CardSection>
				
				<Confirm visible={this.state.showModal} onAccept={this.onAccept.bind(this)} onDecline={this.onDecline.bind(this)}>
					Are you Sure you want to delete this?
				</Confirm>
			</Card>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state, "OK!")
	const {name, food_type, shift} = state.foodForm;
	return {name, food_type, shift};
}

export default connect(mapStateToProps, {foodUpdate, foodSave, foodDelete})(EmployeeEdit)