import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
// Set token in cookies
export const setToken = (token, expires = 7) => {
  Cookies.set('auth_token', token, { 
    expires: expires,
    secure: true,
    sameSite: 'strict',
  });
};

// Get token from cookies
export const getToken = () => {
  return Cookies.get('auth_token');
};

// Remove token from cookies
export const removeToken = () => {
  Cookies.remove('auth_token');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

//Get Token Data
export const getTokenData = () => {
  const token = getToken();
  if (!token) return null;
  return jwtDecode(token);
  };