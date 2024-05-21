import axios from 'axios';

const API_URL = 'http://localhost:3001';

class AuthService {
  async login(username, password) {
    return axios
      .post(`${API_URL}/login`, { username, password })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        return response.data;
      });
  }

  async signup(username, password) {
    return axios
      .post(`${API_URL}/signup`, { username, password })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getAuthHeader() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }
}

export default new AuthService();
