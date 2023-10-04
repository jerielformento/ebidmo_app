import axios from 'axios';
import store from './store';
import router from './router'
import { ref } from 'vue';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`

    return config;
},
(error) => {
  return Promise.reject(error);
})

/* axiosClient.interceptors.response.use(response => {
    return response;
  }, (error) =>  {
    if(error.response.status === 401) {
        const router = useRouter();
        //...
        console.log('error');
        store.dispatch('refresh_token');
        //router.push({name:'login'});
    }
    return Promise.reject(error);
  }); */

  axiosClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      //const originalRequest = error.config;
  
      // Check if the error status is 401 (Unauthorized)
      if (error.response.status === 401) {
          console.log("error");
          store.commit('logout');
          router.push({name: 'login', query: {expired: 1}});
      }
  
      return Promise.reject(error);
    }
  );

export default axiosClient;