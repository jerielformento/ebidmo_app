<template>
   <section class="mt-5">
       <div class="mx-auto">
            <!-- Start coding here -->
            <div v-if="dashboardLoad" class="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 mb-5">
                <div
                    class="bg-white border border-gray-300 p-3 rounded-md shadow-sm flex items-center justify-between">
                    <div class="flex space-x-6 items-center">
                        <WalletIcon class="h-12 w-auto text-gray-300" />
                        <div>
                            <p class="font-semibold text-base">Payout Wallet</p>
                            <p class="font-semibold text-xs text-amber-500">Total count</p>
                        </div>
                    </div>
                    <div class="flex space-x-2 items-center">
                        <div class="p-2 flex items-center">
                            <p class="text-gray-600 font-semibold text-lg">{{ dashboardReport.total_payout }}</p>
                        </div>
                    </div>
                </div>
                <div
                    class="bg-white border border-gray-300 p-3 rounded-md shadow-sm flex items-center justify-between">
                    <div class="flex space-x-6 items-center">
                        <TruckIcon class="h-12 w-auto text-gray-300" />
                        <div>
                            <p class="font-semibold text-base">To Shipped</p>
                            <p class="font-semibold text-xs text-amber-500">Total count</p>
                        </div>
                    </div>
                    <div class="flex space-x-2 items-center">
                        <div class="p-2 flex items-center">
                            <p class="text-gray-600 font-semibold text-lg">0</p>
                        </div>
                    </div>
                </div>

                <div
                    class="bg-white border border-gray-300 p-3 rounded-md shadow-sm flex items-center justify-between">
                    <div class="flex space-x-6 items-center">
                        <CheckCircleIcon class="h-12 w-auto text-gray-300" />
                        <div>
                            <p class="font-semibold text-base">Completed Transactions</p>
                            <p class="font-semibold text-xs text-amber-500">Total count</p>
                        </div>
                    </div>
                    <div class="flex space-x-2 items-center">
                        <div class="p-2 flex items-center">
                            <p class="text-gray-600 font-semibold text-lg">0</p>
                        </div>
                    </div>
                </div>
            </div>

            <nav class="bg-slate-600 rounded-md dark:bg-gray-700">
                <div class="px-2 py-3 mx-auto">
                    <div class="flex items-center">
                        <ul class="flex flex-row font-medium mr-6 space-x-2 text-sm">
                            <li>
                                <router-link :to="{ name: 'vendor-transaction-list' }" 
                                exact-active-class="bg-slate-700"
                                class="py-1.5 p-2 text-gray-200 hover:bg-slate-500 rounded-md dark:text-white" 
                                aria-current="page">All</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'vendor-transaction-ship' }" 
                                active-class="bg-slate-700"
                                class="py-1.5 p-2 text-gray-200 hover:bg-slate-500 rounded-md dark:text-white">To Ship</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'vendor-transaction-complete' }" 
                                active-class="bg-slate-700"
                                class="py-1.5 p-2 text-gray-200 hover:bg-slate-500 rounded-md dark:text-white">Completed</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
           <Suspense>
               <template #default>
                   <router-view></router-view>
               </template>
               <template #fallback>
                   <ItemsLoader/>
               </template>
           </Suspense>
       </div>
   </section>
</template>
<script>
import { ref } from 'vue';
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon, WalletIcon, TruckIcon, CheckCircleIcon } from "@heroicons/vue/24/outline";
import { PlusSmallIcon } from "@heroicons/vue/24/solid";
import ItemsLoader from './util/ItemsLoader.vue';
import axiosClient from '../axios';

const dashboardLoad = ref(false);

const transactionReport = async () => {
        let stats = [];
        await axiosClient.get('/api/v1/vendor/transactions/report').
            then(response => {
                stats = response.data;
            });
                
        dashboardLoad.value = true;
        return stats;
    }

export default {
    components: { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon, PlusSmallIcon, WalletIcon, TruckIcon, CheckCircleIcon, ItemsLoader },
    async setup() {
        const dashboardReport = await transactionReport();

        return {
            dashboardReport,
            dashboardLoad
        }
    }
}
</script>