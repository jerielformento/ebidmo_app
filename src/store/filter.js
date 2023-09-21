import { createStore } from 'vuex'
import axiosClient from '../axios';

const filter = createStore({
    state: {
        
    },
    getters: {},
    actions: {
        auction_types({commit}, filter) {
            return axiosClient.get('/api/util/auction/types').
                then(response => { 
                    let gb = [];

                    response.data.map(function(value, key) {
                        gb.push({
                            id: value.id,
                            description: value.description,
                            is_active: ((value.id === filter) ? true : false)
                        });
                    });
                    return gb;
                });
        },
        categories({commit}, filter) {
            return axiosClient.get('/api/util/product/categories').
                then(response => {
                    let gb = [];

                    response.data.map(function(value, key) {
                        gb.push({
                            id: value.id,
                            title: value.title,
                            is_active: ((value.id === filter) ? true : false)
                        });
                    });
                    return gb;
                });
        },
        brands({commit}, filter) {
            return axiosClient.get('/api/util/product/brands').
                then(response => {
                    let gb = [];

                    response.data.map(function(value, key) {
                        gb.push({
                            id: value.id,
                            description: value.description,
                            is_active: ((value.id === filter) ? true : false)
                        });
                    });
                    return gb;
                });
        },
        conditions({commit}, filter) {
            return axiosClient.get('/api/util/product/conditions').
                then(response => { 
                    let gb = [];

                    response.data.map(function(value, key) {
                        gb.push({
                            id: value.id,
                            description: value.description,
                            is_active: ((value.id === filter) ? true : false)
                        });
                    });
                    return gb;
                });
        },
        locations({commit}, filter) {
            return axiosClient.get('/api/util/product/locations').
                then(response => { 
                    let gb = [];

                    response.data.map(function(value, key) {
                        gb.push({
                            id: value.id,
                            description: value.name,
                            is_active: ((value.id === filter) ? true : false)
                        });
                    });
                    return gb;
                });
        },
        couriers({commit}, filter) {
            return axiosClient.get('/api/util/couriers').
                then(response => { 
                    let gb = [];

                    response.data.map(function(value, key) {
                        gb.push({
                            id: value.id,
                            description: value.name,
                            is_active: ((value.id === filter) ? true : false)
                        });
                    });
                    return gb;
                });
        },

    },
    mutations: {
        
    },
    modules: {}
})

export default filter;