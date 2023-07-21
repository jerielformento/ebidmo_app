<template>
<div v-if="isLoaded">
   <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
      <span class="sr-only">Open sidebar</span>
      <Bars3Icon class="h-6 w-6 text-gray-400"/>
   </button>

   <div v-if="hasStore">
      <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
         <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
         <div class="mb-4 flex justify-center items-center">
            <a href="/">
                  <img :src="`${siteUrl}/images/ebidmo_text.png`" class="w-auto h-8"/>
            </a>
         </div>
            <ul class="space-y-2 font-semibold text-sm text-gray-400">
               <li>
<<<<<<< HEAD
                  <router-link :to="{ name: 'vendor-home' }" active-class="bg-gray-600 text-amber-400 hover:text-amber-400" class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
=======
                  <router-link :to="{ name: 'vendor-home' }" exact-active-class="bg-gray-600 text-amber-400 hover:text-amber-400" class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
>>>>>>> development
                     <ChartBarIcon class="h-6 w-6" />
                     <span class="ml-3">Dashboard</span>
                  </router-link>
               </li>
               <li>
<<<<<<< HEAD
                  <router-link :to="{ name: 'vendor-products' }" active-class="bg-gray-600 text-amber-400 hover:text-amber-400" class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
=======
                  <router-link :to="{ name: 'vendor-products' }" exact-active-class="bg-gray-600 text-amber-400 hover:text-amber-400" class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
>>>>>>> development
                     <ShoppingCartIcon class="h-6 w-6" />
                     <span class="ml-3">Products</span>
                  </router-link>
               </li>
               <li>
<<<<<<< HEAD
                  <router-link :to="{ name: 'vendor-auction' }" active-class="bg-gray-600 text-amber-400 hover:text-amber-400" class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
=======
                  <router-link :to="{ name: 'vendor-auction' }" exact-active-class="bg-gray-600 text-amber-400 hover:text-amber-400" class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
>>>>>>> development
                     <FireIcon class="h-6 w-6" />
                     <span class="ml-3">Auctions</span>
                  </router-link>
               </li>
               <li>
<<<<<<< HEAD
                  <router-link :to="{ name: 'vendor-transaction' }" active-class="bg-gray-600 text-amber-400 hover:text-amber-400" class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
=======
                  <router-link :to="{ name: 'vendor-transaction' }" exact-active-class="bg-gray-600 text-amber-400 hover:text-amber-400" class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
>>>>>>> development
                     <TruckIcon class="h-6 w-6" />
                     <span class="ml-3">Transaction</span>
                  </router-link>
               </li>
               <li>
<<<<<<< HEAD
                  <router-link :to="{ name: 'vendor-settings' }" active-class="bg-gray-600 text-amber-400 hover:text-amber-400" class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
=======
                  <router-link :to="{ name: 'vendor-settings' }" exact-active-class="bg-gray-600 text-amber-400 hover:text-amber-400" class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
>>>>>>> development
                     <Cog6ToothIcon class="h-6 w-6" />
                     <span class="ml-3">Store Settings</span>
                  </router-link>
               </li>
            </ul>
         </div>
      </aside>
      <div class="p-4 sm:ml-64">
         <div class="p-2 border-dashed rounded-lg">
            <Suspense>
               <router-view></router-view>
            </Suspense>
         </div>
      </div>
   </div>
   <div v-else class="relative">
      <!-- no store -->
      <div class="bg-gray-100 pb-5 mt-10">
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
                           <div class="flex items-center justify-between">
                              <router-link 
                                 :to="{name: 'home'}" 
                                 class="mr-1 flex items-center justify-center border border-gray-200 rounded-sm disabled:opacity-80 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200">
                                 Back to Home
                              </router-link>
                              <button @click.prevent="create" :disabled="loadBtn" type="submit" class="flex items-center justify-end rounded-sm disabled:opacity-80 bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                                 Create Store
                                 <ArrowPathIcon class="animate-spin h-5 w-5 ml-1" v-if="loadBtn"/>
                              </button>
                           </div>
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
   <div class="bg-gray-100 pb-5 mt-10">
      <div class="mx-auto max-w-2xl px-4 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-16 flex justify-center text-gray-600">
            <ArrowPathIcon class="h-6 w-6 animate-spin mr-1"/> Authenticating ...
      </div>
   </div>
</div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify';
import { 
    CheckIcon, 
    ArrowPathIcon, 
    ShoppingCartIcon, 
    ChartBarIcon,
    FireIcon,
    TruckIcon,
    Bars3Icon,
    Cog6ToothIcon
} from "@heroicons/vue/24/outline";
import axiosClient from '../axios';
import store from '../store';
</script>

<script>
export default {
   data() {
      const hasStore = ref(false);
      const storeInfo = ref({});
      const loadBtn = ref(false);
      const isLoaded = ref(false);

      onMounted(async() => {
            const result = await axiosClient.get('/api/v1/customer')
                .then(response => {
                    //console.log(response.data.store);

                     storeInfo.value = response.data;
                     if(response.data.store !== null) {
                           hasStore.value = true;
                     }
                });

            isLoaded.value = true;
        });

        return {
            siteUrl: import.meta.env.VITE_API_URL,
            postdata: {
                name: ''
            },
            errordata: {
                name: ''
            },
            hasStore,
            storeInfo,
            loadBtn,
            isLoaded
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