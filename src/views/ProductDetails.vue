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
                        <a href="#" class="mr-2 text-sm font-medium text-gray-900">Products</a>
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
                <div class="w-full lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
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
                        <p class="my-2 text-2xl tracking-tight text-gray-600">Sell Price: <span class="text-green-600">{{ productInfo.currency.prefix+productInfo.price.toLocaleString() }}</span></p>
                    </div>
                    <div v-if="!productInfo.owner" class="grid grid-cols-2 space-x-2 mt-5">
                        <button type="button" class="flex w-full items-center justify-center rounded-sm border border-transparent bg-slate-900 px-8 py-3 text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">Add to Cart</button>
                        <button type="button" class="flex w-full items-center justify-center rounded-sm border border-transparent bg-amber-500 px-8 py-3 text-base font-medium text-white hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2">Buy Now</button>
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

                    <!-- <div class="mt-10">
                        <h3 class="text-sm font-medium text-gray-900">Highlights</h3>

                        <div class="mt-4">
                            <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
                            <li class="text-gray-400"><span class="text-gray-600">Hand cut and sewn locally</span></li>
                            <li class="text-gray-400"><span class="text-gray-600">Dyed with our proprietary colors</span></li>
                            <li class="text-gray-400"><span class="text-gray-600">Pre-washed &amp; pre-shrunk</span></li>
                            <li class="text-gray-400"><span class="text-gray-600">Ultra-soft 100% cotton</span></li>
                            </ul>
                        </div>
                    </div>

                    <div class="mt-10">
                        <h2 class="text-sm font-medium text-gray-900">Other Details</h2>

                        <div class="mt-4 space-y-6">
                            <p class="text-sm text-gray-600">Included other anime collectibles.</p>
                        </div>
                    </div> -->
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
    <FooterNav/>
    </div>
</template>
<script>
    import { StarIcon, ShieldCheckIcon, ShieldExclamationIcon } from "@heroicons/vue/24/solid";
    import { ShareIcon, HeartIcon, ArrowTrendingUpIcon } from "@heroicons/vue/24/outline";
    import UIMenu from "./UIMenu.vue";
    import FooterNav from './Footer.vue';
    import { ref, onMounted } from 'vue'
    import { Pagination, Navigation } from 'swiper'
    import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue';
    import ModalBid from '../components/ModalBid.vue';
    import 'swiper/css'
    import 'swiper/css/pagination'
    import 'swiper/css/navigation'
    import axiosClient from "../axios";
    import { useRoute } from "vue-router";
    import { Modal } from 'flowbite-vue';
    import { initFlowbite, Tooltip } from "flowbite";

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
            UIMenu,
            FooterNav,
            Modal,
            ModalBid
        },
        setup() {
            const route = useRoute();
            const productInfo = ref({});
            const productImages = ref({});
            const isLoading = ref(true);

            onMounted(async() => {
                initFlowbite();

                const result = await axiosClient.get(`/api/v1/product/${route.params.store}/${route.params.id}`).
                    then(response => {
                        productInfo.value = response.data;
                        productImages.value = response.data.images
                        isLoading.value = false; 
                        isMounted.value = true;
                    })
                    .catch((errors) => {
                        //window.location = '/404-page-not-found';
                        isInvalid.value = true;
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
                productInfo,
                isLoading,
                isMounted,
                isInvalid
            }
        },
        methods: {
            
        },
        beforeUnmount() {            
            console.log("leave...");
            isInvalid.value = false;
            isMounted.value = false;
        },
    }
</script>