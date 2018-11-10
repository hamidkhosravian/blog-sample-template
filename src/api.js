import axios from 'axios';

var axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/',
});

export default {
  user: {
    sign_up: (user) => axiosInstance.post('/api/v1/sign_up', user).then(res => res),
    sign_in: (user) => axiosInstance.post('/api/v1/sign_in', user).then(res => res.data)
  },
  articles: {
    list:   (pagination) => axiosInstance.get(`/api/v1/articles?page=${pagination.page}&limit=${pagination.limit}`).then(res => res.data.articles),
    show:   (id)    => axiosInstance.get(`/api/v1/articles/${id}`).then(res => res.data),
    create: (data)  => axiosInstance.post(`/api/v1/articles`).then(res => res.data),
    update: (id)    => axiosInstance.put(`/api/v1/articles/${id}`).then(res => res.data),
    delete: (id)    => axiosInstance.delete(`/api/v1/articles/${id}`).then(res => res.data)
  },
}
