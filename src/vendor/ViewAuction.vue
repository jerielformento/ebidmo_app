<template>
    <div>
    <Transition>
    <div class="" v-if="!isLoading">
        <div class="pt-5 mb-10">
            <!-- Product info -->
            <div class="mx-auto bg-white border border-gray-200 max-w-2xl px-4 pt-5 sm:px-6 lg:grid lg:max-w-full lg:grid-cols-4 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-6 lg:pt-5">
            <div class="w-full lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <!-- Image gallery -->
                <p class="text-2xl font-medium text-gray-800 mb-5">Item Details</p>
                <div class="mx-auto sm:px-0 sm:w-full lg:w-full lg:px-16 md:px-5 rounded-md py-4">
                <swiper
                    :modules="modules"
                    :space-between="20"
                    :loop="true"
                    navigation
                    :pagination="{ clickable: true }"
                >   
                
                    <swiper-slide v-for="text in swiperItems" :key="text.url">
                        <div class="mx-auto max-w-3xl border-slate-600">
                            <div class="aspect-h-3 aspect-w-3 overflow-hidden rounded-md sm:block lg:block">
                                <div><img :src="text.url" alt="Two each of gray, white, and black shirts laying flat." class="w-full h-full object-cover object-center"></div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
                </div>
                
            </div>
            
            <!-- Options -->
            <div class="lg:col-span-4 mt-4 lg:row-span-3 lg:mt-0">
                <h2 class="sr-only">Product information</h2>
                <span class="text-2xl font-medium text-gray-500 flex items-center">{{ productInfo.store.name }} <ShieldCheckIcon class="ml-1 h-6 w-6 text-green-500"/></span>

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

                <!-- Auction -->
                <div>
                    <div v-if="productInfo.auction !== null">
                        <div>
                            <div class="text-2xl text-gray-500 mt-2 border-t border-gray-200">
                                <p class="my-2 text-2xl tracking-tight text-gray-600">Starting bid: <span class="text-green-500">{{ productInfo.auction.currency.prefix }}{{ productInfo.auction.min_price }}</span></p>
                                <div v-if="productInfo.auction.status == 1">
                                    <div class="block text-sm"><h3 class="font-medium text-red-500 inline-block">Ending in</h3></div>
                                    <span class="text-gray-700">{{days}}d {{ hours % 24 }}h {{ minutes % 60 }}m {{ seconds % 60 }}s</span>
                                </div>
                                <div v-else-if="productInfo.auction.status == 2">
                                    <div class="block text-sm"><h3 class="font-semibold text-amber-500 inline-block animate-pulse">Waiting for participants</h3></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mt-3 grid grid-cols-1 items-center text-sm p-3 border border-gray-200 rounded-md shadow-sm">
                            <div class="block font-semibold text-gray-800 mb-1"><h3 class="inline-block">Auction Details</h3></div>
                            <div class="block"><h3 class="inline-block">Minimum Price:</h3> <span class="text-green-600">{{ productInfo.auction.currency.prefix }}{{ productInfo.auction.min_price }}</span></div>
                            <div class="block"><h3 class="inline-block">Buy Now Price:</h3> <span class="text-green-600">{{ productInfo.auction.currency.prefix }}{{ productInfo.auction.buy_now_price }}</span></div>
                            <div class="block"><h3 class="inline-block">Incremental Bid Cost:</h3> <span class="text-green-600">{{ productInfo.auction.currency.prefix }}{{ productInfo.auction.increment_by }}</span></div>
                            <div class="block"><h3 class="inline-block">Expiration:</h3> <span class="text-gray-600">{{ moment(productInfo.auction.ended_at).format("lll") }}</span></div>
                            
                            <!-- <div v-if="productInfo.auction.status === 1" class="block mt-3"><h3 class="inline-block">Status:</h3> <span class="text-green-600 font-semibold">Active</span></div> -->
                        </div>
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
            <div class="mt-10 sm:col-span-6 flex justify-end border-t border-gray-300">
                <button @click="cancel" type="submit" :disabled="isSubmit" class="mt-3 mr-2 flex items-center justify-center border border-gray-200 rounded-md disabled:opacity-80 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200">
                    Cancel
                </button>
            </div>
            </div>
        </div>
    </div>
    <div v-else class="mt-3 w-full text-gray-500 bg-white p-3 mb-10 border border-gray-200 rounded-md">
            <div class="mx-auto sm:py-1 flex items-center justify-center">
                <Spinner class="h-6 w-6"/>
            </div>
        </div>
    </Transition>
    </div>
</template>
<script>
    import { StarIcon, ShieldCheckIcon, UserCircleIcon } from "@heroicons/vue/24/solid";
    import { ShareIcon, HeartIcon, ArrowTrendingUpIcon } from "@heroicons/vue/24/outline";
    import Spinner from "../components/forms/Spinner.vue";
    import { ref, onMounted } from 'vue'
    import { Pagination, Navigation } from 'swiper'
    import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue';
    import 'swiper/css'
    import 'swiper/css/pagination'
    import 'swiper/css/navigation'
    import axiosClient from "../axios";
    import { toast } from 'vue3-toastify';
    import { useRoute } from "vue-router";
    import { Modal } from 'flowbite-vue';
    import moment from 'moment';
    
    const polling = ref(null);
    const isSubmit = ref(false);
    const isMounted = ref(false);
    const bidHistory = ref({});
    const dateToday  = new Date(); 
    const getCurrentDate = ref(moment(dateToday).format("YYYY-MM-D HH:mm:ss"));

    export default {
        props: {
            cancel: Function,
            scrollToTop: Function,
            reload: Function,
        },
        components: {
            Swiper,
            SwiperSlide,
            StarIcon,
            ShieldCheckIcon,
            ShareIcon,
            HeartIcon,
            ArrowTrendingUpIcon,
            UserCircleIcon,
            Spinner,
            Modal
        },
        data() {
            const route = useRoute();
            const productInfo = ref({});
            const productImages = ref({});
            const isLoading = ref(true);
            const days = ref(0);
            const hours = ref(0);
            const minutes = ref(0);
            const seconds = ref(0);
            const isEnded = ref(false);

            onMounted(async() => {

                const result = await axiosClient.get(`/api/v1/customer/auction/${route.params.id}`).
                    then(response => {
                        productInfo.value = response.data;
                        productImages.value = response.data.images
                        isLoading.value = false; 

                        if(productInfo.value.auction !== null) {
                            const timeRemaining = new Date(productInfo.value.auction.ended_at);
                            const currDate = new Date();

                            if(currDate.getTime() > timeRemaining.getTime()) {
                                isEnded.value = true;
                            } else {
                                polling.value = setInterval(() => {
                                    const currDate = new Date();
                                    const endTime = timeRemaining - currDate;
                                    seconds.value = parseInt(endTime / 1000);
                                    minutes.value = parseInt(seconds.value / 60);
                                    hours.value = parseInt(minutes.value / 60);
                                    days.value = parseInt(hours.value / 24);
                                    console.log("poll");
                                }, 1000);
                            }
                        }
                    })
                    .catch((errors) => {
                        window.location = '/404-page-not-found';
                    });

                if(productInfo.value.auction !== null) {
                    await axiosClient.get(`/api/v1/auction/activity/${productInfo.value.auction.id}`)
                        .then(response => {
                            console.log(response.data);
                            bidHistory.value = response.data;
                        })
                        .catch((errors) => {
                            window.location = '/404-page-not-found';
                        });
                }

                isMounted.value = true;
                this.postdata.slug = productInfo.value.slug;
            });

            const swiperItems = ref(productImages);

            return {
                modules: [Pagination, Navigation], 
                swiperItems,
                productInfo,
                bidHistory,
                isLoading,
                isMounted,
                days,
                hours,
                minutes,
                seconds,
                getCurrentDate,
                postdata: {
                    slug: '',
                    min_price: '',
                    min_participants: '',
                    buy_now_price: '',
                    increment_price: '',
                    expiration: ''
                },
                errordata: {
                    slug: '',
                    min_price: '',
                    min_participants: '',
                    buy_now_price: '',
                    increment_price: '',
                    expiration: ''
                },
                isSubmit,
                isEnded,
                moment
            }
        },
        methods: {
            scrollToTop() {
                window.scrollTo(0,0);
            }
        },
        beforeUnmount() {
            console.log("leave...");
            bidHistory.value = [];
            isMounted.value = false;
            clearInterval(polling.value)
        },
    }
</script>