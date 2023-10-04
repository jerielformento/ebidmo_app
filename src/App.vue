<template>
    <router-view></router-view>
</template>
<script>
    import { ref, computed, reactive } from 'vue'
    import { useHead } from '@vueuse/head'
    import store from './store';
    import axiosClient from './axios';

    export default {
        setup() {
            const siteData = reactive({
                'title': 'eBidMo - Online Auction',
                'description': 'Online Auction in the Philippines'
            })

            useHead({
                title: computed(() => siteData.title),
                meta: [
                    {
                        name: 'description',
                        content: computed(() => siteData.description),
                    }
                ]
            })
        },
        data() {
            const refresh = ref(null);
            const _retry = ref(0);

            /* refresh.value = setInterval(async() => {
                await axiosClient.get('/api/refresh-token')
                .then(({data}) => {
                    console.log("token refreshed!")
                    store.commit('refreshToken', data);
                    _retry.value = 0;
                    return data;
                })
                .catch((error) => {
                    if(error.response.status === 401 && _retry.value === 1) {
                        this.clearRefreshToken();
                    } else {
                        _retry.value = 1;
                    }
                });
            }, 120000); */

            return {
                refresh
            }
        },
        methods: {
            clearRefreshToken() {
                console.log('wewe');
                clearInterval(this.refresh);
            }
        }
    }
</script>
<style>

</style>