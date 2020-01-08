import axios from 'axios';
import NavigationService from './NavigationService';
import URL from '../config/server';
import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE
} from './types';

export const fetchNews = () => {
  return {
    types: [FETCH_POST_REQUEST, FETCH_POST_SUCCESS, FETCH_POST_FAILURE],
    callAPI: () =>
      axios({
        method: 'get',
        url: `${URL}/api/news`
      }),
    navigate: () => NavigationService.navigate('Home')
  };
};

export const createPost = (title, description, imageUrl, token) => {
  const data = JSON.stringify({
    title: title,
    description: description,
    url: imageUrl
  });

  return {
    types: [CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE],
    callAPI: () =>
      axios.post(`${URL}/api/news`, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      }),
    navigate: () => NavigationService.navigate('Home')
  };
};

export const updatePost = (id, title, description, imageUrl, token) => {
  const data = JSON.stringify({
    title: title,
    description: description,
    url: imageUrl
  });

  return {
    types: [UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE],
    callAPI: () =>
      axios.put(`${URL}/api/news/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      }),
    navigate: () => NavigationService.navigate('Home')
  };
};

export const deletePost = (id, token) => {
  console.log(token);
  return {
    types: [DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE],
    callAPI: () =>
      axios.delete(`${URL}/api/news/${id}`, {
        headers: {
          'x-auth-token': token
        }
      }),
    navigate: () => NavigationService.navigate('Home')
  };
};
