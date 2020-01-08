import axios from 'axios';
import NavigationService from './NavigationService';
import URL from '../config/server';
import {
  FETCH_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_FAILURE,
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_FAILURE,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAILURE,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAILURE
} from '../actions/types';

export const fetchEmployees = () => {
  return {
    types: [
      FETCH_EMPLOYEES_REQUEST,
      FETCH_EMPLOYEES_SUCCESS,
      FETCH_EMPLOYEES_FAILURE
    ],
    callAPI: () =>
      axios({
        method: 'get',
        url: `${URL}/api/employees`
      }),
    navigate: () => NavigationService.navigate('Employee')
  };
};

export const createEmployee = (
  name,
  email,
  phone,
  information,
  services,
  url,
  token
) => {
  const data = JSON.stringify({
    name: name,
    email: email,
    phone: phone,
    information: information,
    services: services,
    url: url
  });
  return {
    types: [
      CREATE_EMPLOYEE_REQUEST,
      CREATE_EMPLOYEE_SUCCESS,
      CREATE_EMPLOYEE_FAILURE
    ],
    callAPI: () =>
      axios.post(`${URL}/api/employees/`, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      }),
    navigate: () => NavigationService.navigate('EmployeeList')
  };
};

export const updateEmployee = (
  id,
  name,
  email,
  phone,
  information,
  services,
  url,
  token
) => {
  const data = JSON.stringify({
    name: name,
    email: email,
    phone: phone,
    information: information,
    services: services,
    url: url
  });

  return {
    types: [
      UPDATE_EMPLOYEE_REQUEST,
      UPDATE_EMPLOYEE_SUCCESS,
      UPDATE_EMPLOYEE_FAILURE
    ],
    callAPI: () =>
      axios.put(`${URL}/api/employees/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      }),
    navigate: () => NavigationService.navigate('EmployeeList')
  };
};

export const deleteEmployee = (id, token) => {
  return {
    types: [
      DELETE_EMPLOYEE_REQUEST,
      DELETE_EMPLOYEE_SUCCESS,
      DELETE_EMPLOYEE_SUCCESS
    ],
    callAPI: () =>
      axios.delete(`${URL}/api/employees/${id}`, {
        headers: {
          'x-auth-token': token
        }
      }),
    navigate: () => NavigationService.navigate('EmployeeList')
  };
};
