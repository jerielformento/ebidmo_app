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
                    class="z-10 flex items-center justify-center bg-amber-300 w-6 h-6 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
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
                    class="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
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
    <section class="mt-5 bg-gray-50">
        <div class="mx-auto">
            <!-- Start coding here -->
            <div class="bg-white rounded-md relative shadow-sm overflow-hidden border border-gray-200">
                <div v-if="!isLoaded" class="grid grid-cols-1 sm:grid-cols-6 items-start gap-6">
                    <div class="col-span-6 bg-white p-4 rounded-md shadow">
                        <div class="flex items-center">
                            <span class="mr-1 text-lg inline-block font-bold">Billing Information</span>
                            
                        </div>
                        <div class="mt-4 p-4 mb-4 text-sm shadow-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                            <span class="font-medium">Note:</span> Please make sure to have updated shipping information before you proceed.
                        </div>

                        <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                            <div class="sm:col-span-6">
                                <label for="name" class="block text-sm font-medium leading-6">Shipping Address <span class="text-xs text-gray-400 block">House/Unit/Flr #, Bldg Name, Blk or Lot #</span></label>
                                <div class="mt-1">
                                    <span v-if="postdata.shipping_address !== ''">{{ postdata.shipping_address }}</span>
                                    <span v-else class="italic text-xs text-gray-500">N/A</span>
                                    <!-- <input v-model="postdata.shipping_address" type="text" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                    <small class="text-red-400"></small> -->
                                </div>
                            </div>
                            <div class="sm:col-span-6">
                                <label for="name" class="block text-sm font-medium leading-6">Full Name</label>
                                <div class="mt-1">
                                    <span v-if="postdata.full_name !== ''">{{ postdata.full_name }}</span>
                                    <span v-else class="italic text-xs text-gray-500">N/A</span>
                                    <!-- <input v-model="postdata.full_name" type="text" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                    <small class="text-red-400"></small> -->
                                </div>
                            </div>
                            <div class="sm:col-span-6">
                                <label for="name" class="block text-sm font-medium leading-6">Mobile Number</label>
                                <div class="mt-1">
                                    <span v-if="postdata.mobile_number !== ''">{{ postdata.mobile_number }}</span>
                                    <span v-else class="italic text-xs text-gray-500">N/A</span>
                                    <!-- <input v-model="postdata.mobile_number" type="text" autocomplete="name" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                    <small class="text-red-400"></small> -->
                                </div>
                            </div>
                            <router-link :to="{ name: 'customer-billing' }" class="mr-2 flex items-center justify-center border border-gray-200 rounded-md disabled:opacity-80 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200">
                                    Edit Information
                            </router-link>

                            <div class="sm:col-span-6 flex justify-end border-t border-gray-200 pt-5">
                                <router-link :to="{ name: 'transaction-checkout-summary' }" class="mr-2 flex items-center justify-center border border-gray-200 rounded-md disabled:opacity-80 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200">
                                    Back to Summary
                                </router-link>
                                <ButtonForm @onClick="checkout" text="Process Payment" :state="isCheckout" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { ref } from 'vue';
import { ArrowRightIcon } from "@heroicons/vue/24/solid";
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import axiosClient from '../../axios';
import { useRoute } from 'vue-router';
import ButtonForm from '../../components/forms/Button.vue';
import store from '../../store';
const isLoaded = ref(false);
const isSubmit = ref(false);

const getBillingInformation = async () => {
    let resdata = [];

    await axiosClient.get('/api/v1/customer/billing/shipping')
        .then(response => {
            resdata = response.data;
            isLoaded.value = true;
        });
        
    return resdata;
}

export default {
    components: { ButtonForm, ArrowRightIcon },
    async setup() {
        const isCheckout = ref(false);

        const isMounted = ref(false);
        const isInvalid = ref(false);
        const route = useRoute();
        const isLoading = ref(true);
        const billing = await getBillingInformation();
        console.log(billing);

        return {
            isLoading,
            isMounted,
            isInvalid,
            isCheckout,
            route,
            billing,
            postdata: {
                shipping_address: billing.address ?? '',
                full_name: billing.full_name ?? '',
                mobile_number: billing.mobile_number ?? ''
            }
        }
    },
    methods: {
        async checkout() {
            this.isCheckout = true;
            /*await axiosClient.post('/api/v1/customer/bid', {
                        auction_id: auctionId.value,
                        price: bidprice.value
                    }) */
            await axiosClient.get(`/api/v1/payment/transaction/${this.route.params.id}/process`)
            .then(function(response) {
                // Parsing the response and redirecting the customer for authentication
                //console.log(response.data.url);
                const checkout_url = response.data.data.attributes.checkout_url;
                //const checkout_url = response.data.url;

                // Option 1: similar behavior as an HTTP redirect
                //window.location.replace(checkout_url);

                // Option 2: similar behavior as clicking on a link
                window.location.href = checkout_url;
            }).finally(() => {
                this.isCheckout = false;
            });
        },
        checkData() {
            console.log(this.postdata);
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