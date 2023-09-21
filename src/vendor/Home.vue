<template>
   <div class="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 mb-10">
      <div
         class="bg-white border border-gray-300 p-3 rounded-sm shadow-md flex items-center justify-between">
         <div class="flex space-x-6 items-center">
            <ShoppingCartIcon class="h-12 w-auto text-gray-300" />
            <div>
                  <p class="font-semibold text-base">Products</p>
                  <p class="font-semibold text-xs text-amber-500">Total count</p>
            </div>
         </div>
         <div class="flex space-x-2 items-center">
            <div class="p-2 flex items-center">
                  <p class="text-gray-600 font-semibold text-lg">{{ statsReport.products_count }}</p>
            </div>
         </div>
      </div>
      <div
         class="bg-white border border-gray-300 p-3 rounded-sm shadow-md flex items-center justify-between">
         <div class="flex space-x-6 items-center">
            <FireIcon class="h-12 w-auto text-gray-300" />
            <div>
                  <p class="font-semibold text-base">Auctions</p>
                  <p class="font-semibold text-xs text-amber-500">Total count</p>
            </div>
         </div>
         <div class="flex space-x-2 items-center">
            <div class="p-2 flex items-center">
                  <p class="text-gray-600 font-semibold text-lg">{{ statsReport.auctions_count }}</p>
            </div>
         </div>
      </div>

      <div
         class="bg-white border border-gray-300 p-3 rounded-sm shadow-md flex items-center justify-between">
         <div class="flex space-x-6 items-center">
            <TruckIcon class="h-12 w-auto text-gray-300" />
            <div>
                  <p class="font-semibold text-base">Transactions</p>
                  <p class="font-semibold text-xs text-amber-500">Total count</p>
            </div>
         </div>
         <div class="flex space-x-2 items-center">
            <div class="p-2 flex items-center">
                  <p class="text-gray-600 font-semibold text-lg">{{ statsReport.transactions_count }}</p>
            </div>
         </div>
      </div>
</div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { ShoppingCartIcon, FireIcon, TruckIcon, BuildingStorefrontIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import axiosClient from '../axios';
import { initFlowbite } from 'flowbite';
const isLoaded = ref(false);

const dashboardReport = async () => {
   let stats = [];
   await axiosClient.get('/api/v1/store/dashboard').
      then(response => {
         stats.push(response.data);
      });
         
   return stats[0];
}

export default {
   components: { ShoppingCartIcon, FireIcon, TruckIcon, BuildingStorefrontIcon, ChevronRightIcon },
   async setup() {
      onMounted(() => {
         initFlowbite();
      });

      const stats = await dashboardReport();
      const statsReport = ref(stats);
      isLoaded.value = true;

      return {
         statsReport,
         isLoaded
      }
   }
}
</script>