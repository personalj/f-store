import axios from 'axios';
import Vue from 'vue'

export const http = axios.create({
  baseURL:  process.env.VUE_APP_API,
  headers: { 'Content-Type': 'application/json' }
})

http.interceptors.request.use(function (config) {
  return config;
}, error => {
  if (error.response.status === 401) {
    ///////
  } else {
      Vue.$toast.open({
          message:  'response.data.errors.message' || error,
          type: 'error'
      })
  }
  return Promise.reject(error);
});
