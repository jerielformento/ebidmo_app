<template>
    
<button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span class="sr-only">Open sidebar</span>
   <Bars3Icon class="h-6 w-6 text-gray-400"/>
</button>

<aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
    <div class="mb-4 flex justify-center items-center">
        <a href="/">
            <img src="http://localhost/images/ebidmo_text.png" class="w-auto h-8"/>
        </a>
    </div>
      <ul class="space-y-2 font-semibold text-sm text-gray-400">
         <li>
            <router-link :to="{name: 'vendor-home'}" class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
               <ChartBarIcon class="h-6 w-6" />
               <span class="ml-3">Dashboard</span>
            </router-link>
         </li>
         <li>
            <router-link :to="{name: 'vendor-products'}" class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
               <ShoppingCartIcon class="h-6 w-6" />
               <span class="ml-3">Products</span>
            </router-link>
         </li>
         <li>
            <router-link :to="{name: 'vendor-auction'}" class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
               <FireIcon class="h-6 w-6" />
               <span class="ml-3">Auction</span>
            </router-link>
         </li>
         <li>
            <router-link :to="{name: 'vendor-transaction'}" class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
               <TruckIcon class="h-6 w-6" />
               <span class="ml-3">Transaction</span>
            </router-link>
         </li>
         <li>
            <router-link :to="{name: 'vendor-settings'}" class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
               <Cog6ToothIcon class="h-6 w-6" />
               <span class="ml-3">Store Settings</span>
            </router-link>
         </li>
      </ul>
   </div>
</aside>
<div class="p-4 sm:ml-64">
   <div class="p-2 border-dashed rounded-lg">
      <router-view></router-view>
   </div>
</div>

</template>
<script setup>
import { ref, onMounted } from 'vue'
import UIMenu from './UIMenu.vue';
import FooterNav from './Footer.vue';
import VendorProductList from '../components/VendorProductList.vue';
import ItemsLoader from '../components/ItemsLoader.vue';
import { toast } from 'vue3-toastify';
import { 
    StarIcon, 
    ShieldCheckIcon 
} from "@heroicons/vue/24/solid";
import { 
    BellIcon, 
    MagnifyingGlassIcon, 
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