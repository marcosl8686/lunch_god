import React from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import LoginForm from './component/LoginForm';
import ListItem from './component/ListItem';
import EmployeeCreate from './component/EmployeeCreate';
import EmployeeEdit from './component/EmployeeEdit';
import Selected_view from './component/Selected_View';
import Lunch_Calendar from './component/Calendar';
import YelpSearch from './component/YelpSearch';

const RouterComponent = () => {
	return (
		<Router>
			<Scene key='root' hideNavBar>
				<Scene key='auth'>
					<Scene key='login' component={LoginForm} title="Please Login" initial />
				</Scene>
				<Scene key='main'>
					<Scene key='Lunch_Calendar'rightTitle="Add" onRight={() => { Actions.YelpSearch()}}  component={Lunch_Calendar} title="Selected Restaurant" />
					<Scene key='ListItem'  component={ListItem} title="Lunch Location" />
					<Scene key='Selected_view' component={Selected_view} title="Selected Restaurant" />
					<Scene key='YelpSearch' component={YelpSearch} title="Yelp Search" />
					<Scene key='employeeCreate' component={EmployeeCreate} title="Schedule Lunch" />
					<Scene key='employeeEdit'  component={EmployeeEdit} title='Edit Restaurant' />
				</Scene>
			</Scene>
		</Router>
	);
}

export default RouterComponent;