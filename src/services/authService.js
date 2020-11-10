import jwtDecode from 'jwt-decode';
import http from './httpService';
import {
  apiUrl
} from '../config.json';
const apiEndpoint= apiUrl + '/auth/login';
const tokenKey = 'token';

http.setJwt(getJwt());

export async function login(username, password) {
  const {
    data: jwt
  } = await http.post(apiEndpoint, {
    username,
    password
  });
  localStorage.setItem(tokenKey, jwt.token);
}

export function loginWithJwt(jwt) {
  localStorage.setItem('token', jwt);
}
export function logout() {
  localStorage.removeItem('token');
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem('token');
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export async function getUserObject() {
  const {
    data
  } = await http.get(apiUrl + "/auth/user")
  return data;
}
export async function getUserObjectByUsername(user) {
  const {
    data
  } = await http.get(apiUrl + "/auth/users?email="+ user.username)
  return data;
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getUserObjectByUsername,
  getUserObject,
  getJwt
};