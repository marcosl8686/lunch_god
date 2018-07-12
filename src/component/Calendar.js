import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';
import { foodFetch } from '../actions';
import ListRestaurant from './ListItem';
import {Actions} from 'react-native-router-flux';


const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(15, 'days').format(_format)

class Lunch_Calendar extends React.Component {
	state = {_markedDates: {[_today]: {disabled: true}}}
	 componentWillMount() {
    this.props.foodFetch();
    console.log(this.props, 'Calendar List component mounted')
  }

  componentWillReceiveProps(nextProps) {
		let myObj = {}
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props
    console.log(nextProps, 'Calendar NEXT PROPS')
		_.each(nextProps.selected_food, (value, prop) => {
            console.log(value, "VALUE")
			myObj[value.shift] = {selected: true, marked: true, selectedColor: 'blue'}
		});
		this.setState({_markedDates: myObj})
		console.log(this.state)
  }
  
  onDaySelect = (day) => {
    console.log(day)
    let data = this.props
    let i = data.selected_food.length,
    selectedData;

    while(i--) {
        console.log(data.selected_food[i].shift, "loop data")
        if(data.selected_food[i].shift == day.dateString) {
            selectedData = data.selected_food[i];
            break;
        } else {
          selectedData = undefined;
        }
    }
    if(selectedData !== undefined) {
       Actions.ListItem({employee: selectedData});
    } else {
      Actions.YelpSearch();
    }
   
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <Calendar
           theme={{
               dotColor: 'pink',
            }}
           	current={_today}

            // hideArrows={true}

            onDayPress={this.onDaySelect.bind(this)}
            markedDates={this.state._markedDates}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const selected_food = _.map(state.selected_food, (val, uid) => {
    return { ...val, uid };
  });

  return { selected_food };
};

export default connect(mapStateToProps, {foodFetch})(Lunch_Calendar)