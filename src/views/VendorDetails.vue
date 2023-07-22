<template>
    <div class="bg-gray-100 h-screen flex flex-col justify-between">
    <HeaderNav/>
    <SearchBar/>
    <div v-if="!isLoading">
        <div v-if="hasStore">
        <div class="bg-gray-100">
            <div class="mx-auto max-w-6xl">
                <div class="bg-cover bg-center" :style="`height:10rem; background-image: url(${siteUrl}/images/store_cover.png);`">
                    <div class="flex items-end h-full w-full bg-gray-900 bg-opacity-30">
                        <!-- store info -->
                        <div class="w-auto px-3 sm:px-3 sm:py-1 mb-5">
                            <h2 class="w-full mt-3 font-bold shadow-sm tracking-tight text-gray-700 items-center justify-between inline-block bg-white px-5 py-3 border border-gray-200 rounded-sm">
                                <div class="flex items-center">
                                    <span class="mr-1 text-lg inline-block">{{ storeInfo.name }}</span>
                                    <ShieldCheckIcon v-if="storeInfo.verified === 1" class="h-6 w-6 text-green-500 inline-block"/>
                                    <ShieldExclamationIcon v-else class="h-6 w-6 text-gray-400 inline-block"/>
                                </div>
                                <div class="py-2 flex items-center">
                                    <div class="flex items-center">
                                    <!-- Active: "text-gray-900", Default: "text-gray-200" -->
                                    <StarIcon class="text-yellow-400 h-5 w-5 flex-shrink-0" />
                                    <StarIcon class="text-yellow-400 h-5 w-5 flex-shrink-0" />
                                    <StarIcon class="text-yellow-400 h-5 w-5 flex-shrink-0" />
                                    <StarIcon class="text-yellow-400 h-5 w-5 flex-shrink-0" />
                                    <StarIcon class="text-gray-200 h-5 w-5 flex-shrink-0" />
                                    </div>
                                    <p class="sr-only">4 out of 5 stars</p>
                                    <a href="#" class="ml-3 text-sm font-medium text-orange-500 hover:text-orange-600">117 reviews</a>
                                </div>
                                <p class="text-sm font-normal text-gray-400">100 Followers</p>
                            </h2>
                        </div>
                        <!-- store end info -->
                    </div>
                </div>
                <nav class="bg-gray-800">
                    <div class="mx-auto max-w-7xl px-2 sm:px-2 lg:px-4">
                        <div class="relative flex h-16 items-center justify-between">
                        
                        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div class="flex flex-shrink-0 items-center">

                            </div>
                            <div class="sm:ml-0">
                            <div class="flex space-x-2 lg:space-x-4">
                                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                                <router-link :to="{ name: 'store-products' }" 
                                    exact-active-class="bg-gray-900 text-white"
                                    class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                    Products
                                </router-link>
                                <router-link :to="{ name: 'store-auctions' }" 
                                    exact-active-class="bg-gray-900 text-white"
                                    class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                    Auctions
                                </router-link>
                                <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Reviews</a>
                            </div>
                            </div>
                        </div>
                        <div class="inset-y-0 right-0 flex items-center sm:relative">
                            <button type="submit" onclick="alert(1)" class="flex items-center ml-2 rounded-sm bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400">
                                <BellIcon class="h-6 w-6 mr-1"/>
                                Follow
                            </button>
                        </div>
                        <div class="relative inset-y-0 right-0 ml-2 block lg:flex rounded-md shadow-sm h-9">
                            <input @keyup.enter="searchProduct" @keyup="searchKey" type="text" ref="itemSearch" id="hs-trailing-button-add-on-with-icon" placeholder="Search in store" name="hs-trailing-button-add-on-with-icon" class="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-sm text-sm focus:z-10 focus:border-orange-400 focus:ring-orange-400 dark:border-gray-100 text-gray-500">
                            <button type="button" class="inline-flex flex-shrink-0 justify-center items-center h-9 w-[2.875rem] bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 rounded-r-sm">
                                <MagnifyingGlassIcon class="h-6 w-6"/>
                            </button>
                        </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>

        <div class="bg-gray-100 mt-6 pb-10">
                <Suspense>
                    <template #default>
                        <div>
                            <router-view :store="route.params.store" :search="search"></router-view>
                        </div>
                    </template>
                    <template #fallback>
                        <ItemsLoader/>
                    </template>
                </Suspense>
            </div>
        </div>
        <div v-else class="relative">
            <!-- no store -->
            <div class="bg-gray-100 pb-5">
                <div class="mx-auto max-w-2xl px-4 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-16">
                    <h2 class="w-full mt-3 shadow-sm tracking-tight text-gray-700 items-center justify-between inline-block bg-white px-5 py-3 border border-gray-200 rounded-sm">
                        <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-5">
                            <div class="sm:col-span-3">
                                <div class="mb-2">
                                    <span class="font-bold text-lg">Setup your own store now</span>
                                </div>
                                <label for="store-name" class="block text-sm font-medium leading-6">Store Name</label>
                                <div class="my-2">
                                    <input v-model="postdata.name" :class="{ 'ring-2 ring-inset ring-red-500': errordata.name !== ''}" id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                    <small v-if="errordata.name !== ''" class="text-red-400">{{ errordata.name }}</small>
                                </div>
                                <button @click.prevent="create" :disabled="loadBtn" type="submit" class="flex items-center justify-end rounded-sm disabled:opacity-80 bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                                    Create
                                    <ArrowPathIcon class="animate-spin h-5 w-5 ml-1" v-if="loadBtn"/>
                                </button>
                            </div>
                            <div class="sm:col-span-3 border-2 border-dashed border-gray-200 p-3 text-gray-500">
                                <div class="mb-2">
                                    <h2 class="font-bold text-lg mb-2">Store Features</h2>
                                    <ol>
                                        <li class="flex items-center"><span>Upload your own products</span> <CheckIcon class="ml-1 h-5 w-5 inline-block text-green-600"/></li>
                                        <li class="flex items-center">Set a live auction of your products <CheckIcon class="ml-1 h-5 w-5 inline-block text-green-600"/></li>
                                        <li class="flex items-center">Monitoring of auctioned items <CheckIcon class="ml-1 h-5 w-5 inline-block text-green-600"/></li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </h2>
                </div>
            </div>
            <!-- end no store -->
        </div>
    </div>
    <div v-else>
        <div class="bg-gray-100 pb-10">
            <div class="mx-auto max-w-6xl animate-pulse">
                <div class="bg-cover bg-center h-40 bg-gray-200">
                    
                </div>
                <nav class="bg-gray-300 h-14">
                    
                </nav>
                <div class="bg-gray-200 mt-4 p-3">
                    <div class="relative grid grid-cols-1 gap-y-2">
                    <div class="bg-gray-300 h-4 w-52"></div>
                    <div class="bg-gray-300 h-4 w-40"></div>
                    <div class="bg-gray-300 h-4 w-32"></div>
                    </div>
                </div>
            </div>
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
import ItemsLoader from '../components/util/ItemsLoader.vue';
import { toast } from 'vue3-toastify';
import { StarIcon, ShieldCheckIcon, ShieldExclamationIcon } from "@heroicons/vue/24/solid";
import { BellIcon, MagnifyingGlassIcon, CheckIcon, ArrowPathIcon } from "@heroicons/vue/24/outline";
import axiosClient from '../axios';
import store from '../store';
import { useRoute } from 'vue-router';
</script>
<script>
export default {
    data() {
        const route = useRoute();
        const storeInfo = ref({});
        const hasStore = ref(false);
        const isLoading = ref(true);
        const loadBtn = ref(false);        
        const search = ref(null);

        onMounted(async() => {
            
            const result = await axiosClient.get(`/api/v1/store/${route.params.store}`)
                .then(response => {
                    //console.log(response.data.store);

                    storeInfo.value = response.data;
                    if(response.data.store !== null) {
                        hasStore.value = true;
                    }
                    isLoading.value = false;
                });
        });

        return {
            siteUrl: import.meta.env.VITE_API_URL,
            route,
            hasStore,
            isLoading,     
            postdata: {
                name: ''
            },
            errordata: {
                name: ''
            },
            loadBtn,   
            storeInfo,
            search,
            route
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
        },
        async searchProduct() {
            const key = this.$refs.itemSearch.value;
            this.search = key;
        },
        searchKey() {
            const key = this.$refs.itemSearch.value;
            if(key.length === 0) {
                this.search = key;
            }
        }, 
    }
}
</script>