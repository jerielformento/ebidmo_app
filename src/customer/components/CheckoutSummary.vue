<template>
    <div>
    <div class="" v-if="isMounted">
        <div class="pt-5 mb-10">
            <!-- Product info -->
            <div class="mx-auto bg-white border border-gray-200 max-w-2xl px-4 pt-5 sm:px-6 lg:grid lg:max-w-full lg:grid-cols-4 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-6 lg:pt-5">
            <div class="w-full lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <!-- Image gallery -->
                <p class="text-2xl font-medium text-gray-800 mb-5 sr-only">Item Details</p>
                <div class="mx-auto sm:px-0 sm:w-full lg:w-full md:px-5 rounded-sm py-4">
                    <swiper
                        :modules="modules"
                        :space-between="20"
                        :loop="true"
                        navigation
                        :pagination="{ clickable: true }"
                        :thumbs="{ swiper: thumbsSwiper }"
                    >   
                    
                        <swiper-slide v-for="text in swiperItems" :key="text.url">
                            <div class="max-w-2xl border-slate-600">
                                <div class="aspect-h-3 aspect-w-3 overflow-hidden rounded-sm sm:block lg:block">
                                    <div><img :src="text.url" alt="" class="w-full h-full object-cover object-center"></div>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>

                    <swiper
                        :modules="[Thumbs]"
                        watch-slides-progress
                        :slides-per-view="6"
                        :space-between="5"
                        @swiper="setThumbsSwiper"
                        class="mt-1"
                    >
                        <swiper-slide v-for="text in swiperItems" :key="text.url">
                                <div class="mx-auto max-w-3xl border-slate-600">
                                    <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-sm sm:block lg:block">
                                        <div><img :src="text.url" alt="" class="w-full h-full object-cover object-center"></div>
                                    </div>
                                </div>
                        </swiper-slide>
    
                    </swiper>
                </div>
            </div>
            
            <!-- Options -->
            <div class="lg:col-span-4 mt-4 lg:row-span-3 lg:mt-0">
                <h2 class="sr-only">Product information</h2>
                <span class="text-2xl font-medium text-gray-500 flex items-center">Checkout Summary</span>

                

                <div class="my-5">
                    <router-link id="tooltipButton" :to="{name: 'vendor-details', params: {store: productInfo.auction.product.store.slug}}" class="text-lg font-medium text-amber-400 hover:text-amber-500 flex items-center">
                        <span class="mr-1">{{ productInfo.auction.product.store.name }}</span>
                        <ShieldCheckIcon v-if="productInfo.auction.product.store.verified === 1" class="h-6 w-6 text-green-500"/>
                        <ShieldExclamationIcon v-else class="h-6 w-6 text-gray-400"/>
                    </router-link>
                    <div id="tooltipContent" v-if="productInfo.auction.product.store.verified === 1" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Verified
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                    <div id="tooltipContent" v-if="productInfo.auction.product.store.verified === 0" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Not Verified
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                        <div class="block text-lg font-semibold"><h3 class="inline-block">{{ productInfo.auction.product.name }}</h3> </div>
                        <div class="block text-sm text-gray-500"><h3 class="inline-block" v-html="productInfo.auction.product.details"></h3></div>
                    </div>

                <ul class="my-5 max-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <li class="py-3 sm:pb-4">
                            <div class="flex items-center space-x-4">
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-500 truncate dark:text-white">
                                        Sub Total
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base text-gray-500 dark:text-white">
                                    {{ productInfo.auction.currency.prefix }}{{ productInfo.auction.highest.price }}
                                </div>
                            </div>
                        </li>
                        <li class="py-3 sm:pb-4">
                            <div class="flex items-center space-x-4">
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium truncate dark:text-white">
                                        Total
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold dark:text-white">
                                    {{ productInfo.auction.currency.prefix }}{{ productInfo.auction.highest.price }}
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- <button 
                        @click="checkout" 
                        type="button" 
                        class="float-right w-auto items-center rounded-sm border border-transparent bg-slate-900 px-8 py-3 text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">
                        Checkout
                    </button> -->
                    <ButtonForm text="Checkout" :state="isCheckout" @onClick="checkout" class="float-right w-auto items-center rounded-sm border border-transparent bg-slate-900 text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"/>
            </div>
            <div class="sm:col-span-6">
                
            </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { ShieldCheckIcon, ShieldExclamationIcon } from "@heroicons/vue/24/solid";
import { Pagination, Navigation, Thumbs } from 'swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue';
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import axiosClient from '../../axios';
import { useRoute } from 'vue-router';
import ButtonForm from '../../components/forms/Button.vue';
</script>
<script>
export default {
    data() {
        const isCheckout = ref(false);
        const thumbsSwiper = ref(null);
        const setThumbsSwiper = (swiper) => {
            thumbsSwiper.value = swiper;
        };

        const isMounted = ref(false);
        const isInvalid = ref(false);
        const route = useRoute();
        const productInfo = ref({});
        const productImages = ref({});
        const isLoading = ref(true);

        onMounted(async() => {
            await axiosClient.get(`/api/v1/customer/transactions/checkout/${route.params.id}`).
                    then(response => {
                        console.log(response.data);
                        productInfo.value = response.data;
                        productImages.value = response.data.auction.product.images
                        isLoading.value = false; 
                        isMounted.value = true;
                    })
                    .catch((errors) => {
                        //window.location = '/404-page-not-found';
                    }); 
        });

        const swiperItems = ref(productImages);

        return {
            modules: [Pagination, Navigation, Thumbs], 
            Thumbs,
            thumbsSwiper,
            setThumbsSwiper,
            swiperItems,
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