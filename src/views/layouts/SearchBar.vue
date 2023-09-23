<template>
    <div class="py-5 border-b border-gray-200">
        <div class="mx-auto max-w-2xl px-4 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-16">
            <div class="relative">   
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MagnifyingGlassIcon class="h-4 w-4 text-gray-400"/>
                    </div>
                    <input type="text" @keyup.enter="searchProduct" @keyup="searchKey" ref="itemSearch" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-200 rounded-md bg-gray-50 focus:ring-amber-400 focus:border-amber-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-400 dark:focus:border-amber-400" placeholder="Search in eBidMo" required>
                    <button @click="searchProduct" type="button" class="text-white absolute right-2.5 bottom-2.5 bg-slate-900 hover:bg-slate-950 focus:ring-2 focus:outline-none focus:ring-gray-200 font-medium rounded-md text-sm px-4 py-2">Search</button>
                </div>
                <div class="absolute w-full z-10 top-10 mt-3">
                    <div v-if="!this.searching">
                        <div class="rounded-md">
                            <div v-for="item in this.search"
                                class="group w-full inline-block bg-white py-1 px-4 hover:bg-gray-50 cursor-pointer">
                                <router-link :to="{ name: 'product-details', params: { store: item.store.slug, id: item.slug } }"
                                    class="text-amber-500 bg-gray-500">
                                    <div class="w-full">{{ item.name }} <span class="text-xs text-gray-400">{{
                                        item.brand.description }}</span>
                                    </div>
                                </router-link>
                            </div>
                        </div>
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