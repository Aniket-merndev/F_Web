import axios from 'axios';
import { setUser, clearUser } from '../Store/User.js/UserSlice';
import { store } from '../Store/store';

export const initializeApp = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    // console.log("token: " + token);
    try {
      // Attach token to request headers
      const response = await axios.get(`${import.meta.env.VITE_REACT_SERVER_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("user: " + response.data.username);
      // Set user and token in Redux
      store.dispatch(setUser({ user: response.data.username, token }));
    } catch (error) {
      console.error('Failed to fetch user:', error);
      // Clear invalid token
      localStorage.removeItem('token');
      store.dispatch(clearUser());
    }
  } else {
    // Explicitly clear the user if no token is found
    store.dispatch(clearUser());
  }
};