import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  FOOD_UPDATE,
  FOOD_CREATE,
  FOOD_FETCH_SUCCESS,
  FOOD_SAVE_SUCCESS
} from './types';

export const foodUpdate = ({ prop, value }) => {
  return {
    type: FOOD_UPDATE,
    payload: { prop, value }
  };
};

export const foodCreate = ({ name, food_type, shift }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/weekly_menu`)
      .push({ name, food_type, shift })
      .then(() => {
        dispatch({ type: FOOD_CREATE });
        Actions.main({ type: 'reset' });
      });
  };
};

export const foodFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/weekly_menu`)
      .on('value', snapshot => {
        dispatch({ type: FOOD_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const foodSave = ({ name, food_type, shift, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/weekly_menu/${uid}`)
      .set({ name, food_type, shift })
      .then(() => {
        dispatch({ type: FOOD_SAVE_SUCCESS });
        Actions.main({ type: 'reset' });
      });
  };
};

export const foodDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/weekly_menu/${uid}`)
      .remove()
      .then(() => {
        Actions.main({ type: 'reset' });
      });
  };
};