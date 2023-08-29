<template>
    <div class="bg-gray-100 pb-10">
        <div class="mx-auto max-w-2xl px-4 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-16">
            <router-view v-if="productCreate" :cancel="cancel"></router-view>
            <div class="flex justify-between items-center">
                <h2 class="text-sm font-semibold tracking-tight text-gray-500 block ml-1">
                Auction Listing
                </h2>

                <div class="">
                    <div class="flex items-center justify-between">

                    </div>
                </div>
            </div>

            <div v-if="!searchingItem && isDone" class="mt-3 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-4 px-1 pb-8">
                <div v-for="item in productItems" :key="item.id" class="rounded-md border bg-white shadow-md">
                    <AuctionCard :item="item" :timer="expirationTimer[item.product.slug]"/>
                </div>
            </div>
            <div v-else class="mt-3 gap-y-10 pb-8 max-w-full">
                <ItemsLoader />
            </div>
            <div v-if="!productItems" class="pb-8">
                <div class="w-full p-3 rounded-md border bg-white shadow-md h-32 flex items-center justify-center">
                    <h2 class="text-gray-300">No available product to show.</h2>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { ref } from 'vue'
    import { ShoppingCartIcon } from "@heroicons/vue/24/outline";
    import { HeartIcon, StarIcon, PlusSmallIcon } from "@heroicons/vue/24/solid";
    import ItemsLoader from './util/ItemsLoader.vue';
    import axiosClient from '../axios';
    import { useAuctionColorCode } from '../composables/useAuctionColorCode';
    import { useAuctionStatus } from '../composables/useAuctionStatus';
    import { setExpirationTimer } from '../composables/setExpirationTimer';
    import AuctionCard from './forms/AuctionCard.vue';

    const productCreate = ref(false);
    const productBidCreate = ref(false);
    const storeName = ref(null);
    const polling = ref(null);
    const productItems = ref(null);
    const searchingItem = ref(false);

    const getMyProducts = async (store, search) => {
        let pagedata = [];
        let resdata = [];

        const key = (search !== null && search !== "") ? "?search="+search : "";

        await axiosClient.get('/api/v1/stores/'+store+'/auctions'+key)
            .then(response => {
                response.data.map(function(value, key) {
                    pagedata.push(value);
                });

                if(pagedata.length > 0) {
                    resdata.push(pagedata);
                } 
            })
                    
        //await new Promise(resolve => setTimeout(resolve, 3000));
        return [resdata, pagedata];
    }

    export default {
        components: {ShoppingCartIcon, HeartIcon, StarIcon, PlusSmallIcon, ItemsLoader, AuctionCard},
        props: ['store', 'search'],
        watch: {
            async search(newVal, oldVal) {
                searchingItem.value = true;
                // newVal = updated month_id
                const resdata = await getMyProducts(storeName.value, newVal);

                //console.log(resdata);
                const products = resdata[0];
                //console.log(products[0]);
                productItems.value = products[0];
                searchingItem.value = false;
            },
        },
        async setup(props) {
            const isDone = ref(false);
            const expirationTimer = ref({});
            storeName.value = props.store;
            const resdata = await getMyProducts(props.store, null);

            // timer setter for bid expiration
            polling.value = setInterval(() => {
                let expTimer = {};
                Object.entries(resdata[0]).forEach(entry => {
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

            //console.log(resdata);
            const products = resdata[0];
            //console.log(products[0]);
            productItems.value = products[0];

            return { 
                NoImageUrl: import.meta.env.VITE_NO_IMAGE_URL,
                productItems,
                productCreate,
                productBidCreate,
                props,
                searchingItem,
                expirationTimer,
                isDone,
                useAuctionColorCode,
                useAuctionStatus
            }
        },
        methods: {
            createProduct() {
                productCreate.value = true;
            },
            cancel() {
                productCreate.value = false;
            },
            createBidProduct() {
                productBidCreate.value = true;
            },
            cancelBid() {
                productBidCreate.value = false;
            },
            textSubstr(text) {
                let new_string = '';
                if(text.length > 28) {
                    new_string = String(text).substring(0,28)+'..';
                } else {
                    new_string = String(text).substring(0,28);
                }
                return new_string;
            }
        },
        beforeUnmount() {
            clearInterval(polling.value);
        },
    }
</script>