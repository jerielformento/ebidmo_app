<template>
    <div>
    <Transition>
    <div class="" v-if="!isLoading">
        <div class="pt-5 mb-10">
            <!-- Product info -->
            <div class="mx-auto bg-white border border-gray-200 max-w-2xl px-4 pt-5 sm:px-6 lg:max-w-full lg:gap-x-8 lg:px-8 lg:pb-6 lg:pt-5">
            <div class="flex justify-between w-full lg:col-span-2">
                <!-- Image gallery -->
                <p class="text-md font-medium text-gray-500 mb-2">Statistics</p>
                <button @click="cancel" type="submit" :disabled="isSubmit" class="flex items-center justify-between border border-gray-200 rounded-sm disabled:opacity-80 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200">
                    <ArrowLongLeftIcon class="h-5 w-5 mr-1" /> Back to list
                </button>
            </div>
            
            <!-- Options -->
            <div class="grid grid-cols-3 mt-4 gap-x-6 lg:mt-0">
                <!-- Title and socials -->
                <div class="pb-5 w-full flex justify-between items-center col-span-3">
                    <h1 class="text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl flex items-center justify-start"><img :src="(productInfo.product.thumbnail !== null) ? productInfo.product.thumbnail.url : NoImageUrl" alt="" draggable="false" class="border border-gray-100 rounded-sm h-10 w-10 object-cover object-center mr-3"> {{ productInfo.product.name }}</h1>
                </div>

                <!-- Description and details -->
                <div class="col-span-3">
                    <h3 class="sr-only">Description</h3>

                    <div class="pb-5 space-y-6 border-b border-gray-200">
                        <p class="text-base text-gray-700" v-html="productInfo.product.details"></p>
                    </div>

                    <div class="text-2xl text-gray-500 mt-2 pt-2">
                        <div v-if="!isEnded">
                            <div v-if="productInfo.status === 1">
                                <div class="block text-sm"><h3 class="font-medium text-red-500 inline-block">Ending in</h3></div>
                                <span class="text-gray-700">{{days}}d {{ hours % 24 }}h {{ minutes % 60 }}m {{ seconds % 60 }}s</span>
                            </div>
                            <div v-else-if="productInfo.status === 2">
                                <h1 class="text-amber-500 text-lg font-semibold animate-pulse">Waiting for participants</h1>
                            </div>
                        </div>
                        <div v-else>
                            <h1 class="text-red-500 text-2xl font-semibold">Auction Ended</h1>
                        </div>
                    </div>
                </div>

                <div class="py-3 col-span-3 md:col-span-3 lg:col-span-1">
                    <div class="mt-5 col-span-1">
                        <div class="mt-3 grid-cols-1 font-semibold text-sm">
                            <div class="block text-gray-500 mb-1"><h2 class="mb-2 text-gray-600 flex items-center justify-start text-xl"><InformationCircleIcon class="h-6 w-6 mr-2"/> Product Details</h2></div>
                            <div class="block text-sm"><h3 class="inline-block">Category:</h3> <a href="#" class="underline text-amber-500">{{ productInfo.product.category.title }}</a></div>
                            <div class="block text-sm"><h3 class="inline-block">Brand:</h3> <a href="#" class="underline text-amber-500">{{ productInfo.product.brand.description }}</a></div>
                            <div class="block text-sm"><h3 class="inline-block">Condition:</h3> <span class="text-gray-500">{{ productInfo.product.condition.description }}</span></div>
                            <div class="block text-sm"><h3 class="inline-block">Quantity:</h3> <span class="text-gray-500">{{ productInfo.product.quantity }}</span></div>
                        </div>
                   </div>
                </div>

                <!-- Auction -->
                <div class="py-3 col-span-3 md:col-span-3 lg:col-span-1">
                    <div class="mt-5 col-span-1">
                        <div class="mt-3 grid grid-cols-1 font-semibold items-center text-sm">
                            <div class="block text-gray-500 mb-1"><h2 class="mb-2 text-gray-600 flex items-center justify-start text-xl"><Cog6ToothIcon class="h-6 w-6 mr-2"/> Auction Setting</h2></div>
                            <div class="block"><h3 class="inline-block">Minimum Price:</h3> <span class="text-green-600">{{ productInfo.product.currency.prefix }}{{ productInfo.min_price }}</span></div>
                            <div class="block"><h3 class="inline-block">Buy Now Price:</h3> <span class="text-green-600">{{ productInfo.currency.prefix }}{{ productInfo.buy_now_price }}</span></div>
                            <div class="block"><h3 class="inline-block">Incremental Bid Cost:</h3> <span class="text-green-600">{{ productInfo.currency.prefix }}{{ productInfo.increment_by }}</span></div>
                            <div class="block"><h3 class="inline-block">Expiration:</h3> <span class="text-gray-600">{{ moment(productInfo.ended_at).format("lll") }}</span></div>
                        </div>
                    </div>
                </div>
                <div class="py-3 col-span-3 md:col-span-3 lg:col-span-1">
                    <div v-if="productInfo.winner !== null" class="mt-5">
                        <h2 class="font-semibold mb-2 text-gray-600 flex items-center justify-start text-xl"><TrophyIcon class="h-6 w-6 mr-2"/> Winner</h2>
                        <span class="text-xs block text-gray-500 font-semibold mb-1 ml-1">Highest bidder</span>
                        <div class="grid space-y-2 max-h-2xl">
                            <div class="grid grid-cols-1 items-center p-3 bg-green-300 border border-gray-200 ring-2 ring-inset ring-slate-800 rounded-md shadow-sm text-md text-gray-700">
                                <span class="text-sm font-semibold text-gray-800 flex justify-between">{{ productInfo.winner.username }} <ArrowTrendingUpIcon class="h-5 w-5 text-green-600"/></span>
                            </div>
                        </div>
                    </div>
                    <div v-else class="mt-5">
                        <h2 class="font-semibold mb-2 text-gray-600 flex justify-start text-2xl"><TrophyIcon class="h-8 w-8 mr-2"/> Winner</h2>
                        <span class="text-xs block text-gray-500 font-semibold mb-1 ml-1">Not available</span>
                    </div>

                    <div v-if="productInfo.purchase !== null" class="mt-5">
                        <h2 class="font-semibold mb-2 text-gray-600 flex items-center justify-start text-xl"><ShoppingBagIcon class="h-6 w-6 mr-2"/> Purchased</h2>
                        <span class="text-xs block text-gray-500 font-semibold mb-1 ml-1">Customer</span>
                        <div class="grid space-y-2 max-h-2xl">
                            <div class="grid grid-cols-1 items-center p-3 bg-green-300 border border-gray-200 ring-2 ring-inset ring-slate-800 rounded-md shadow-sm text-md text-gray-700">
                                <span class="text-sm font-semibold text-gray-800 flex justify-between">{{ productInfo.purchase.username }} <ArrowTrendingUpIcon class="h-5 w-5 text-green-600"/></span>
                            </div>
                        </div>
                    </div>
                    <div v-else class="mt-5">
                        <h2 class="font-semibold mb-2 text-gray-600 flex justify-start text-2xl"><TrophyIcon class="h-8 w-8 mr-2"/> Purchased</h2>
                        <span class="text-xs block text-gray-500 font-semibold mb-1 ml-1">Not available</span>
                    </div>
                </div>
                <div class="mt-5 py-5 col-span-3 md:col-span-3 lg:col-span-1">
                    <h2 class="font-semibold mb-2 text-gray-400">Activity Log</h2>
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
                                            {{ bid.customer.profile.first_name }} {{ bid.customer.profile.last_name }}
                                        </p>
                                        <p class="text-sm text-gray-400 truncate dark:text-gray-400">
                                            {{ moment(bid.time).format("lll") }}
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-green-500 dark:text-white">
                                        {{ productInfo.currency.prefix+bid.price.toLocaleString() }}
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
            </div>
        </div>
    </div>
    <div v-else class="mt-3 w-full text-gray-500 bg-white p-3 mb-10 border border-gray-200 rounded-sm">
            <div class="mx-auto sm:py-1 flex items-center justify-center">
                <Spinner class="h-6 w-6"/>
            </div>
        </div>
    </Transition>
    </div>
</template>
<script>
    import { StarIcon, ShieldCheckIcon } from "@heroicons/vue/24/solid";
    import { ShareIcon, HeartIcon, ArrowTrendingUpIcon, TrophyIcon, ShoppingBagIcon, ArrowLongLeftIcon, Cog6ToothIcon, InformationCircleIcon, UserCircleIcon } from "@heroicons/vue/24/outline";
    import Spinner from "../../components/forms/Spinner.vue";
    import { ref, onMounted } from 'vue'
    import { Pagination, Navigation } from 'swiper'
    import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue';
    import 'swiper/css'
    import 'swiper/css/pagination'
    import 'swiper/css/navigation'
    import axiosClient from "../../axios";
    import { toast } from 'vue3-toastify';
    import { useRoute } from "vue-router";
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
            leave: Function,
        },
        components: {
            Swiper,
            SwiperSlide,
            Spinner,
            StarIcon,
            ShieldCheckIcon,
            ShareIcon,
            HeartIcon,
            ArrowTrendingUpIcon,
            TrophyIcon,
            ShoppingBagIcon,
            ArrowLongLeftIcon,
            Cog6ToothIcon,
            InformationCircleIcon,
            UserCircleIcon
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
                const result = await axiosClient.get(`/api/v1/customer/auction/bid/${route.params.id}`).
                    then(response => {
                        productInfo.value = response.data;
                        productImages.value = response.data.product.images;
                        isLoading.value = false; 

                        if(productInfo.value.bid !== null) {
                            const timeRemaining = new Date(productInfo.value.ended_at);
                            const currDate = new Date();

                            if(productInfo.value.status === 1) {
                                polling.value = setInterval(() => {
                                    const currDate = new Date();
                                    const endTime = timeRemaining - currDate;
                                    seconds.value = parseInt(endTime / 1000);
                                    minutes.value = parseInt(seconds.value / 60);
                                    hours.value = parseInt(minutes.value / 60);
                                    days.value = parseInt(hours.value / 24);
                                    console.log("poll");
                                }, 1000);
                            } else if(productInfo.value.status === 2) {
                                // no action
                            } else {
                                isEnded.value = true;
                            }
                        }
                    })
                    .catch((errors) => {
                        //window.location = '/404-page-not-found';
                    });

                if(productInfo.value.bid !== null) {
                    await axiosClient.get(`/api/v1/auction/activity/${productInfo.value.id}`)
                        .then(response => {
                            console.log(response.data);
                            bidHistory.value = response.data;
                        })
                        .catch((errors) => {
                            //window.location = '/404-page-not-found';
                        });
                }

                isMounted.value = true;
                this.postdata.slug = productInfo.value.product.slug;
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
                    buy_now_price: '',
                    increment_price: '',
                    expiration: ''
                },
                errordata: {
                    slug: '',
                    min_price: '',
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
            async submit() {
                isSubmit.value = true;
                
                console.log(this.postdata);

                await axiosClient.get(import.meta.env.VITE_CSRF_AUTH_URL);
                await axiosClient.post('/api/v1/auctions', this.postdata)
                    .then(response => {
                        toast.success(response.data.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });

                        isSubmit.value = false;
                        this.cancel();
                        this.scrollToTop();
                        this.reload();
                    })
                    .catch((error) => {
                        isSubmit.value = false;
                        const err = error.response;

                        toast.error(err.data.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });

                        // reset error data
                        Object.entries(this.errordata).forEach(entry => {
                            const [key, value] = entry;
                            this.errordata[key] = '';
                        });

                        // get return object errors and pass to error inputs
                        Object.entries(err.data.errors).forEach(entry => {
                            const [key, value] = entry;
                            this.errordata[key] = value[0];
                        });
                    })
                    .finally(() => {

                    });
            },
            updateCurrentDate() {
                this.postdata.expiration = moment(this.$refs.datepicker.value).format("YYYY-MM-DD HH:mm:ss");
            },
            scrollToTop() {
                window.scrollTo(0,0);
            },
            redirectError() {
                route.push({
                    name: 'home'
                });
            }
        },
        beforeUnmount() {
            console.log("leave...");
            this.leave();
            bidHistory.value = [];
            isMounted.value = false;
            clearInterval(polling.value)
        },
    }
</script>