<template>
   <div v-if="isLoaded">
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" data-drawer-backdrop="false"
         type="button"
         class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
         <span class="sr-only">Open sidebar</span>
         <Bars3Icon class="h-6 w-6 text-gray-400" />
      </button>

      <div v-if="hasStore">
         <div v-if="!storeVerified" class="relative">
            <!-- no store -->
            <div class="bg-gray-100 pb-5 mt-10">
               <div class="mx-auto max-w-2xl px-4 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-16">
                  <h2
                     class="w-full mt-3 shadow-sm tracking-tight text-gray-700 items-center justify-between inline-block bg-white px-5 py-3 border border-gray-200 rounded-md">
                     <a href="/" class="flex items-center">
                        <img :src="`${siteUrl}/images/ebidmo_text.png`" class="h-8 mr-3" alt="Flowbite Logo" />
                        <span class="self-center text-xl font-bold whitespace-nowrap dark:text-white">Vendor Account</span>
                     </a>
                     <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-5">
                        <div class="sm:col-span-3">
                           <div class="mb-2">
                              <span class="font-bold text-lg flex items-center">
                                 <CheckIcon class="text-green-500 h-6 w-6 mr-2" /> Store verification has been submitted
                                 for approval.
                              </span>
                           </div>
                           <p class="text-gray-500">You will receive an email notification once approved.</p>
                           <div class="mt-2 flex items-center justify-between">
                              <router-link :to="{ name: 'home' }"
                                 class="mr-1 flex items-center justify-center border border-gray-200 rounded-md disabled:opacity-80 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200">
                                 <ArrowLongLeftIcon class="h-5 w-5 mr-1" /> Back to Home
                              </router-link>
                           </div>
                        </div>
                        <div class="sm:col-span-3 border-2 border-dashed border-gray-200 p-3 text-gray-500">
                           <div class="mb-2">
                              <h2 class="font-bold text-lg mb-2">Store Features</h2>
                              <ol>
                                 <li class="flex items-center"><span>Upload your own products</span>
                                    <CheckIcon class="ml-1 h-5 w-5 inline-block text-green-600" />
                                 </li>
                                 <li class="flex items-center">Set a live auction of your products
                                    <CheckIcon class="ml-1 h-5 w-5 inline-block text-green-600" />
                                 </li>
                                 <li class="flex items-center">Monitoring of auctioned items
                                    <CheckIcon class="ml-1 h-5 w-5 inline-block text-green-600" />
                                 </li>
                                 <li class="flex items-center">Monitoring of transactions
                                    <CheckIcon class="ml-1 h-5 w-5 inline-block text-green-600" />
                                 </li>
                                 <li class="flex items-center">Store customization
                                    <CheckIcon class="ml-1 h-5 w-5 inline-block text-green-600" />
                                 </li>
                              </ol>
                           </div>
                        </div>
                     </div>
                  </h2>
               </div>
            </div>
            <!-- end no store -->
         </div>
         <div v-else>
            <aside id="default-sidebar"
               class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
               aria-label="Sidebar">
               <div class="h-full px-3 py-4 overflow-y-auto bg-gray-800 dark:bg-gray-800">
                  <div class="mb-4 flex justify-center items-center">
                     <a href="/">
                        <img :src="`${siteUrl}/images/ebidmo_text.png`" class="w-auto h-8" />
                     </a>
                     <button type="button" data-drawer-hide="default-sidebar" aria-controls="default-sidebar" class="text-gray-400 lg:hidden md:hidden bg-transparent hover:text-gray-200 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close menu</span>
                     </button>
                  </div>
                  <ul class="space-y-2 font-semibold text-sm text-gray-400">
                     <li>
                        <router-link :to="{ name: 'vendor-home' }"
                           exact-active-class="bg-gray-600 text-amber-400 hover:text-amber-400"
                           class="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-700">
                           <ChartBarIcon class="h-6 w-6" />
                           <span class="ml-3">Dashboard</span>
                        </router-link>
                     </li>
                     <li>
                        <router-link :to="{ name: 'vendor-products' }"
                           active-class="bg-gray-600 text-amber-400 hover:text-amber-400"
                           class="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-700">
                           <ShoppingCartIcon class="h-6 w-6" />
                           <span class="ml-3">Products</span>
                        </router-link>
                     </li>
                     <li>
                        <router-link :to="{ name: 'vendor-auction' }"
                           active-class="bg-gray-600 text-amber-400 hover:text-amber-400"
                           class="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-700">
                           <FireIcon class="h-6 w-6" />
                           <span class="ml-3">Auctions</span>
                        </router-link>
                     </li>
                     <li>
                        <router-link :to="{ name: 'vendor-transaction' }"
                           active-class="bg-gray-600 text-amber-400 hover:text-amber-400"
                           class="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-700">
                           <TruckIcon class="h-6 w-6" />
                           <span class="ml-3">Transactions</span>
                        </router-link>
                     </li>
                     <li>
                        <router-link :to="{ name: 'vendor-settings' }"
                           exact-active-class="bg-gray-600 text-amber-400 hover:text-amber-400"
                           class="flex items-center p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-700">
                           <Cog6ToothIcon class="h-6 w-6" />
                           <span class="ml-3">Store Settings</span>
                        </router-link>
                     </li>
                  </ul>
               </div>
            </aside>
            <div class="p-4 sm:ml-64">
               <div class="p-2 border-dashed rounded-lg">
                  
                  <h2 class="text-2xl font-bold mb-4 flex items-center text-gray-700"><BuildingStorefrontIcon class="h-7 w-7 mr-2"/> {{ JSON.parse(store.state.user.data).store_name }}</h2>
                  <!-- Breadcrumb -->
                  <nav
                     class="flex px-3 py-2 mb-4 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                     aria-label="Breadcrumb">
                     <ol class="inline-flex items-center space-x-0 md:space-x-2">
                        <li class="inline-flex items-center">
                           <router-link :to="{ name: 'vendor-home' }"
                              class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-amber-500 dark:text-gray-400 dark:hover:text-white">
                              <HomeIcon class="h-5 w-5 mr-1" /> Home
                           </router-link>
                        </li>
                        <li aria-current="page">
                           <div class="flex items-center">
                              <ChevronRightIcon class="h-4 w-4"/>
                              <span class="ml-1 text-sm font-medium text-gray-400 md:ml-2 dark:text-gray-400">
                                 {{ route.meta.title }}
                              </span>
                           </div>
                        </li>
                     </ol>
                  </nav>
                  <Suspense>
                     <router-view :key="route"></router-view>
                  </Suspense>
               </div>
            </div>
         </div>
      </div>
      <div v-else class="relative">
         <!-- no store -->
         <div class="bg-gray-100 pb-5 mt-10">
            <div class="mx-auto max-w-2xl px-4 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-16">
               <h2
                  class="w-full mt-3 shadow-sm tracking-tight text-gray-700 items-center justify-between inline-block bg-white px-5 py-3 border border-gray-200 rounded-md">
                  <a href="/" class="flex items-center">
                     <img :src="`${siteUrl}/images/ebidmo_text.png`" class="h-8 mr-3" alt="Flowbite Logo" />
                     <span class="self-center text-xl font-bold whitespace-nowrap dark:text-white">Vendor Account</span>
                  </a>
                  <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-5">
                     <div class="sm:col-span-3">
                        <div class="mb-2">
                           <span class="font-bold text-lg text-gray-500">Setup your own store now</span>
                           <div class="mt-2 shadow-sm p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                              All of the submissions will be reviewed by our team within 24 hours to be approved.
                           </div>
                        </div>
                        <label for="store-name" class="block text-sm font-medium leading-6">Store Name</label>
                        <div class="my-2">
                           <input v-model="postdata.name"
                              :class="{ 'ring-2 ring-inset ring-red-500': errordata.name !== '' }" id="name" name="name"
                              type="text" autocomplete="name" required
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                           <small v-if="errordata.name !== ''" class="text-red-400">{{ errordata.name }}</small>
                        </div>
                        <label for="store-name" class="block text-sm font-medium leading-6">Social Media Link of Store<br/><small class="text-gray-400">Ex. FB Page, Lazada Store, Shopee Store, etc.</small></label>
                        <div class="my-2">
                           <input v-model="postdata.social_store_link"
                              :class="{ 'ring-2 ring-inset ring-red-500': errordata.social_store_link !== '' }" id="name" name="name"
                              type="text" autocomplete="name" required
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                           <small v-if="errordata.social_store_link !== ''" class="text-red-400">{{ errordata.social_store_link }}</small>
                        </div>
                        <div class="sm:col-span-4 mb-5">
                            <label for="images" class="block text-sm font-medium leading-6">Proof of Store Ownership (Screenshot)</label>
                            <div class="mt-2">
                                <div class="flex justify-normal items-center">
                                <input name="image" @change="onFileChange" ref="file" class="block w-auto text-sm text-gray-500 font-semibold border border-gray-200 rounded-md cursor-pointer bg-gray-50 focus:outline-none" id="file_input" type="file">
                            </div>
                                <p class="text-sm font-normal text-gray-400">File ext: jpg, png</p>
                            </div>
                            <small v-if="errordata.image !== ''" class="text-red-400">{{ errordata.image }}</small>
                        </div><hr/>

                        <div class="flex items-center justify-between mt-5">
                           <router-link :to="{ name: 'home' }"
                              class="mr-1 flex items-center justify-center border border-gray-200 rounded-md disabled:opacity-80 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200">
                              <ArrowLongLeftIcon class="h-5 w-5 mr-1" /> Back to Home
                           </router-link>
                           <Button @onClick="create()" text="Submit for review" :state="loadBtn" />
                        </div>
                     </div>
                     <div class="sm:col-span-3 border-2 border-dashed border-gray-200 p-3 text-gray-500">
                        <div class="mb-2">
                              <h2 class="font-bold text-lg mb-2">Store Features</h2>
                              <ol>
                                 <li class="flex items-center">
                                    <CheckCircleIcon class="mr-1 h-5 w-5 inline-block text-green-400" />
                                    Upload your own products
                                 </li>
                                 <li class="flex items-center">
                                    <CheckCircleIcon class="mr-1 h-5 w-5 inline-block text-green-400" />
                                    Set a live auction of your products
                                 </li>
                                 <li class="flex items-center">
                                    <CheckCircleIcon class="mr-1 h-5 w-5 inline-block text-green-400" />
                                    Monitoring of auctioned items
                                 </li>
                                 <li class="flex items-center">
                                    <CheckCircleIcon class="mr-1 h-5 w-5 inline-block text-green-400" />
                                    Monitoring of transactions
                                 </li>
                                 <li class="flex items-center">
                                    <CheckCircleIcon class="mr-1 h-5 w-5 inline-block text-green-400" />
                                    Store customization
                                 </li>
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
      <LoaderModal>Authenticating...</LoaderModal>
   </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify';
import {
   CheckIcon,
   ShoppingCartIcon,
   ChartBarIcon,
   FireIcon,
   TruckIcon,
   Bars3Icon,
   Cog6ToothIcon,
   ArrowLongLeftIcon,
   BuildingStorefrontIcon,
   ChevronRightIcon,
   HomeIcon,
   CreditCardIcon
} from "@heroicons/vue/24/outline";
import {
   CheckCircleIcon
} from "@heroicons/vue/24/solid";
import axiosClient from '../axios';
import store from '../store';
import Button from '../components/forms/Button.vue';
import { useRoute } from 'vue-router';
import LoaderModal from '../components/util/LoaderModal.vue';
const route = useRoute();
</script>
<script>
export default {
   data() {
      const hasStore = ref(false);
      const storeVerified = ref(false);
      const storeInfo = ref({});
      const loadBtn = ref(false);
      const isLoaded = ref(false);

      onMounted(async () => {
         const result = await axiosClient.get('/api/v1/customer')
            .then(response => {
               //console.log(response.data.store);

               storeInfo.value = response.data;
               if (response.data.store !== null) {
                  hasStore.value = true;
                  storeVerified.value = (response.data.store.verified) ?? true;
               }
            });

         isLoaded.value = true;
      });

      return {
         siteUrl: import.meta.env.VITE_API_URL,
         postdata: {
            name: '',
            social_store_link: '',
            image: ''
         },
         errordata: {
            name: '',
            social_store_link: '',
            image: ''
         },
         hasStore,
         storeVerified,
         storeInfo,
         loadBtn,
         isLoaded
      }
   },
   methods: {
      onFileChange() {
         this.url = null;
         const files = this.$refs.file.files[0];
         console.log(this.$refs.file.files[0]);
         this.postdata.image = this.$refs.file.files[0];
         
         let getf = [];
         let error_file = 0;
         //console.log(files);
         Object.entries(files).forEach(entry => {
            if(entry[1].type === 'image/jpeg' || entry[1].type === 'image/png') {
               getf.push(URL.createObjectURL(entry[1]));
               URL.revokeObjectURL(entry[1]);
            } else {
               error_file += 1;
            }
         });

         if(error_file > 0) {
            this.clearUploadedFile();
            toast.error("Invalid file extension", {
               position: toast.POSITION.BOTTOM_CENTER,
            });
         } else {
            this.url = getf;
         }
      },
      async create() {
         this.loadBtn = true;
         // send request to api
         const formData = new FormData();
                const files = this.$refs.file.files[0];
                //const totalfiles = this.$refs.file.files.length;
                //formData.append('images', this.$refs.file.files[0]);
                formData.append('name', this.postdata.name);
                formData.append('social_store_link', this.postdata.social_store_link);
                formData.append('image', files);
                formData.append('condition', this.postdata.condition);
                formData.append('brand', this.postdata.brand);
                formData.append('location', this.postdata.location);
             
                const headers = { 'Content-Type': 'multipart/form-data' };
                //await axiosClient.get(import.meta.env.VITE_CSRF_AUTH_URL);
                //await axiosClient.post('/api/v1/products', formData, {headers}).

         await store.dispatch('csrf');
         await axiosClient.post('/api/v1/stores', formData, {headers})
            .then(response => {
               toast.success(response.data.message, {
                  position: toast.POSITION.TOP_CENTER,
               });

               // refresh page
               this.$router.go();
            })
            .catch((error) => {
               const err = error.response;

               toast.error(err.data.message, {
                  position: toast.POSITION.TOP_CENTER,
               });

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
            })
            .finally(() => {
               this.loadBtn = false;
            });
      }
   }
}
</script>