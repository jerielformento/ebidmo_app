<template>
    <div class="h-screen flex flex-col justify-between bg-white">
    <UIMenu/>
    <div v-if="!isLoading">   
        <div v-if="!isInvalid" class="bg-white">
            <div class="pt-5">
                <nav aria-label="Breadcrumb">
                <ol role="list" class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <li>
                    <div class="flex items-center">
                        <a href="#" class="mr-2 text-sm font-medium text-gray-900">Auctions</a>
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" class="h-5 w-4 text-gray-300">
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                    </div>
                    </li>
                    <li>
                    <div class="flex items-center">
                        <a href="#" class="mr-2 text-sm font-medium text-gray-900">{{ productInfo.category.title }}</a>
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" class="h-5 w-4 text-gray-300">
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                    </div>
                    </li>
                    <li>
                    <div class="flex items-center">
                        <a href="#" class="mr-2 text-sm font-medium text-gray-900">{{ productInfo.brand.description }}</a>
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" class="h-5 w-4 text-gray-300">
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                    </div>
                    </li>

                    <li class="text-sm">
                        <h2 class="font-medium text-gray-500">{{ productInfo.name }}</h2>
                    </li>
                </ol>
                </nav>

                <!-- Product info -->
                <div class="mx-auto max-w-2xl px-4 pb-16 pt-5 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-16 lg:pt-5">
                <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <!-- Image gallery -->
                    <div class="mx-auto sm:px-0 sm:w-full lg:w-full lg:px-16 md:px-5 rounded-sm border bg-gray-50 py-4">
                    <swiper
                        :modules="modules"
                        :space-between="20"
                        :loop="true"
                        navigation
                        :pagination="{ clickable: true }"
                    >   
                    
                        <swiper-slide v-for="text in swiperItems" :key="text.url">
                            <div class="mx-auto max-w-3xl border-slate-600">
                                <div class="aspect-h-3 aspect-w-3 overflow-hidden rounded-sm sm:block lg:block">
                                    <div><img :src="text.url" alt="Two each of gray, white, and black shirts laying flat." class="w-full h-full object-cover object-center"></div>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                    </div>
                    
                </div>
                
                <!-- Options -->
                <div class="mt-4 lg:row-span-3 lg:mt-0">
                    <h2 class="sr-only">Product information</h2>
                    <router-link id="tooltipButton" :to="{name: 'vendor-details', params: {store: productInfo.store.slug}}" class="text-2xl font-medium text-gray-500 hover:text-amber-500 flex items-center">
                        <span class="mr-1">{{ productInfo.store.name }}</span>
                        <ShieldCheckIcon v-if="productInfo.store.verified === 1" class="h-6 w-6 text-green-500"/>
                        <ShieldExclamationIcon v-else class="h-6 w-6 text-gray-400"/>
                    </router-link>
                    <div id="tooltipContent" v-if="productInfo.store.verified === 1" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Verified
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                    <div id="tooltipContent" v-if="productInfo.store.verified === 0" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Not Verified
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>

                    <!-- Reviews -->
                    <div class="mt-2 pb-2 border-b border-gray-200">
                    <h3 class="sr-only">Reviews</h3>
                    <div class="flex items-center">
                        <div class="flex items-center">
                        <!-- Active: "text-gray-900", Default: "text-gray-200" -->
                        <StarIcon class="text-yellow-400 h-5 w-5 flex-shrink-0" />
                        <StarIcon class="text-yellow-400 h-5 w-5 flex-shrink-0" />
                        <StarIcon class="text-yellow-400 h-5 w-5 flex-shrink-0" />
                        <StarIcon class="text-yellow-400 h-5 w-5 flex-shrink-0" />
                        <StarIcon class="text-gray-200 h-5 w-5 flex-shrink-0" />
                        </div>
                        <p class="sr-only">4 out of 5 stars</p>
                        <a href="#" class="ml-3 text-sm font-medium text-amber-500 hover:text-amber-400">117 reviews</a>
                    </div>
                    </div>

                    <div class="mt-2">
                        <div class="block text-sm"><h3 class="inline-block">Category:</h3> <a href="#" class="underline text-amber-500">{{ productInfo.category.title }}</a></div>
                        <div class="block text-sm"><h3 class="inline-block">Brand:</h3> <a href="#" class="underline text-amber-500">{{ productInfo.brand.description }}</a></div>
                        <div class="block text-sm"><h3 class="inline-block">Condition:</h3> <span class="text-gray-500">{{ productInfo.condition.description }}</span></div>
                        <div class="block text-sm"><h3 class="inline-block">Quantity:</h3> <span class="text-gray-500">{{ productInfo.quantity }}</span></div>
                    </div>

                    <div class="text-2xl text-gray-500 mt-2 border-t border-gray-200">
                        <p class="my-2 text-2xl tracking-tight text-gray-600">Minimum Bid: <span class="text-green-600">{{ productInfo.bid.currency.prefix }}{{ productInfo.bid.min_price }}</span></p>
                        <div class="block text-sm"><h3 class="font-medium text-red-500 inline-block">Remaining time to bid</h3></div>
                        <span class="text-gray-700">{{days}}d {{ hours % 24 }}h {{ minutes % 60 }}m {{ seconds % 60 }}s</span>
                    </div>

                    <!-- Bids -->
                    <div class="mt-5">

                        <fieldset class="mt-4">
                        <div class="grid grid-cols-2 space-x-3 sm:grid-cols-2 lg:grid-cols-2">

                            <label class="ring-1 ring-green-500 text-center group relative flex flex-col items-center rounded-sm border py-3 px-5 text-sm font-medium uppercase focus:outline-none sm:flex-1 sm:py-6 bg-white text-gray-900 shadow-sm">
                                <div class="text-xs text-gray-600 block">Highest Bid</div>
                                <div class="text-xl flex justify-between gap-x-2">
                                    <ArrowTrendingUpIcon class="h-6 w-6"/><span>{{ productInfo.bid.currency.prefix }}<span v-if="productInfo.bid.highest !== null">{{ productInfo.bid.highest.price }}</span><span v-else>0</span></span>
                                </div>
                            </label>

                            <label class="ring-1 ring-amber-500 text-center group relative flex flex-col items-center rounded-sm border py-3 px-5 text-sm font-medium uppercase focus:outline-none sm:flex-1 sm:py-6 bg-white text-gray-900 shadow-sm">
                                <div class="text-xs text-gray-600 block">Buy Now</div>
                                <div class="text-xl">{{ productInfo.bid.currency.prefix }}{{ productInfo.bid.buy_now_price }}</div>
                            </label>
                        </div>
                        </fieldset>
                    </div>


                    <div v-if="!productInfo.owner">
                        <div class="grid grid-cols-2 space-x-2 mt-5">
                            <ModalBid v-if="!isGuest" :reload="reloadHistory" :hbid="((productInfo.bid.highest !== null) ? productInfo.bid.highest.price : 0)" :mp="productInfo.bid.min_price" :inc="productInfo.bid.increment_by" :bid="productInfo.bid.id" />
                            <GuestLogin v-else :reload="reloadHistory" :hbid="((productInfo.bid.highest !== null) ? productInfo.bid.highest.price : 0)" :mp="productInfo.bid.min_price" :inc="productInfo.bid.increment_by" :bid="productInfo.bid.id" />
                            <button type="submit" class="flex w-full items-center justify-center rounded-sm border border-transparent bg-amber-500 px-8 py-3 text-base font-medium text-white hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2">Buy Now</button>
                        </div>

                        <div v-if="isMounted" class="mt-10">
                            <h2 class="font-semibold mb-2 text-gray-600">Your recent activity</h2>
                            <div class="grid space-y-2 max-h-2xl">
                                <div v-for="bid in bidHistory">
                                    <div class="grid grid-cols-1 items-center p-3 bg-amber-400 border border-gray-200 ring-2 ring-inset ring-slate-800 rounded-md shadow-sm text-md text-gray-700">
                                        <span class="text-xs font-semibold text-gray-800 flex justify-between">Bid: {{ productInfo.bid.currency.prefix+bid.price.toLocaleString() }} <ArrowTrendingUpIcon class="h-4 w-4 text-amber-800"/></span>
                                        <span class="text-xs block text-gray-500">{{ bid.time }}</span>
                                    </div>
                                </div>
                                <div v-if="bidHistory.length === 0" class="grid grid-cols-1 items-center p-3 bg-gray-50 border border-gray-200 rounded-sm shadow-sm text-md text-gray-700">
                                    <span class="text-xs block text-gray-400">No activity found.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="mt-5 grid grid-cols-1 items-center p-3 bg-sky-50 border border-sky-200 rounded-sm shadow-sm text-md text-gray-700">
                            <span class="text-xs block text-sky-500">This item belongs to you.</span>
                        </div>
                    </div>
                </div>

                <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                    <!-- Title and socials -->
                    <div class="mb-5 w-full lg:col-span-2 flex justify-between items-center">
                        <h1 class="text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl">{{ productInfo.name }}</h1>

                        <div class="inline-flex space-x-3">
                            <a href="#">
                                <ShareIcon class="h-6 w-6 text-amber-500"/>
                            </a>    
                            <a href="#">
                                <HeartIcon class="h-6 w-6 text-gray-400"/>
                            </a>
                        </div>
                    </div>

                    <!-- Description and details -->
                    <div>
                    <h3 class="sr-only">Description</h3>

                    <div class="space-y-6">
                        <p class="text-base text-gray-900" v-html="productInfo.details"></p>
                    </div>
                    </div>

                </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="isInvalid && !isMounted">
        <div class="bg-white">
            <div class="h-60">
                <!-- Product info -->
                <div class="mx-auto mt-5 px-4 sm:px-6">
                    <div class="w-full flex justify-center text-3xl text-gray-300">
                        No item found.
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="isLoading">
        <div class="bg-white">
            <div class="h-60">
                <!-- Product info -->
                <div class="mx-auto mt-5 px-4 sm:px-6">
                    <div class="w-full flex justify-center text-3xl text-gray-300">
                        <ArrowPathIcon class="h-8 w-8 animate-spin"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <FooterNav/>
    </div>
</template>
<script>
    import { StarIcon, ShieldCheckIcon, ShieldExclamationIcon } from "@heroicons/vue/24/solid";
    import { ShareIcon, HeartIcon, ArrowTrendingUpIcon, ArrowPathIcon } from "@heroicons/vue/24/outline";
    import UIMenu from "./UIMenu.vue";
    import FooterNav from './Footer.vue';
    import { ref, onMounted } from 'vue'
    import { Pagination, Navigation } from 'swiper'
    import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue';
    import ModalBid from '../components/ModalBid.vue';
    import GuestLogin from '../components/GuestLogin.vue';
    import 'swiper/css'
    import 'swiper/css/pagination'
    import 'swiper/css/navigation'
    import axiosClient from "../axios";
    import { useRoute } from "vue-router";
    import store from '../store';
    import { initFlowbite, Tooltip } from 'flowbite';
    

    const polling = ref(null);
    const bidHistory = ref({});
    const isMounted = ref(false);
    const isInvalid = ref(false);

    export default {
        components: {
            Swiper,
            SwiperSlide,
            StarIcon,
            ShieldCheckIcon,
            ShieldExclamationIcon,
            ShareIcon,
            HeartIcon,
            ArrowTrendingUpIcon,
            ArrowPathIcon,
            UIMenu,
            FooterNav,
            ModalBid,
            GuestLogin
        },
        setup() {
            const route = useRoute();
            const productInfo = ref({});
            const productImages = ref({});
            const isLoading = ref(true);
            const days = ref(0);
            const hours = ref(0);
            const minutes = ref(0);
            const seconds = ref(0);
            const isGuest = ref(true);

            onMounted(async() => {
                initFlowbite();

                isGuest.value = (store.state.user.token) ? false : true;

                const result = await axiosClient.get(`/api/v1/bid/${route.params.store}/${route.params.id}`).
                    then(response => {
                        productInfo.value = response.data;
                        productImages.value = response.data.images;
                        isLoading.value = false; 

                        //console.log();
                        const timeRemaining = new Date(productInfo.value.bid.ended_at);
                        
                        polling.value = setInterval(() => {
                            const currDate = new Date();
                            const endTime = timeRemaining - currDate;
                            
                            seconds.value = parseInt(endTime / 1000);
                            minutes.value = parseInt(seconds.value / 60);
                            hours.value = parseInt(minutes.value / 60);
                            days.value = parseInt(hours.value / 24);
                            console.log("poll");
                        }, 1000);
                    })
                    .catch((errors) => {
                        //window.location = '/404-page-not-found';
                        isInvalid.value = true;
                    });

                await axiosClient.get(`/api/v1/customer/bid/history/${productInfo.value.bid.id}`)
                .then(response => {
                    console.log(response.data);
                    bidHistory.value = response.data;
                    isMounted.value = true;
                });

                // set the tooltip content element
                const targetEl = document.getElementById('tooltipContent');
                // set the element that trigger the tooltip using hover or click
                const triggerEl = document.getElementById('tooltipButton');
                // options with default values
                const options = {
                    placement: 'top',
                    triggerType: 'hover'
                };

                const tooltip = new Tooltip(targetEl, triggerEl, options);
                tooltip.hide();
            });
            
            const swiperItems = ref(productImages);

            return {
                modules: [Pagination, Navigation], 
                swiperItems,
                days,
                hours,
                minutes,
                seconds,
                productInfo,
                isLoading,
                bidHistory,
                isMounted,
                isInvalid,
                isGuest
            }
        },
        methods: {
            async reloadHistory() {
                this.isLoading = true;

                await axiosClient.get(`/api/v1/bid/${this.$route.params.store}/${this.$route.params.id}`).
                    then(response => {
                        this.productInfo = response.data;
                        this.productImages = response.data.images;
                        this.isLoading = false; 
                    })
                    .catch((errors) => {
                        //window.location = '/404-page-not-found';
                        isInvalid.value = true;
                    });

                await axiosClient.get('/api/v1/customer/bid/history/'+this.productInfo.bid.id)
                    .then(response => {
                        bidHistory.value = response.data;
                    });
            }
        },
        beforeUnmount() {
            console.log("leave...");
            bidHistory.value = [];
            isInvalid.value = false;
            clearInterval(polling.value)
        },
    }
</script>