<template>
    <div class="py-5 border-b border-gray-200">
        <div class="mx-auto max-w-2xl px-4 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-16">
            <!-- <label for="hs-trailing-button-add-on-with-icon" class="sr-only">Label</label>
            <div class="flex rounded-md shadow-sm relative">
                <input @keyup.enter="searchProduct" @keyup="searchKey" ref="itemSearch" type="text"
                    id="hs-trailing-button-add-on-with-icon" placeholder="Search in eBidMo"
                    name="hs-trailing-button-add-on-with-icon"
                    class="py-3 px-4 block w-full border-gray-200 placeholder:text-gray-400 shadow-sm rounded-sm text-sm focus:z-10 focus:border-amber-400 focus:ring-amber-400 dark:border-gray-100 text-gray-500">
                <button @click="searchProduct" type="button"
                    class="inline-flex flex-shrink-0 justify-center items-center h-[2.875rem] w-[2.875rem] bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 rounded-r-sm">
                    <MagnifyingGlassIcon class="h-6 w-6" />
                </button>
                <div class="absolute w-full z-10 top-10 mt-1 rounded-b-md border border-gray-200 shadow-md">
                    <div v-if="!this.searching" v-for="item in this.search"
                        class="group w-full inline-block bg-white py-1 px-4 hover:bg-gray-50 cursor-pointer">
                        <router-link :to="{ name: 'product-details', params: { store: item.store.slug, id: item.slug } }"
                            class="text-amber-500 bg-gray-500">
                            <div class="w-full">{{ item.name }} <span class="text-xs text-gray-400">{{
                                item.brand.description }}</span>
                            </div>
                        </router-link>
                    </div>
                    <div v-else class="group w-full inline-block bg-white py-1 px-4 hover:bg-gray-50 cursor-pointer">
                        <div class="w-full flex justify-center items-center p-1">
                            <ArrowPathIcon class="animate-spin text-gray-400 h-4 w-4" />
                        </div>
                    </div>
                </div>
            </div> -->

            <div class="relative">   
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="text" @keyup.enter="searchProduct" @keyup="searchKey" ref="itemSearch" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-sm bg-gray-50 focus:ring-amber-400 focus:border-amber-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-400 dark:focus:border-amber-400" placeholder="Search in eBidMo" required>
                    <button @click="searchProduct" type="button" class="text-white absolute right-2.5 bottom-2.5 bg-slate-900 hover:bg-slate-950 focus:ring-2 focus:outline-none focus:ring-gray-200 font-medium rounded-sm text-sm px-4 py-2">Search</button>
                </div>
                <div class="absolute w-full z-10 top-10 mt-3 rounded-b-md border border-gray-200 shadow-md">
                    <div v-if="!this.searching" v-for="item in this.search"
                        class="group w-full inline-block bg-white py-1 px-4 hover:bg-gray-50 cursor-pointer">
                        <router-link :to="{ name: 'product-details', params: { store: item.store.slug, id: item.slug } }"
                            class="text-amber-500 bg-gray-500">
                            <div class="w-full">{{ item.name }} <span class="text-xs text-gray-400">{{
                                item.brand.description }}</span>
                            </div>
                        </router-link>
                    </div>
                    <div v-else class="group w-full inline-block bg-white py-1 px-4 hover:bg-gray-50 cursor-pointer">
                        <div class="w-full flex justify-center items-center p-1">
                            <Spinner class="animate-spin text-gray-400 h-4 w-4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import axiosClient from '../../axios';
import store from '../../store';
import {
    MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";
import Spinner from '../../components/forms/Spinner.vue';
export default {
    components: { MagnifyingGlassIcon, Spinner },
    setup() {
        const searching = ref(false);
        const searchItems = ref(null);

        return {
            search: searchItems.value,
            searching
        }
    },
    methods: {
        async logout() {
            await store.dispatch('csrf');
            await store.dispatch('logout');

            this.$router.go();
        },
        searchProduct() {
            this.searching = true;
            const key = this.$refs.itemSearch.value;

            if (key !== '' && key.length > 2) {
                axiosClient.get('/api/v1/products/search/' + key)
                    .then(response => {
                        this.search = response.data;
                        this.searching = false;
                    })
                    .catch((errors) => {
                        this.searching = false;
                    });
            } else { 
                this.searching = false;
                this.search = null;
            }
        },
        searchKey() {
            const key = this.$refs.itemSearch.value;
            
            if (key === '' && key.length === 0) {
                this.searchProduct();
            }
        }
    }
}
</script>