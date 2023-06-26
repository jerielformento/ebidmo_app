import {createStore} from 'vuex'
import axiosClient from '../axios';

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('_ebm_app_session'),
        }
    },
    getters: {},
    actions: {
        csrf({commit}) {
            return axiosClient.get(import.meta.env.VITE_CSRF_AUTH_URL);
        },
        register({commit}, user) {
            return axiosClient.post('/api/register', user)
                .then(({data}) => {
                    //commit('setUser', data);
                    return data;
                })
        },
        login({commit}, user) {
            return axiosClient.post('/api/login', user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
                })
        },
        logout({commit}) {
            return axiosClient.post('/api/logout')
                .then(() => {
                    commit('logout');
                })
        }
    },
    mutations: {
        logout: (state) => {
            state.user.token = null;
            state.user.data = {};
            sessionStorage.clear();
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem("_ebm_app_session", userData.token);
        }
    },
    modules: {}
})

export default store;