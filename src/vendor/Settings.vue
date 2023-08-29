<template>
    <div v-if="!isLoading">
        <div v-if="hasStore">
            <div class="bg-gray-100 py-3">
                <main>
                    <div class="mx-auto">
                        <div class="grid grid-cols-1 sm:grid-cols-5 items-start gap-6">
                            <div class="col-span-3 bg-white p-4 rounded-sm shadow">
                                <div class="flex items-center">
                                    <span class="mr-1 text-lg inline-block font-bold">Settings</span>
                                </div>
                                <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                    <div class="sm:col-span-6">
                                        <label for="name" class="block text-sm font-medium leading-6">Store Name</label>
                                        <div class="mt-2">
                                            <input id="name" name="name" type="text" autocomplete="name"
                                                :value="storeInfo.store.name" required
                                                class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                            <small class="text-red-400"></small>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-6">
                                        <label for="name" class="block text-sm font-medium leading-6">Preview</label>
                                        <div class="bg-cover bg-center"
                                            :style="`height:10rem; background-image: url(${siteUrl}/images/store_cover.png);`">
                                            <div class="flex items-end h-full w-full bg-opacity-30">
                                                <!-- store info -->
                                                <div class="w-auto px-3 sm:px-3 sm:py-1 mb-5">
                                                    <h2
                                                        class="w-full mt-3 font-bold shadow-sm tracking-tight text-gray-700 items-center justify-between inline-block bg-white px-5 py-3 border border-gray-200 rounded-sm">
                                                        <div class="flex items-center">
                                                            <span class="mr-1 text-lg inline-block">{{ storeInfo.store.name
                                                            }}</span>
                                                            <ShieldCheckIcon class="h-6 w-6 text-green-500 inline-block" />
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
                                                            <a href="#"
                                                                class="ml-3 text-sm font-medium text-orange-500 hover:text-orange-600">117
                                                                reviews</a>
                                                        </div>
                                                        <p class="text-sm font-normal text-gray-400">100 Followers</p>
                                                    </h2>
                                                </div>
                                                <!-- store end info -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-6 flex justify-end">
                                        <!-- <button type="submit" class="mt-3 mr-2 flex items-center justify-center border border-gray-200 rounded-sm disabled:opacity-80 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200">
                            Cancel
                        </button> -->
                                        <button type="submit"
                                            class="mt-3 flex items-center justify-center rounded-sm disabled:opacity-80 bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                                            Update Information
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="col-span-2 bg-white p-4 rounded-sm shadow">
                                <div class="flex items-center">
                                    <span class="mr-1 text-lg inline-block font-bold">Security</span>
                                </div>
                                <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                                    <div class="sm:col-span-6">
                                        <label for="name" class="block text-sm font-medium leading-6">Current
                                            Password</label>
                                        <div class="mt-2">
                                            <input id="name" name="name" type="text" autocomplete="name" required
                                                class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                            <small class="text-red-400"></small>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-6">
                                        <label for="name" class="block text-sm font-medium leading-6">New Password</label>
                                        <div class="mt-2">
                                            <input id="name" name="name" type="text" autocomplete="name" required
                                                class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                            <small class="text-red-400"></small>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-6">
                                        <label for="name" class="block text-sm font-medium leading-6">Confirm New
                                            Password</label>
                                        <div class="mt-2">
                                            <input id="name" name="name" type="text" autocomplete="name" required
                                                class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                            <small class="text-red-400"></small>
                                        </div>
                                    </div>

                                    <div class="sm:col-span-6 flex justify-end">
                                        <button type="submit"
                                            class="mt-3 flex items-center justify-center rounded-sm disabled:opacity-80 bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="mx-auto sm:py-1 flex items-center justify-center">
                <Spinner class="h-6 w-6"/>
            </div>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import ItemsLoader from './util/ItemsLoader.vue';
import { toast } from 'vue3-toastify';
import { initFlowbite } from 'flowbite';
import { StarIcon, ShieldCheckIcon } from "@heroicons/vue/24/solid";
import { BellIcon, MagnifyingGlassIcon, CheckIcon, ArrowPathIcon } from "@heroicons/vue/24/outline";
import axiosClient from '../axios';
import store from '../store';
import Spinner from '../components/forms/Spinner.vue';

export default {
    components: { ItemsLoader, StarIcon, ShieldCheckIcon, BellIcon, MagnifyingGlassIcon, CheckIcon, ArrowPathIcon, Spinner },
    setup() {
        const storeInfo = ref({});
        const hasStore = ref(false);
        const isLoading = ref(true);
        const loadBtn = ref(false);

        onMounted(async () => {
            initFlowbite();

            const result = await axiosClient.get('/api/v1/customer')
                .then(response => {
                    //console.log(response.data.store);

                    storeInfo.value = response.data;
                    if (response.data.store !== null) {
                        hasStore.value = true;
                    }
                    isLoading.value = false;
                });
        });

        return {
            siteUrl: import.meta.env.VITE_API_URL,
            hasStore,
            isLoading,
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