<template>
    <div class="pb-10">
        <div class="mx-auto max-w-2xl px-2 sm:px-2 sm:py-1 lg:max-w-7xl lg:px-2">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold tracking-tight text-gray-700 block">
                Auctions
                </h2>
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

            <div v-for="items in swiperItems" :key="items">
                <div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-4 xl:gap-x-4 px-1 pb-8" v-if="isDone">
                    <div v-for="item in items" :key="item.id" class="rounded-md border bg-white shadow-md">
                        <AuctionCard :item="item" :timer="expirationTimer[item.product.slug]"/>
                    </div>
                </div>
                <div v-else>
                    <ItemsLoader />
                </div>
            </div>
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
    import { ref, onMounted } from 'vue'
    import { FireIcon } from "@heroicons/vue/24/outline";
    import { Autoplay, Pagination, Navigation } from 'swiper'
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import ItemsLoader from './util/ItemsLoader.vue';
    import axiosClient from '../axios';
    import { useAuctionColorCode } from '../composables/useAuctionColorCode';
    import { useAuctionStatus } from '../composables/useAuctionStatus';
    import AuctionCard from './forms/AuctionCard.vue';
    import { setExpirationTimer } from '../composables/setExpirationTimer';
    import 'swiper/css'
    import 'swiper/css/pagination'
    import 'swiper/css/navigation'
    
    const polling = ref(null);
    const swiperItems = ref(null);
    const searchingItem = ref(false);

    const getHotCollections = async (filter, category, brand) => {
        let pagedata = [];
        let resdata = [];
        let paginate_count = 0;
        let categories = "";
        const auction_filter = (filter !== null && filter !== undefined) ? "?filter="+filter : "?filter=";

        if(category !== null) {
            //"?category="+category : "?category=";
            category.map(function(item) {
                categories += "&category[]="+item;
            });
        } 
        let brands = "";
        if(brand !== null) {
            brand.map(function(item) {
                brands += "&brand[]="+item;
            });
        }

        await axiosClient.get('/api/v1/auctions/all'+auction_filter+categories+brands)
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

    export default {
        props: ['filter'],
        watch: {
            'filter.type': {
                async handler(newVal, oldVal) {
                    searchingItem.value = true;
                    // newVal = updated month_id
                    let category = this.$props.filter.category;
                    let brand = this.$props.filter.brand;
                    const products = await getHotCollections(newVal, category, brand);
                    swiperItems.value = products;
                    searchingItem.value = false;
                },
                deep: true
            },
            'filter.category': {
                async handler(newVal, oldVal) {
                    searchingItem.value = true;
                    // newVal = updated month_id
                    let filter = this.$props.filter.auction;
                    let brand = this.$props.filter.brand;
                    const products = await getHotCollections(filter, newVal, brand);
                    swiperItems.value = products;
                    searchingItem.value = false;
                },
                deep: true
            },
            'filter.brand': {
                async handler(newVal, oldVal) {
                    searchingItem.value = true;
                    // newVal = updated month_id
                    let filter = this.$props.filter.auction;
                    let category = this.$props.filter.category;
                    const products = await getHotCollections(filter, category, newVal);
                    swiperItems.value = products;
                    searchingItem.value = false;
                },
                deep: true
            }
        },
        components: { Swiper, SwiperSlide, ItemsLoader, FireIcon, AuctionCard },
        async setup() {
            const isDone = ref(false);

            const expirationTimer = ref({});

            const products = await getHotCollections(null, null, null);

            // timer setter for bid expiration
            polling.value = setInterval(() => {
                let expTimer = {};
                Object.entries(products).forEach(entry => {
                    const [key, items] = entry; 
                    items.forEach(function(item) {
                        if(item.status === 2) {
                            expTimer[item.product.slug] = setExpirationTimer(item.started_at);
                        } else {
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