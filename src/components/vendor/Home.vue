<template>
   <h2 class="text-2xl mb-2">Dashboard</h2>
    <div class="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 mb-4">
         <div class="bg-amber-400 border-2 border-gray-800 p-3 rounded-xl shadow-xl flex items-center justify-between mt-4">
            <div class="flex space-x-6 items-center">
               <ShoppingCartIcon class="h-12 w-auto text-amber-600"/>
               <div>
                  <p class="font-semibold text-base">Products</p>
                  <p class="font-semibold text-xs text-amber-700">Total count</p>
               </div>              
            </div>
            
            <div class="flex space-x-2 items-center">
               <div class="bg-yellow-200 rounded-md p-2 flex items-center">
                  <p class="text-yellow-600 font-semibold text-xs">104</p>
               </div>
            </div>    
         </div>
         
         <div class="bg-amber-400 border-2 border-gray-800 p-3 rounded-xl shadow-xl flex items-center justify-between mt-4">
            <div class="flex space-x-6 items-center">
               <FireIcon class="h-12 w-auto text-amber-600"/>
               <div>
                  <p class="font-semibold text-base">Auctioned</p>
                  <p class="font-semibold text-xs text-amber-800">Total count</p>
               </div>              
            </div>
            
            <div class="flex space-x-2 items-center">
               <div class="bg-yellow-200 rounded-md p-2 flex items-center">
                  <p class="text-yellow-600 font-semibold text-xs">14</p>
               </div>
            </div>    
         </div>

         <div class="bg-amber-400 border-2 border-gray-800 p-3 rounded-xl shadow-xl flex items-center justify-between mt-4">
            <div class="flex space-x-6 items-center">
               <TruckIcon class="h-12 w-auto text-amber-600"/>
               <div>
                  <p class="font-semibold text-base">Transactions</p>
                  <p class="font-semibold text-xs text-amber-800">Total processed count</p>
               </div>              
            </div>
            
            <div class="flex space-x-2 items-center">
               <div class="bg-yellow-200 rounded-md p-2 flex items-center">
                  <p class="text-yellow-600 font-semibold text-xs">5</p>
               </div>
            </div>    
         </div>

      </div>
      <!-- <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
         <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div>
      <div class="grid grid-cols-2 gap-4 mb-4">
         <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
         </div>
         <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
         </div>
         <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
         </div>
         <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
         </div>
      </div> -->
</template>
<script setup>
import VendorProductList from '../../components/VendorProductList.vue';
import ItemsLoader from '../../components/ItemsLoader.vue';
import { ShoppingCartIcon, FireIcon, TruckIcon } from '@heroicons/vue/24/outline';
import { XMarkIcon } from '@heroicons/vue/24/solid';
</script>