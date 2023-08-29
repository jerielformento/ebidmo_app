<template>
    <div class="pt-5">
        <div class="mx-auto max-w-2xl px-2 sm:px-2 sm:py-1 lg:max-w-7xl lg:px-2">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold tracking-tight text-gray-700 block">
                Happening Now
                </h2>

                <div>
                    <router-link :to="{ name: 'auctions' }" class="text-sm font-semibold underline text-amber-500 inline-block"><p>View all</p></router-link>
                </div>
            </div>
    <swiper v-if="!searchingItem"
        :modules="modules"
        :space-between="20"
        :loop="true"
        :pagination="{ clickable: true }"
        navigation
        :autoplay="{
            delay: 7000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        }"
    >   
            <swiper-slide v-for="items in swiperItems" :key="items">
                <div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:gap-x-4 px-1 pb-8" v-if="isDone">
                    <div v-for="item in items" :key="item.item" class="rounded-md border bg-white shadow-md">
                        <AuctionCard :item="item" :timer="expirationTimer[item.product.slug]"/>
                    </div>
                    
                </div>
                <div v-else>
                    <ItemsLoader />
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
    import { FireIcon, BuildingStorefrontIcon } from "@heroicons/vue/24/outline";
    import { Autoplay, Pagination, Navigation } from 'swiper'
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import ItemsLoader from './util/ItemsLoader.vue';
    import axiosClient from '../axios';
    import { useAuctionColorCode } from '../composables/useAuctionColorCode';
    import { useAuctionStatus } from '../composables/useAuctionStatus';
    import { setExpirationTimer } from '../composables/setExpirationTimer';
    import AuctionCard from './forms/AuctionCard.vue';
    import 'swiper/css'
    import 'swiper/css/pagination'
    import 'swiper/css/navigation'

    const polling = ref(null);
    const swiperItems = ref(null);
    const searchingItem = ref(false);

    const getAuctions = async () => {
        let pagedata = [];
        let resdata = [];
        let paginate_count = 0;

        await axiosClient.get('/api/v1/auctions/all')
            .then(response => {
                response.data.map(function(value, key) {
                    if(paginate_count == 5) {
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

    export default {
        components: { Swiper, SwiperSlide, ItemsLoader, FireIcon, AuctionCard },
        async setup() {
            const isDone = ref(false);
            const expirationTimer = ref({});
            const products = await getAuctions();

            // timer setter for bid expiration
            polling.value = setInterval(() => {
                let expTimer = {};
                Object.entries(products).forEach(entry => {
                    const [key, items] = entry; 
                    items.forEach(function(item) {
                        if(item.status === 2) {
                            expTimer[item.product.slug] = setExpirationTimer(item.started_at);
                        } else if(item.status === 1) {
                            expTimer[item.product.slug] = setExpirationTimer(item.ended_at);
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
                searchingItem,
                useAuctionStatus,
                useAuctionColorCode
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