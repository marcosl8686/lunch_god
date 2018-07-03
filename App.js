import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import LoginForm from './src/component/LoginForm';
import Router from './src/Router';


export default class App extends React.Component {
  componentWillMount() {
      const config = {
				apiKey: "AIzaSyBHrMqESY1-W0vCUY5g34kitHG4sqivjKQ",
				authDomain: "lunch-god.firebaseapp.com",
				databaseURL: "https://lunch-god.firebaseio.com",
				projectId: "lunch-god",
				storageBucket: "lunch-god.appspot.com",
				messagingSenderId: "181586137536"
			};
    firebase.initializeApp(config);
  }
  
  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Router />
      </Provider>
    );
  }
}
