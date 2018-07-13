import React, {Component} from 'react';
import {View, Text, AsyncStorage, ImageBackground } from 'react-native';
import {connect} from 'react-redux';
import {emailChanged, passwordChanged, loginUser} from '../actions'
import {Card, CardSection, Input, Button, Spinner} from './common';
import main_bg from '../../assets/food_bg.jpg';

class LoginForm extends Component {
	componentWillMount() {
		AsyncStorage.getItem('myKey').then((value) => {
			this.props.emailChanged(value);
		});
		AsyncStorage.getItem('myPass').then((value) => {
			this.props.passwordChanged(value);
		});
	}
	onEmailChange(text) {
		AsyncStorage.setItem('myKey', text);
		this.props.emailChanged(text);
	}
	onPasswordChange(text) {
		AsyncStorage.setItem('myPass', text);
		this.props.passwordChanged(text);
	}
	onButtonPress() {
		const {email, password} = this.props;
		
		this.props.loginUser({email, password});
	}
	renderError() {
		if(this.props.error) {
			return(
				<View style={{backgroundColor: 'white'}}>
					<Text style={styles.errorTextStyle}>
						{this.props.error}
					</Text>
				</View>
			);
		}
	}
	renderButton() {
		if(this.props.loading) {
			return <Spinner size="large" />
		}
		return (
			<Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
		)
	}
	
  render() {
    return (
			<ImageBackground source={main_bg} style={{width: '100%', height: '100%'}}>
				 <Card>
					<CardSection>
						<Input label="Email" placeholder="email@gmail.com" onChangeText={this.onEmailChange.bind(this)} value={this.props.email} />
					</CardSection>
					 <CardSection>
						<Input secureTextEntry label="Password" placeholder="password" onChangeText={this.onPasswordChange.bind(this)} value={this.props.password} />
					</CardSection>
					{this.renderError()}
					 <CardSection>
						{this.renderButton()}
					</CardSection>
				</Card>
			</ImageBackground>
   
    );
  }
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
}

const mapStateToProps = (state) => {
	return {
		email: state.auth.email,
		password: state.auth.password,
		error: state.auth.error,
		loading: state.auth.loading
	}
}
export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser})(LoginForm);