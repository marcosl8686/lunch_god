import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import { View, ListView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';
import { foodFetch } from '../actions';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';
import UpComingRest from './UpComingRest';


const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(15, 'days').format(_format)

class Lunch_Calendar extends React.Component {
    state = { _markedDates: { [_today]: { disabled: true } } }
    componentWillMount() {
        this.props.foodFetch();
        console.log(this.props, 'Calendar List component mounted');
        this.createDataSource(this.props.selected_food);
    }

    componentWillReceiveProps(nextProps) {
        let myObj = {}
        var userColor;
        // nextProps are the next set of props that this component
        // will be rendered with
        // this.props is still the old set of props
        console.log(nextProps, 'Calendar NEXT PROPS')
        _.each(nextProps.selected_food, (value, prop) => {
            console.log(value, "VALUE")
            switch (value.userEmail) {
                case 'marcos.lee@livingspaces.com':
                    userColor = 'green';
                    break;
                case 'leo.garcia@livingspaces.com':
                    userColor = 'red';
                    break;
                case 'pete.franco@livingspaces.com':
                    userColor = 'blue';
                    break;
                case 'aaron.doan@livingspaces.com':
                    userColor = 'black';
                    break;
                default:
                    userColor = 'pink';
                    break;
            }
            myObj[value.shift] = { selected: true, marked: true, selectedColor: userColor }
        });
        this.setState({ _markedDates: myObj })
        console.log(this.state)
    }
    createDataSource(x) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        console.log(x, "x")
        this.dataSource = ds.cloneWithRows(x);
        console.log(this.dataSource, "FIRST DATA SOURCE")
    }
    onDaySelect = (day) => {
        console.log(day)
        let data = this.props
        let i = data.selected_food.length,
            selectedData;

        while (i--) {
            console.log(data.selected_food[i].shift, "loop data")
            if (data.selected_food[i].shift == day.dateString) {
                selectedData = data.selected_food[i];
                break;
            } else {
                selectedData = undefined;
            }
        }
        if (selectedData !== undefined) {
            Actions.ListItem({ employee: selectedData });
        } else {
            Actions.YelpSearch({ dateString: day.dateString });
        }

    }
    renderRow(searchData) {
        console.log(searchData, "OK!!!")
        return <UpComingRest restaurant_list={searchData} />;
    }
    upcomingFood() {
        if (this.props.selected_food.length > 0) {
            const ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            });
            this.dataSource = ds.cloneWithRows(this.props.selected_food);
            this.props.selected_food.forEach(function (data, int) {
                console.log(data, "upcoming food")
                if (moment().isSameOrAfter(data.shift)) {
                    console.log(data.shift, 'future');
                    console.log(this.dataSource)
                    return <ListView
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                        style={{ height: 250 }}
                    />
                };
            })

        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Calendar
                    theme={{
                        dotColor: 'pink',
                    }}
                    current={_today}

                    // hideArrows={true}

                    onDayPress={this.onDaySelect.bind(this)}
                    markedDates={this.state._markedDates}
                />
                <List style={{ flex: 1 }}>
                    {this.upcomingFood()}
                </List>
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

export default connect(mapStateToProps, { foodFetch })(Lunch_Calendar)