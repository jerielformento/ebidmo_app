<template>
    <div v-if="!isLoading">
        <div v-if="hasStore">
            <div class="bg-gray-100 py-3">
                <main>
                    <div class="mx-auto">
                        <div class="grid grid-cols-1 sm:grid-cols-5 items-start gap-6">
                            <div class="col-span-3 bg-white p-4 rounded-md shadow">
                                <div class="flex items-center">
                                    <span class="mr-1 text-lg inline-block font-bold">Settings</span>
                                </div>
                                <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                    <div class="sm:col-span-6">
                                        <label for="name" class="block text-sm font-medium leading-6">Store Name</label>
                                        <div class="mt-2">
                                            <input id="name" name="name" type="text" autocomplete="name"
                                                v-model="postdata.name" required
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
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
                                                        class="w-full mt-3 font-bold shadow-sm tracking-tight text-gray-700 items-center justify-between inline-block bg-white px-5 py-3 border border-gray-200 rounded-md">
                                                        <div class="flex items-center">
                                                            <span class="mr-1 text-lg inline-block">{{ postdata.name }}</span>
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
                                        <!-- <button type="submit" class="mt-3 mr-2 flex items-center justify-center border border-gray-200 rounded-md disabled:opacity-80 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200">
                            Cancel
                        </button> -->
                                        <ButtonForm @onClick="update" text="Update Information" :state="isSubmit"/>
                                        
                                    </div>
                                </div>
                            </div>

                            <div class="col-span-2 bg-white p-4 rounded-md shadow">
                                <div class="flex items-center">
                                    <span class="mr-1 text-lg inline-block font-bold">Security</span>
                                </div>
                                    <div class="mt-5 p-4 border border-gray-200 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
                                        role="alert">
                                        <div class="text-sm text-gray-400 dark:text-gray-300">
                                            No options available at this moment.
                                        </div>
                                    </div>
                                <!-- <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                                    <div class="sm:col-span-6">
                                        <label for="name" class="block text-sm font-medium leading-6">Current
                                            Password</label>
                                        <div class="mt-2">
                                            <input id="name" name="name" type="text" autocomplete="name" required
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                            <small class="text-red-400"></small>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-6">
                                        <label for="name" class="block text-sm font-medium leading-6">New Password</label>
                                        <div class="mt-2">
                                            <input id="name" name="name" type="text" autocomplete="name" required
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                            <small class="text-red-400"></small>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-6">
                                        <label for="name" class="block text-sm font-medium leading-6">Confirm New
                                            Password</label>
                                        <div class="mt-2">
                                            <input id="name" name="name" type="text" autocomplete="name" required
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                            <small class="text-red-400"></small>
                                        </div>
                                    </div>

                                    <div class="sm:col-span-6 flex justify-end">
                                        <button type="submit"
                                            class="mt-3 flex items-center justify-center rounded-md disabled:opacity-80 bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                                            Update Password
                                        </button>
                                    </div>
                                </div> -->
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
import ButtonForm from '../components/forms/Button.vue';

export default {
    components: { ButtonForm, ItemsLoader, StarIcon, ShieldCheckIcon, BellIcon, MagnifyingGlassIcon, CheckIcon, ArrowPathIcon, Spinner },
    async setup() {
        const storeInfo = ref({});
        const hasStore = ref(false);
        const isLoading = ref(true);
        const loadBtn = ref(false);
        const isSubmit = ref(false);

        onMounted(async () => {
            initFlowbite();
        });

        const result = await axiosClient.get('/api/v1/customer')
                .then(response => {
                    //console.log(response.data.store);

                    storeInfo.value = response.data;
                    if (response.data.store !== null) {
                        hasStore.value = true;
                    }
                    isLoading.value = false;
                });

        return {
            siteUrl: import.meta.env.VITE_API_URL,
            hasStore,
            isLoading,
            postdata: {
                name: storeInfo.value.store.name ?? '',
                slug: storeInfo.value.store.slug ?? ''
            },
            errordata: {
                name: ''
            },
            loadBtn,
            storeInfo,
            isSubmit
        }
    },
    methods: {
        async update() {
           
            this.isSubmit = true;

            await store.dispatch('csrf');
            await axiosClient.put('/api/v1/stores/'+this.storeInfo.store.slug, {
                    name: this.postdata.name
                })
                .then(response => {
                    // reset error data
                    Object.entries(this.errordata).forEach(entry => {
                        const [key, value] = entry;
                        this.errordata[key] = '';
                    });

                    toast.success(response.data.message, {
                        position: toast.POSITION.BOTTOM_CENTER,
                    });
                    
                    // refresh page
                    //this.reload();
                })
                .catch((error) => {
                    const err = error.response;

                    // reset error data
                    Object.entries(this.errordata).forEach(entry => {
                        const [key, value] = entry;
                        this.errordata[key] = '';
                    });

                    // get return object errors and pass to error inputs
                    Object.entries(err.data.errors).forEach(entry => {
                        const [key, value] = entry;
                        this.errordata[key] = value[0];
                    });
                    
                    //this.reload();
                })
                .finally(() => {
                    this.isSubmit = false;
                    //this.closeModal();
                });
        }
    }
}
</script>