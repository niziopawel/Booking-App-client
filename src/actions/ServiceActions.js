import axios from 'axios';
import NavigationService from './NavigationService';
import URL from '../config/server';

import {
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_FAILURE,
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAILURE,
  CREATE_SERVICE_REQUEST,
  CREATE_SERVICE_SUCCESS,
  CREATE_SERVICE_FAILURE,
  DELETE_SERVICE_REQUEST,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAILURE
} from '../actions/types';

export const fetchServices = () => {
  return {
    types: [
      FETCH_SERVICES_REQUEST,
      FETCH_SERVICES_SUCCESS,
      FETCH_SERVICES_FAILURE
    ],
    callAPI: () =>
      axios({
        method: 'get',
        url: `${URL}/api/services`
      }),
    navigate: () => console.log('navigate')
  };
};

export const updateService = (
  id,
  name,
  description,
  price,
  duration,
  token
) => {
  const data = JSON.stringify({
    name: name,
    description: description,
    price: parseFloat(price),
    duration: parseInt(duration)
  });
  return {
    types: [
      UPDATE_SERVICE_REQUEST,
      UPDATE_SERVICE_SUCCESS,
      UPDATE_SERVICE_FAILURE
    ],
    callAPI: () =>
      axios.put(`${URL}/api/services/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      }),
    navigate: () => NavigationService.navigate('ServiceList')
  };
};

export const deleteService = (id, token) => {
  return {
    types: [
      DELETE_SERVICE_REQUEST,
      DELETE_SERVICE_SUCCESS,
      DELETE_SERVICE_FAILURE
    ],
    callAPI: () =>
      axios.delete(`${URL}/api/services/${id}`, {
        headers: {
          'x-auth-token': token
        }
      }),
    navigate: () => NavigationService.navigate('ServiceList')
  };
};

export const createService = (name, description, price, duration, token) => {
  const data = JSON.stringify({
    name: name,
    description: description,
    price: parseFloat(price),
    duration: parseInt(duration)
  });

  return {
    types: [
      CREATE_SERVICE_REQUEST,
      CREATE_SERVICE_SUCCESS,
      CREATE_SERVICE_FAILURE
    ],
    callAPI: () =>
      axios.post(`${URL}/api/services/add-service`, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      }),
    navigate: () => NavigationService.navigate('ServiceList')
  };
};
