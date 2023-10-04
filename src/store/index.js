import { createStore } from 'vuex'
import axiosClient from '../axios';

const store = createStore({
    state: {
        site: {
            prefix: 'eBidMo',
            title: null
        },
        user: {
            data: localStorage.getItem("_logu_prsnl_inf"),
            token: localStorage.getItem('_ebm_app_session'),
        },
        guest: {
            permission: localStorage.getItem('_guest'),
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
        auth({commit}, user) {
            return axiosClient.post('/api/authenticate', user)
                .then(({data}) => {
                    commit('setUser', data);
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
        refresh_token({commit}) {
            console.log("refresh...");
                setInterval(async() => {
                    console.log("get refresh token...");
        
                    await axiosClient.get('/api/refresh-token')
                .then(({data}) => {
                    //commit('refreshToken', data);
                    return data;
                })
                    .catch((error) => {
                        this.clearPolling();
                    });
                }, 120000);
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
            state.guest.permission = true;
            localStorage.clear();
            localStorage.removeItem("_ebm_app_session");
            localStorage.setItem("_guest", true);
        },
        setUser: (state, userData) => {
            // remove guest access
            state.guest.permission = false;
            localStorage.removeItem("_guest");

            // set logged in user access
            state.user.token = userData.token;
            state.user.data = userData.user;
            localStorage.setItem("_logu_prsnl_inf", JSON.stringify(userData.user));
            localStorage.setItem("_ebm_app_session", userData.token);
        },
        refreshToken: (state, userData) => {
            state.user.token = userData.refresh_token;
            localStorage.setItem("_ebm_app_session", userData.refresh_token);
        }
    },
    modules: {}
})

export default store;