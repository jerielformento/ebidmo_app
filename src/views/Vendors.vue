<template>
    <div class="bg-gray-100 h-screen flex flex-col justify-between">
    <HeaderNav/>
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
<script>
import { ref, onMounted } from 'vue'
import HeaderNav from './layouts/Header.vue';
import FooterNav from './layouts/Footer.vue';
import StoreList from '../components/StoreList.vue';
import ItemsLoader from '../components/util/ItemsLoader.vue';
import { toast } from 'vue3-toastify';
import { StarIcon, ShieldCheckIcon } from "@heroicons/vue/24/solid";
import { BellIcon, MagnifyingGlassIcon, CheckIcon, ArrowPathIcon } from "@heroicons/vue/24/outline";
import axiosClient from '../axios';
import store from '../store';

export default {
    components: { HeaderNav, FooterNav, StoreList, ItemsLoader, StarIcon, ShieldCheckIcon, BellIcon, MagnifyingGlassIcon, CheckIcon, ArrowPathIcon },
    setup() {
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