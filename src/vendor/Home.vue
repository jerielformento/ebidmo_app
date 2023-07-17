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
                  <p class="text-yellow-600 font-semibold text-xs">{{ statsReport.products_count }}</p>
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
                  <p class="text-yellow-600 font-semibold text-xs">{{ statsReport.auctions_count }}</p>
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
                  <p class="text-yellow-600 font-semibold text-xs">{{ statsReport.transactions_count }}</p>
               </div>
            </div>    
         </div>
      </div>
</template>
<script>
import { ref } from 'vue';
import { ShoppingCartIcon, FireIcon, TruckIcon } from '@heroicons/vue/24/outline';
import axiosClient from '../axios';

const dashboardReport = async () => {
   let stats = [];
   await axiosClient.get('/api/v1/store/dashboard').
                     then(response => { 
                        stats.push(response.data);               
                     });

   return stats[0];
}
export default {
   components: { ShoppingCartIcon, FireIcon, TruckIcon },
   async setup() {
      const stats = await dashboardReport();
      const statsReport = ref(stats);

      return {
         statsReport
      }
   }
}
</script>