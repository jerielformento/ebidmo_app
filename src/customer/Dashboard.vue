<template>
    <section class="mt-5">
        <div class="mx-auto">
            <!-- Start coding here -->
            <div class="grid lg:grid-cols-4 sm:grid-cols-1 gap-4 mb-10">
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
                            <p class="text-gray-600 font-semibold text-lg">0</p>
                        </div>
                    </div>
                </div>

                <div
                    class="bg-white border border-gray-300 p-3 rounded-sm shadow-md flex items-center justify-between">
                    <div class="flex space-x-6 items-center">
                        <FireIcon class="h-12 w-auto text-gray-300" />
                        <div>
                            <p class="font-semibold text-base">Completed Transaction</p>
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
                    class="bg-white border border-gray-300 p-3 rounded-sm shadow-md flex items-center justify-between">
                    <div class="flex space-x-6 items-center">
                        <TrophyIcon class="h-12 w-auto text-gray-300" />
                        <div>
                            <p class="font-semibold text-base">Won Auction</p>
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
                    class="bg-white border border-gray-300 p-3 rounded-sm shadow-md flex items-center justify-between">
                    <div class="flex space-x-6 items-center">
                        <HandThumbUpIcon class="h-12 w-auto text-gray-300" />
                        <div>
                            <p class="font-semibold text-base">To Acknowledge</p>
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
            <Suspense>
                <template #default>
                    <ActivityList />
                </template>
                <template #fallback>
                    <ItemsLoader/>
                </template>
            </Suspense>
        </div>
    </section>
</template>
<script setup>
import ActivityList from './components/ActivityList.vue';
import ItemsLoader from '../vendor/util/ItemsLoader.vue';
import { ShoppingCartIcon, FireIcon, TruckIcon, TrophyIcon, HandThumbUpIcon, BuildingStorefrontIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
</script>