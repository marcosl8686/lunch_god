import React, {Component} from 'react';
import {View, Text, Picker} from 'react-native';
import {connect} from 'react-redux';
import {foodUpdate} from '../actions'
import {CardSection, Input} from './common';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)

class EmployeeForm extends Component {
	render() {
		return(
			<View>
				<CardSection>
					<Input label="Name" placeholder="Cancun Juice" value={this.props.name} onChangeText ={ value => this.props.foodUpdate({prop: 'name', value: value})}/>
				</CardSection>
				<CardSection>
					<Input label="Type" placeholder="Mexican Food" value={this.props.food_type} onChangeText = { value => this.props.foodUpdate({prop: 'food_type', value: value})}/>
				</CardSection>
				<CardSection style={{ flexDirection: 'column'}}>
					<Text style={styles.pickerTextSyle}>Select Day:</Text>
					<DatePicker
						style={{width: 200}}
						date={_today}
						mode="date"
						placeholder="select date"
						format="YYYY-MM-DD"
						confirmBtnText="Confirm"
						cancelBtnText="Cancel"
						customStyles={{
							dateIcon: {
								position: 'absolute',
								left: 0,
								top: 4,
								marginLeft: 0
							},
							dateInput: {
								marginLeft: 36
							}
							// ... You can check the source to find the other keys.
						}}
						onDateChange={(date) => this.props.foodUpdate({prop: 'shift', value: date})}
					/>
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