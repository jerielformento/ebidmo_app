<template>
    <!-- progress -->
    <ol class="mx-auto items-center sm:flex">
            <li class="w-full relative mb-6 sm:mb-0">
                <div class="flex items-center">
                    <router-link :to="{ name: 'transaction-checkout-summary' }"  
                    exact-active-class="bg-amber-300"
                    class="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                        <ArrowRightIcon class="w-3 h-3"/>
                    </router-link>
                    <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                </div>
                <div class="mt-3 sm:pr-8">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Checkout Summary</h3>
                    <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Item Details</time>
                    <!-- <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p> -->
                </div>
            </li>
            <li class="w-full relative mb-6 sm:mb-0">
                <div class="flex items-center">
                    <router-link :to="{ name: 'transaction-checkout-payment' }"  
                    active-class="bg-amber-300"
                    class="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                        <ArrowRightIcon class="w-3 h-3"/>
                    </router-link>
                    <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                </div>
                <div class="mt-3 sm:pr-8">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Payment Method</h3>
                    <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Select payment type</time>
                    <!-- <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p> -->
                </div>
            </li>
            <li class="w-full relative mb-6 sm:mb-0">
                <div class="flex items-center">
                    <router-link :to="{ name: 'transaction-checkout-complete' }" 
                    active-class="bg-amber-300"
                    class="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                        <ArrowRightIcon class="w-3 h-3"/>
                    </router-link>
                    <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                </div>
                <div class="mt-3 sm:pr-8">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Completed</h3>
                    <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Finished Transaction</time>
                    <!-- <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p> -->
                </div>
            </li>
        </ol>
        <!-- end progress -->
        <router-view></router-view>
</template>
<script setup>
    import { ArrowRightIcon } from "@heroicons/vue/24/solid";
</script>