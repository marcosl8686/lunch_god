import React, {Component} from 'react';
import {connect} from 'react-redux';
import {foodUpdate, foodCreate} from '../actions';
import {Card, CardSection, Button} from './common';
import EmployeeForm from './EmployeeForm';

class FoodCreate extends Component {
	
	onButtonPress() {
		const {name, food_type, shift} = this.props;
	
		this.props.foodCreate({name,food_type,shift: shift || 'Monday'});
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
		 </Card>
		);
	}
}


const mapStateToProps = (state) => {
	const {name, food_type, shift} = state.foodForm;
	
	return {name, food_type, shift};
}

export default connect(mapStateToProps, {foodUpdate, foodCreate})(FoodCreate);