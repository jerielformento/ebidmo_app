<template>
    <!-- progress -->
    <ol class="mx-auto items-center sm:flex">
        <li class="w-full relative mb-6 sm:mb-0">
            <div class="flex items-center">
                <div 
                class="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                    <ArrowRightIcon class="w-3 h-3"/>
                </div>
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
                <div
                class="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                    <ArrowRightIcon class="w-3 h-3"/>
                </div>
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
                <div
                class="z-10 flex items-center justify-center bg-amber-300 w-6 h-6 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                    <ArrowRightIcon class="w-3 h-3"/>
                </div>
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
    <div v-if="isMounted" class="mt-6 pb-8">
        <div class="w-full p-3 border-t border-gray-200 h-32 flex justify-center items-center">
            <div>
                <h2 class="text-gray-400 my-3 text-xl font-semibold flex items-center"><CheckCircleIcon class="h-7 w-7 mr-1 text-green-400"/> Payment Success</h2>
                <router-link :to="{name: 'transaction-home' }"
                    class="flex items-center justify-center rounded-md bg-slate-900 px-2 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                    <ArrowLongLeftIcon class="h-5 w-5 mr-1"/> Back to Transactions
                </router-link>
            </div>
        </div>
    </div>
    <div v-else class="mt-6 pb-8">
        <div class="w-full p-3 border-t border-gray-200 h-32 flex items-center justify-center">
            <h2 class="text-gray-300">No available information.</h2>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { ShieldCheckIcon, ShieldExclamationIcon, ArrowRightIcon, ArrowLongLeftIcon, CheckCircleIcon } from "@heroicons/vue/24/solid";
import axiosClient from '../../axios';
import { useRoute } from 'vue-router';
import ButtonForm from '../../components/forms/Button.vue';
</script>
<script>
export default {
    data() {
        const isCheckout = ref(false);

        const isMounted = ref(false);
        const isInvalid = ref(false);
        const route = useRoute();
        const productInfo = ref({});
        const isLoading = ref(true);

        onMounted(async() => {
            await axiosClient.get(`/api/v1/customer/transactions/checkout/success/${route.params.id}`).
                    then(response => {
                        console.log(response.data);
                        productInfo.value = response.data;

                        if(productInfo.value.status === 1) {
                            isLoading.value = false; 
                            isMounted.value = true;
                        }
                    })
                    .catch((errors) => {
                        //window.location = '/404-page-not-found';
                    }); 
        });

        return {
            productInfo,
            isLoading,
            isMounted,
            isInvalid,
            isCheckout,
            route
        }
    },
    methods: {
        checkout() {
            //console.log(this.$route.path);
            /* const options = {
                method: 'POST',
                headers: {
                    'X-BUSINESS-API-KEY': 'da60790b3c460c9f04556ae969f2105c53555527ca83de9b9b5826c08f20b3d5',
                    'Content-Type': 'application/json'
                },
                body: '{"amount":50,"currency":"PHP","redirect_url":'+import.meta.env.VITE_URL+this.$route.path+'}'
            };

            fetch('https://securecheckout.sandbox.hit-pay.com/payment-request/@testbid', options)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(err => console.error(err)); */
                this.isCheckout = true;
                axiosClient.get(`/api/v1/payment/transaction/${this.route.params.id}`)
                .then(function(response) {
                // Parsing the response and redirecting the customer for authentication
                console.log(response.data.url);
                const checkout_url = response.data.url;

                    // Option 1: similar behavior as an HTTP redirect
                    //window.location.replace(checkout_url);

                    // Option 2: similar behavior as clicking on a link
                    
                    window.location.href = checkout_url;
                }).finally(() => {
                    this.isCheckout = false;
                });
        }
    },
}
</script>
<style scoped>
    .swiper-thumbs .swiper-slide-thumb-active {
        border:2px solid #ff9f0e;
    }
    .swiper-thumbs .swiper-slide:not(.swiper-slide-thumb-active) {
        opacity:0.8;
    }
</style>