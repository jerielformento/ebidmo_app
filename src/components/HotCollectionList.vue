<template>
    <div class="pt-5">
        <div class="mx-auto max-w-2xl px-2 sm:px-2 sm:py-1 lg:max-w-7xl lg:px-2">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold tracking-tight text-gray-700 block">
                <FireIcon class="h-8 w-8 inline-block text-red-500"/>
                Hot Collections - Auction
                </h2>

                <div>
                    <a href="#" class="text-sm underline text-amber-500 inline-block"><p>View all</p></a>
                </div>
            </div>
    <swiper v-if="!searchingItem"
        :modules="modules"
        :space-between="20"
        :loop="true"
        :pagination="{ clickable: true }"
        :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        }"
    >   
            <swiper-slide v-for="items in swiperItems" :key="items">
                <div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:gap-x-4 px-1 pb-8">
                    <div v-for="text in items" :key="text.item" class="rounded-md border bg-white shadow-md">
                    <div class="group relative pb-3">
                        <div class="absolute right-2 top-2 z-10 rounded-full bg-red-600">
                            <FireIcon class="h-8 w-8 text-red-200"/>
                        </div>
                        <div class="min-h-50 aspect-h-2 aspect-w-2 w-full overflow-hidden rounded-t-md bg-gray-200 group-hover:opacity-90 lg:h-50">
                            <img :src="(text.product.thumbnail !== null) ? text.product.thumbnail.url : NoImageUrl" alt="" class="border border-gray-100 rounded-t-md w-full object-cover object-center lg:h-full lg:w-full">
                        </div>
                        <div class="mt-3 mx-3 flex justify-between">
                            <div>
<<<<<<< HEAD
                                <h3 class="text-sm text-amber-500">
=======
                                <h3 class="text-sm text-amber-500 break-all">
>>>>>>> development
                                <router-link :to="{name: 'auction-details', params: { store: text.product.store.slug, id: text.product.slug }}" class="font-semibold">
                                    <span aria-hidden="true" class="absolute inset-0"></span>
                                    {{ textSubstr(text.product.name) }}
                                </router-link>
                                </h3>
                            </div>
                        </div>
                        <div class="relative mx-3">
                            <p class="mt-1 text-sm block font-semibold text-gray-600">{{ text.product.store.name }}</p>
                            <p class="mt-1 text-sm text-gray-400">Min. Bid: <span class="text-green-600">{{ text.product.currency.prefix+text.min_price.toLocaleString() }}</span></p>
                            <p class="mt-1 text-sm text-gray-400" v-if="text.status === 1">Ending in</p>   
                            <p class="mt-1 text-sm text-gray-400" v-else>Participants: {{ text.min_participants }}/{{ text.participants_count }}</p>   
                        </div>
                        <div v-if="text.status === 1" class="text-2xl mx-3 text-gray-500 flex justify-between items-center relative">
                            <span class="text-sm font-semibold text-red-500" v-if="isDone">
                                {{ expirationTimer[text.product.slug].days }}d
                                {{ expirationTimer[text.product.slug].hours }}h
                                {{ expirationTimer[text.product.slug].minutes }}m
                                {{ expirationTimer[text.product.slug].seconds }}s
                            </span>
                            <div class="text-sm font-semibold text-gray-200" v-else>...</div>
                            <router-link 
                                :to="{name: 'auction-details', 
                                params: { store: text.product.store.slug, id: text.product.slug }}" 
                                class="rounded-sm bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                                Bid
                            </router-link>
                        </div>
                        <div v-else>
<<<<<<< HEAD
                            <div class="text-2xl mx-3 text-gray-500 flex justify-between items-center relative">
                            <span class="text-xs font-semibold text-amber-500 animate-pulse" v-if="isDone">
                                Waiting participants
                            </span>
                            <div class="text-sm font-semibold text-gray-200" v-else>...</div>
                            <router-link 
                                :to="{name: 'auction-details', 
                                params: { store: text.product.store.slug, id: text.product.slug }}" 
                                class="rounded-sm bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                                Join
                            </router-link>
                        </div>
=======
                            <div class="text-2xl mx-3 text-gray-500 flex justify-between lg:justify-between lg:flex md:block md:justify-stretch items-center relative">
                                <p class="pt-2 md:py-2 text-xs font-semibold text-amber-500 animate-pulse" v-if="isDone">
                                    Waiting participants
                                </p>
                                <div class="text-sm font-semibold text-gray-200" v-else>...</div>
                                <router-link 
                                    :to="{name: 'auction-details', 
                                    params: { store: text.product.store.slug, id: text.product.slug }}" 
                                    class="md:block lg:flex md:text-center rounded-sm bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                                    Join
                                </router-link>
                            </div>
>>>>>>> development
                        </div>
                    </div>
                </div>
            </div>
            </swiper-slide>
            <div v-if="swiperItems.length === 0" class="mt-6 pb-8">
                <div class="w-full p-3 rounded-md border bg-white shadow-md h-32 flex items-center justify-center">
                    <h2 class="text-gray-300">No available product to show.</h2>
                </div>
            </div>
    </swiper>
    <div v-else>
        <ItemsLoader />
    </div>
    </div>
</div>
</template>

<script>
    import { ref } from 'vue'
    import { ArrowPathIcon, FireIcon } from "@heroicons/vue/24/outline";
    import { Autoplay, Pagination, Navigation } from 'swiper'
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import ItemsLoader from './util/ItemsLoader.vue';
    import axiosClient from '../axios';
    import 'swiper/css'
    import 'swiper/css/pagination'
    import 'swiper/css/navigation'

    const polling = ref(null);
    const swiperItems = ref(null);
    const searchingItem = ref(false);

    const getHotCollections = async (category, brand) => {
        let pagedata = [];
        let resdata = [];
        let paginate_count = 0;
        const categ = (category !== null) ? "?category="+category : "?category=";
        let brands = "";
        if(brand !== null) {
            brand.map(function(item) {
                console.log("&brand[]="+item);
                brands += "&brand[]="+item;
            });
        }

        await axiosClient.get('/api/v1/bids/all'+categ+brands)
                .then(response => {
                    response.data.map(function(value, key) {
                        if(paginate_count == 4) {
                            resdata.push(pagedata);
                            pagedata = [];
                            pagedata.push(value);
                            paginate_count = 1;
                        } else {
                            pagedata.push(value);
                            paginate_count++;
                        }
                    });

                    if(pagedata.length > 0) {
                        resdata.push(pagedata);
                    }

                    
                })

        return resdata;
    }

    const validateExpiration = (itemExpAt) => {
        const days = ref(0);
        const hours = ref(0);
        const minutes = ref(0);
        const seconds = ref(0);
        const timeRemaining = new Date(itemExpAt);
        const currDate = new Date();
        const endTime = timeRemaining - currDate;
        seconds.value = parseInt(endTime / 1000);
        minutes.value = parseInt(seconds.value / 60);
        hours.value = parseInt(minutes.value / 60);
        days.value = parseInt(hours.value / 24);

        return {
            'days': days.value,
            'hours': (hours.value % 24),
            'minutes': (minutes.value % 60),
            'seconds': (seconds.value % 60)
        };
    }

    export default {
        props: ['filter'],
        watch: {
            'filter.category': {
                async handler(newVal, oldVal) {
                    searchingItem.value = true;
                    // newVal = updated month_id
                    let brand = this.$props.filter.brand;
                    const products = await getHotCollections(newVal, brand);
                    swiperItems.value = products;
                    searchingItem.value = false;
                },
                deep: true
            },
            'filter.brand': {
                async handler(newVal, oldVal) {
                    searchingItem.value = true;
                    // newVal = updated month_id
                    let category = this.$props.filter.category;
                    const products = await getHotCollections(category, newVal);
                    swiperItems.value = products;
                    searchingItem.value = false;
                },
                deep: true
            }
        },
        components: { Swiper, SwiperSlide, ItemsLoader, FireIcon, ArrowPathIcon },
        async setup() {
            const isDone = ref(false);

            const expirationTimer = ref({});

            const products = await getHotCollections(null, null);

            // timer setter for bid expiration
            polling.value = setInterval(() => {
                let expTimer = {};
                Object.entries(products).forEach(entry => {
                    const [key, items] = entry; 
                    items.forEach(function(item) {
                        if(item.status === 1) {
                            expTimer[item.product.slug] = validateExpiration(item.ended_at);
                        }
                    });
                });

                console.log("poll");
                expirationTimer.value = {};
                expirationTimer.value = expTimer;

                if(!isDone.value) {
                    isDone.value = true;
                }
            }, 1000);

            swiperItems.value = products;

            return {
                NoImageUrl: import.meta.env.VITE_NO_IMAGE_URL,
                modules: [Pagination, Autoplay, Navigation], 
                swiperItems,
                expirationTimer,
                isDone,
                searchingItem
            }
        },
        methods: {
            textSubstr(text) {
                let new_string = '';
                if(text.length > 20) {
                    new_string = String(text).substring(0,20)+'..';
                } else {
                    new_string = String(text).substring(0,20);
                }
                return new_string;
            }
        },
        beforeUnmount() {
            console.log("leave...");
            clearInterval(polling.value)
        },
    }
</script>