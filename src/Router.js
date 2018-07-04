import React from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import LoginForm from './component/LoginForm';
import EmployeeList from './component/EmployeeList';
import EmployeeCreate from './component/EmployeeCreate';
import EmployeeEdit from './component/EmployeeEdit';
import Selected_view from './component/Selected_View';

const RouterComponent = () => {
	return (
		<Router>
			<Scene key='root' hideNavBar>
				<Scene key='auth'>
					<Scene key='login' component={LoginForm} title="Please Login" initial />
				</Scene>
				<Scene key='main'>
					<Scene key='EmployeeList' rightTitle="Add" onRight={() => { Actions.employeeCreate()}}  component={EmployeeList} title="Employee List" />
					<Scene key='Selected_view' component={Selected_view} title="Selected Restaurant" />
					<Scene key='employeeCreate' component={EmployeeCreate} title="Schedule Lunch" />
					<Scene key='employeeEdit'  component={EmployeeEdit} title='Edit Restaurant' />
				</Scene>
			</Scene>
		</Router>
	);
}

export default RouterComponent;