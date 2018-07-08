import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';
import { foodFetch } from '../actions';
import ListRestaurant from './ListItem';


const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(15, 'days').format(_format)

class Lunch_Calendar extends React.Component {
	
	 componentWillMount() {
    this.props.foodFetch();
    console.log(this.props, 'Calendar List component mounted')
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props
    console.log(nextProps, 'Calendar NEXT PROPS')
  }
  // It is not possible to select some to current day.
  initialState = {
      [_today]: {disabled: true}
  }
  
  constructor() {
    super();

    this.state = {
      _markedDates: this.initialState
    }
  }
  
  onDaySelect = (day) => {
      const _selectedDay = moment(day.dateString).format(_format);
      
      let marked = true;
      let markedDates = {}
      if (this.state._markedDates[_selectedDay]) {
        // Already in marked dates, so reverse current marked state
        marked = !this.state._markedDates[_selectedDay].marked;
        markedDates = this.state._markedDates[_selectedDay];
      }
      
      markedDates = {...markedDates, ...{ marked }};
      
      // Create a new object using object property spread since it should be immutable
      // Reading: https://davidwalsh.name/merge-objects
      const updatedMarkedDates = {...this.state._markedDates, ...{ [_selectedDay]: markedDates } }
      
      // Triggers component to render again, picking up the new state
      this.setState({ _markedDates: updatedMarkedDates });
		
			console.log(this.state, "AFTER NEW")
			console.log(this.state._markedDates, "Marked Date")
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

            onDayPress={this.onDaySelect}
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