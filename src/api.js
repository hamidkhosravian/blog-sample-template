import axios from 'axios';

var axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/',
    /* other custom settings */
});

export default {
  user: {
    sign_up: (user) => axiosInstance.post('/api/v1/sign_up', user).then(res => res),
    sign_in: (user) => axiosInstance.post('/api/v1/sign_in', user).then(res => res.data)
  }
}
