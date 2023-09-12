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
                        <router-link :to="{ name: 'marketplace' }" class="mr-2 text-sm font-medium text-gray-900">Category</router-link>
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" class="h-5 w-4 text-gray-300">
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                    </div>
                    </li>
                    <li>
                    <div class="flex items-center">
                        <router-link :to="{ name: 'marketplace', query: { category: productInfo.category.id }}" class="mr-2 text-sm font-medium text-gray-900">{{ productInfo.category.title }}</router-link>
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" class="h-5 w-4 text-gray-300">
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                    </div>
                    </li>
                    <li>
                    <div class="flex items-center">
                        <router-link :to="{ name: 'marketplace', query: { brand: productInfo.brand.id }}" class="mr-2 text-sm font-medium text-gray-900">{{ productInfo.brand.description }}</router-link>
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
                                    <div><img :src="text.url" alt="Two each of gray, white, and black shirts laying flat." class="w-full h-full object-cover object-center"></div>
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
                                        <div><img :src="text.url" alt="Two each of gray, white, and black shirts laying flat." class="w-full h-full object-cover object-center"></div>
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
                    <div v-if="!productInfo.owner" class="grid grid-cols-2 space-x-2 mt-5">
                        
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
                            <ShareNetwork
                                network="facebook"
                                :url="siteUrl+route.fullPath"
                                :title="productInfo.name"
                                :description="productInfo.name"
                                hashtags="ebidmo,auction"
                            >
                                <ShareIcon class="h-6 w-6 text-amber-500"/>
                            </ShareNetwork>
                      
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
                <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-8">
                    <Suspense>
                        <StoreProductSuggestion :store="productInfo.store.slug" :product="productInfo.slug"/>
                    </Suspense>
                    <Suspense>
                        <StoreSimilarProductSuggestion :store="productInfo.store.slug" :category="productInfo.category.id"/>
                    </Suspense>
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
    import { ShareIcon, HeartIcon, ArrowTrendingUpIcon } from "@heroicons/vue/24/outline";
    import HeaderNav from "./layouts/Header.vue";
    import FooterNav from './layouts/Footer.vue';
    import SearchBar from './layouts/SearchBar.vue';
    import StoreProductSuggestion from "../components/StoreProductSuggestion.vue";
    import StoreSimilarProductSuggestion from "../components/StoreSimilarProductSuggestion.vue";
    import { ref, onMounted } from 'vue'
    import { Pagination, Navigation, Thumbs } from 'swiper'
    import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue';
    import 'swiper/css'
    import 'swiper/css/pagination'
    import 'swiper/css/navigation'
    import axiosClient from "../axios";
    import { useRoute } from "vue-router";
    import { initFlowbite, Tooltip } from "flowbite";
    import { useSeoMeta } from '@vueuse/head'
</script>
<script>
const getProductSuggestion = async (item) => {
        let itemdata = [];
        let resdata = [];
        searchingItem.value = true;

        await axiosClient.get(`/api/v1/products/${item.store}/suggestion`).
            then(response => {
                response.data.map(function(value, key) {
                    if(value.slug !== item.product) {
                        itemdata.push(value);
                    }
                });
                resdata.push(itemdata);
            })
            .catch((errors) => {
                //window.location = '/404-page-not-found';
                isInvalid.value = true;
            });

        searchingItem.value = false;
                    
        return resdata[0];
    }
    export default {
        data() {
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
                initFlowbite();

                await axiosClient.get(`/api/v1/products/${route.params.store}/${route.params.id}`).
                    then(response => {
                        productInfo.value = response.data;
                        productImages.value = response.data.images

                        // add meta tags
                        useSeoMeta({
                            ogDescription: productInfo.value.name,
                            ogTitle: productInfo.value.name,
                            ogImage: productInfo.value.thumbnail.url,
                            ogUrl: import.meta.env.VITE_URL+route.fullPath
                        })

                        isLoading.value = false; 
                        isMounted.value = true;
                    })
                    .catch((errors) => {
                        //window.location = '/404-page-not-found';
                        isLoading.value = false;
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
                siteUrl: import.meta.env.VITE_API_URL,
                modules: [Pagination, Navigation, Thumbs], 
                Thumbs,
                thumbsSwiper,
                setThumbsSwiper,
                swiperItems,
                productInfo,
                isLoading,
                isMounted,
                isInvalid,
                route
            }
        },
        methods: {
            
        },
        beforeUnmount() {            
            console.log("leave...");
            this.isInvalid = false;
            this.isMounted = false;
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