<template>
    <div class="py-5 border-b border-gray-200">
        <div class="mx-auto max-w-2xl px-4 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-16">
            <label for="hs-trailing-button-add-on-with-icon" class="sr-only">Label</label>
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
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import axiosClient from '../../axios';
import store from '../../store';
import {
    MagnifyingGlassIcon,
    ArrowPathIcon
} from "@heroicons/vue/24/outline";
</script>
<script>
export default {
    data() {
        const searchItems = ref(null);

        return {
            search: searchItems.value,
            searching: false
        }
    },
    methods: {
        async logout() {
            await store.dispatch('csrf');
            await store.dispatch('logout');

            this.$router.go();
        },
        searchProduct() {
            console.log("ok");
            this.searching = true;
            const key = this.$refs.itemSearch.value;

            if (key !== '' && key.length > 2) {
                axiosClient.get('/api/v1/product/search/' + key)
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
            if (key.length === 0) {
                this.search = null;
            }
        }
    }
}
</script>