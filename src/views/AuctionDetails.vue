<template>
    <div class="h-screen flex flex-col justify-between">
    <HeaderNav/>
    <SearchBar/>
    <div v-if="!isLoading">   
        <div v-if="!isInvalid">
            <div class="pt-5">
                <nav aria-label="Breadcrumb">
                <ol role="list" class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <li>
                    <div class="flex items-center">
                        <router-link :to="{ name: 'auctions' }" class="mr-2 text-sm font-medium text-gray-900">Auctions</router-link>
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
                    <div class="mx-auto sm:px-0 sm:w-full lg:w-full lg:px-16 md:px-5 rounded-sm py-4">
                    <swiper
                        :modules="modules"
                        :space-between="20"
                        :loop="true"
                        navigation
                        :pagination="{ clickable: true }"
                        :thumbs="{ swiper: thumbsSwiper }"
                    >   
                    
                        <swiper-slide v-for="text in swiperItems" :key="text.url">
                            <div class="mx-auto max-w-3xl border-slate-600">
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
                <div class="h-fit mt-4 lg:row-span-3 lg:mt-0 bg-white px-5 py-5 border border-gray-200 shadow-sm rounded-md">
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
                        <div class="block text-sm"><h3 class="inline-block">Location:</h3> <span class="text-gray-500">{{ productInfo.item_location.name }}</span></div>
                    </div>

                    <div class="text-2xl text-gray-500 mt-2 border-t border-gray-200" v-if="!endedAuction">
                        <p class="my-5 text-2xl tracking-tight text-gray-600">Starting bid: <span class="text-green-500">{{ productInfo.auction.currency.prefix }}{{ productInfo.auction.min_price }}</span></p>
                        <div v-if="productInfo.auction.status == 1">
                            <div class="block text-sm"><h3 class="font-medium text-red-500 inline-block">Ending in</h3></div>
                            <span class="text-gray-700">{{days}}d {{ hours % 24 }}h {{ minutes % 60 }}m {{ seconds % 60 }}s</span>
                        </div>
                        <div v-else-if="productInfo.auction.status == 2 && (productInfo.auction.type == 1 || productInfo.auction.type == 2)">
                            <div class="block text-sm"><h3 class="font-medium text-red-500 inline-block">Starts in</h3></div>
                            <span class="text-gray-700">{{days}}d {{ hours % 24 }}h {{ minutes % 60 }}m {{ seconds % 60 }}s</span>
                        </div>
                        <div v-else-if="productInfo.auction.status == 2 && productInfo.auction.type == 2">
                            <div class="block text-sm" v-if="productInfo.auction.type == 2"><h3 class="font-semibold text-amber-500 inline-block animate-pulse">Waiting for participants</h3></div>
                        </div>
                    </div>
                    <div class="text-2xl text-gray-500 mt-2 border-t border-gray-200" v-else>
                        <p class="mt-3 text-gray-700">Auction Ended</p>
                    </div>

                    <!-- Bids -->
                    <div class="mt-5" v-if="!endedAuction">
                        <fieldset v-if="productInfo.auction.status == 1" class="mt-4">
                        <div class="grid grid-cols-2 space-x-3 sm:grid-cols-2 lg:grid-cols-2">

                            <label class="ring-1 ring-gray-50 text-center group relative flex flex-col items-center rounded-sm border py-3 px-5 text-sm font-medium uppercase focus:outline-none sm:flex-1 sm:py-6 bg-white text-gray-900 shadow-sm">
                                <div class="text-xs text-green-400 block">Highest Bid</div>
                                <div class="text-xl flex justify-between gap-x-2">
                                    <ArrowTrendingUpIcon class="h-6 w-6"/><span>{{ productInfo.auction.currency.prefix }}<span v-if="productInfo.auction.highest !== null">{{ productInfo.auction.highest.price }}</span><span v-else>0</span></span>
                                </div>
                            </label>

                            <label class="ring-1 ring-gray-50 text-center group relative flex flex-col items-center rounded-sm border py-3 px-5 text-sm font-medium uppercase focus:outline-none sm:flex-1 sm:py-6 bg-white text-gray-900 shadow-sm">
                                <div class="text-xs text-amber-500 block">Buy Now</div>
                                <div class="text-xl">{{ productInfo.auction.currency.prefix }}{{ productInfo.auction.buy_now_price }}</div>
                            </label>
                        </div>
                        </fieldset>
                        <fieldset v-else-if="productInfo.auction.type == 2" class="mt-4">
                            <div class="grid grid-cols-1 space-x-3 sm:grid-cols-2 lg:grid-cols-1">

                                <label class="ring-1 ring-gray-500 text-center group relative flex flex-col items-center rounded-sm border py-3 px-5 text-sm font-medium uppercase focus:outline-none sm:flex-1 sm:py-6 bg-white text-gray-900 shadow-sm">
                                    <div class="text-xs text-gray-600 block mb-2">Participants</div>
                                    <div class="text-xl flex items-center justify-between gap-x-2">
                                        <UserGroupIcon class="h-6 w-6"/><span>{{ productInfo.auction.min_participants }}</span>/<span>{{ productInfo.auction.participants_count }}</span>
                                    </div>
                                </label>
                            </div>
                        </fieldset>
                    </div>

                    <div v-if="!productInfo.owner">
                        <div v-if="productInfo.auction.status == 1">
                            <div class="grid grid-cols-2 space-x-2 mt-5" v-if="!endedAuction">
                                <ModalBid v-if="!isGuest" :reload="reloadHistory" :hbid="((productInfo.auction.highest !== null) ? productInfo.auction.highest.price : 0)" :mp="productInfo.auction.min_price" :inc="productInfo.auction.increment_by" :bid="productInfo.auction.id" />
                                <GuestLogin name="Place your bid" v-else/>
                                <button type="submit" class="flex w-full items-center justify-center rounded-sm border border-transparent bg-amber-400 px-8 py-3 text-base font-medium text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2">Buy Now</button>
                            </div>

                            <div v-if="isMounted" class="mt-10">
                            <h2 class="font-semibold mb-2 text-gray-400">Recent bid activity</h2>
                            <div class="grid space-y-2 max-h-2xl px-3 border rounded-md shadow-sm border-gray-200">
                
                                <!-- History -->
                                <ul class="max-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <li v-for="bid in bidHistory" class="py-3 sm:pb-4">
                                        <div class="flex items-center space-x-4">
                                            <div class="flex-shrink-0">
                                                <UserCircleIcon class="h-8 w-8 text-gray-300 bg-gray-50 border border-gray-300 rounded-full"/>
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <p class="text-sm font-medium text-gray-600 truncate dark:text-white">
                                                    {{ bid.customer.username }}
                                                </p>
                                                <p class="text-sm text-gray-400 truncate dark:text-gray-400">
                                                    {{ moment(bid.time).format("lll") }}
                                                </p>
                                            </div>
                                            <div class="inline-flex items-center text-base font-semibold text-green-500 dark:text-white">
                                                {{ productInfo.auction.currency.prefix+bid.price.toLocaleString() }}
                                            </div>
                                        </div>
                                    </li>
                                    <li v-if="bidHistory.length === 0" class="py-3 sm:pb-4">
                                        <div class="flex items-center space-x-4">
                                            <span class="text-xs block text-gray-400">No activity found.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        </div>
                        <div v-else-if="productInfo.auction.status == 2 && productInfo.auction.type == 2" class="grid grid-cols-1 space-x-2 mt-5">
                            <div v-if="!productInfo.auction.joiner">
                                <JoinAuction v-if="!isGuest" :reload="reloadHistory" :bid="productInfo.auction.id" />
                                <GuestLogin name="Join Auction" v-else/>
                            </div>
                            <div v-else>
                                <div class="grid grid-cols-1 items-center p-3 bg-sky-50 border border-sky-200 rounded-sm shadow-sm text-md text-gray-700">
                                    <span class="text-xs block text-sky-500">You already joined here.</span>
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
        <div class="h-60">
            <!-- Product info -->
            <div class="mx-auto mt-5 px-4 sm:px-6">
                <div class="w-full flex justify-center text-3xl text-gray-300">
                    No item found.
                </div>
            </div>
        </div>
    </div>
    <div v-if="isLoading">
        <div class="h-60">
            <!-- Product info -->
            <div class="mx-auto mt-5 px-4 sm:px-6">
                <div class="w-full flex justify-center text-3xl text-gray-300">
                    <Spinner class="h-8 w-8"/>
                </div>
            </div>
        </div>
    </div>
    <FooterNav/>
    </div>
</template>
<script setup>
    import { StarIcon, ShieldCheckIcon, ShieldExclamationIcon } from "@heroicons/vue/24/solid";
    import { ShareIcon, HeartIcon, ArrowTrendingUpIcon, UserGroupIcon, UserCircleIcon } from "@heroicons/vue/24/outline";
    import HeaderNav from "./layouts/Header.vue";
    import FooterNav from './layouts/Footer.vue';
    import SearchBar from './layouts/SearchBar.vue';
    import { ref, onMounted } from 'vue'
    import { Pagination, Navigation, Thumbs } from 'swiper'
    import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue';
    import ModalBid from '../components/util/BidModal.vue';
    import GuestLogin from '../components/util/GuestLoginModal.vue';
    import JoinAuction from '../components/util/JoinAuctionModal.vue';
    import 'swiper/css'
    import 'swiper/css/pagination'
    import 'swiper/css/navigation'
    import axiosClient from "../axios";
    import { useRoute } from "vue-router";
    import store from '../store';
    import { initFlowbite, Tooltip } from 'flowbite';
    import Spinner from "../components/forms/Spinner.vue";
    import moment from 'moment';
</script>
<script>
    export default {
        data() {
            const endedAuction = ref(false);
            const thumbsSwiper = ref(null);
            const setThumbsSwiper = (swiper) => {
                thumbsSwiper.value = swiper;
            };

            const polling = ref(null);
            const bidHistory = ref({});
            const isMounted = ref(false);
            const isInvalid = ref(false);
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

                const result = await axiosClient.get(`/api/v1/auctions/${route.params.store}/${route.params.id}`).
                    then(response => {
                        productInfo.value = response.data;
                        productImages.value = response.data.images;
                        isLoading.value = false; 

                        //console.log();
                        let timeRemaining = new Date(productInfo.value.auction.ended_at);
                        if(productInfo.value.auction.status === 2) {
                            timeRemaining = new Date(productInfo.value.auction.started_at);
                        }

                        polling.value = setInterval(() => {
                            const currDate = new Date();
                            const endTime = timeRemaining - currDate;
                            
                            seconds.value = parseInt(endTime / 1000);
                            minutes.value = parseInt(seconds.value / 60);
                            hours.value = parseInt(minutes.value / 60);
                            days.value = parseInt(hours.value / 24);
                            //{{days}}d {{ hours % 24 }}h {{ minutes % 60 }}m {{ seconds % 60 }}s
                            if(days.value < 0 || hours.value < 0 || minutes.value < 0 || seconds.value < 0) {
                                endedAuction.value = true;
                            }
                        }, 1000);
                    })
                    .catch((errors) => {
                        //window.location = '/404-page-not-found';
                        isInvalid.value = true;
                    });

                await axiosClient.get(`/api/v1/customer/bid/history/${productInfo.value.auction.id}`)
                .then(response => {
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
                endedAuction,
                modules: [Pagination, Navigation, Thumbs], 
                Thumbs,
                thumbsSwiper,
                setThumbsSwiper,
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
                polling,
                isGuest
            }
        },
        methods: {
            async reloadHistory() {
                //this.isLoading = true;

                await axiosClient.get(`/api/v1/auctions/${this.$route.params.store}/${this.$route.params.id}`).
                    then(response => {
                        this.productInfo = response.data;
                        this.productImages = response.data.images;
                        //this.isLoading = false; 
                    })
                    .catch((errors) => {
                        //window.location = '/404-page-not-found';
                        this.isInvalid = true;
                    });

                await axiosClient.get('/api/v1/customer/bid/history/'+this.productInfo.auction.id)
                    .then(response => {
                        this.bidHistory = response.data;
                    });
            }
        },
        beforeUnmount() {
            console.log("leave...");
            this.bidHistory = [];
            this.isInvalid = false;
            clearInterval(this.polling);
        },
    }
</script>
<style scoped>
    .swiper-thumbs .swiper-slide-thumb-active {
        border:2px solid #F9C253;
    }
    .swiper-thumbs .swiper-slide:not(.swiper-slide-thumb-active) {
        opacity:0.8;
    }
</style>