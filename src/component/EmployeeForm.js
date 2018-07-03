import React, {Component} from 'react';
import {View, Text, Picker} from 'react-native';
import {connect} from 'react-redux';
import {foodUpdate} from '../actions'
import {CardSection, Input} from './common';


class EmployeeForm extends Component {
	render() {
		return(
			<View>
				<CardSection>
					<Input label="Name" placeholder="Jane" value={this.props.name} onChangeText ={ value => this.props.foodUpdate({prop: 'name', value: value})}/>
				</CardSection>
				<CardSection>
					<Input label="Type" placeholder="Mexican Food" value={this.props.food_type} onChangeText = { value => this.props.foodUpdate({prop: 'food_type', value: value})}/>
				</CardSection>
				<CardSection style={{ flexDirection: 'column'}}>
					<Text style={styles.pickerTextSyle}>Select Day:</Text>
					<Picker selectedValue={this.props.shift} onValueChange={selectedDay => this.props.foodUpdate({prop: 'shift', value: selectedDay})}>
						<Picker.Item label="Monday" value="Monday" />
						<Picker.Item label="Tuesday" value="Tuesday" />
						<Picker.Item label="Wednesday" value="Wednesday" />
						<Picker.Item label="Thursday" value="Thursday" />
						<Picker.Item label="Friday" value="Friday" />
					</Picker>
		 		</CardSection>
				
			</View>
		);
	}
}

const styles = {
	pickerTextSyle: {
		fontSize: 18,
		paddingLeft: 20
	}
}

const mapStateToProps = (state) => {
	const {name, food_type, shift} = state.foodForm;
	
	return {name, food_type, shift}
};

export default connect(mapStateToProps, {foodUpdate})(EmployeeForm);