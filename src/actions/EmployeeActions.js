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

export const foodCreate = ({name, food_type, shift, location, image_url, rating, M_rating, L_rating, P_rating, A_rating, url, M_comment, L_comment, P_comment, A_comment}) => {
  const { currentUser } = firebase.auth();
	const userEmail = currentUser.email
  return (dispatch) => {
    firebase.database().ref(`/users/weekly_menu`)
      .push({name, food_type, shift, location, image_url, rating, M_rating, L_rating, P_rating, A_rating, url, M_comment, L_comment, P_comment, A_comment, userEmail})
      .then(() => {
        dispatch({ type: FOOD_CREATE });
        Actions.main({ type: 'reset' });
      });
  };
};

export const foodFetch = () => {
  const { currentUser } = firebase.auth();5

  return (dispatch) => {
    firebase.database().ref(`/users/weekly_menu`)
      .on('value', snapshot => {
        dispatch({ type: FOOD_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const foodSave = ({ name, food_type, shift, location, image_url, rating, M_rating, L_rating, P_rating, A_rating, url , M_comment, L_comment, P_comment, A_comment, uid, userEmail}) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/weekly_menu/${uid}`)
      .set({ name, food_type, shift, location, image_url, rating, M_rating, L_rating, P_rating, A_rating, url, M_comment, L_comment, P_comment, A_comment, userEmail })
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