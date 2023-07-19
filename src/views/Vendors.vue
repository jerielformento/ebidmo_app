<template>
    <div class="bg-gray-100 h-screen flex flex-col justify-between">
    <HeaderNav/>
    <SearchBar/>
    <div>
        <div class="bg-gray-100 pb-10 mt-5">
            <Suspense>
                <template #default>
                    <div>
                    <StoreList/>
                </div>
                </template>
                <template #fallback>
                    <ItemsLoader/>
                </template>
            </Suspense>
        </div>
    </div>
    <FooterNav/>
</div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import HeaderNav from './layouts/Header.vue';
import FooterNav from './layouts/Footer.vue';
import SearchBar from './layouts/SearchBar.vue';
import StoreList from '../components/StoreList.vue';
import ItemsLoader from '../components/util/ItemsLoader.vue';
import { toast } from 'vue3-toastify';
import axiosClient from '../axios';
import store from '../store';
</script>
<script>
export default {
    data() {
        const storeInfo = ref({});
        const hasStore = ref(false);
        const loadBtn = ref(false);

        return {
            hasStore,   
            postdata: {
                name: ''
            },
            errordata: {
                name: ''
            },
            loadBtn,   
            storeInfo 
        }
    },
    methods: {
        async create() {
            this.loadBtn = true;
            // send request to api
            await store.dispatch('csrf');
            await axiosClient.post('/api/v1/store', this.postdata)
                .then(response => {
                    toast.success(response.data.message, {
                        position: toast.POSITION.TOP_CENTER,
                    });

                    // refresh page
                    this.$router.go();
                })
                .catch((error) => {
                    const err = error.response;

                    toast.error(err.data.errors.name, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                })
                .finally(() => {
                    this.loadBtn = false;
                });
        }
    }
}
</script>