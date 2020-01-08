import axios from 'axios';
import NavigationService from './NavigationService';
import URL from '../config/server';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGOUT_USER,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from './types';

function timeoutPromise(ms, promise) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(
        (error = { response: { data: 'Przekroczono limit czasu żądania' } })
      );
    }, ms);
    promise.then(
      res => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      err => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
}

export function loginUser(email, password) {
  const data = JSON.stringify({
    email: email,
    password: password
  });
  return {
    types: [LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE],
    callAPI: () =>
      timeoutPromise(
        5000,
        axios({
          method: 'post',
          url: `${URL}/api/auth`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        })
      ),
    navigate: () => NavigationService.navigate('Home')
  };
}

export const registerUser = (name, email, password, confirmPassword, phone) => {
  const data = JSON.stringify({
    name: name,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    phone: phone
  });

  return {
    types: [REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE],
    callAPI: () =>
      timeoutPromise(
        5000,
        axios({
          method: 'post',
          url: `${URL}/api/users`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        })
      ),
    navigate: () => NavigationService.navigate('SignIn')
  };
};

export function logoutUser() {
  return dispatch => {
    dispatch({ type: LOGOUT_USER });
    NavigationService.navigate('SignIn');
  };
}
