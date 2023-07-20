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

            <div v-if="!searchingItem" class="mt-3 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4 px-1 pb-8">
                <div v-for="item in productItems" :key="item.id">
                    <div class="group relative pb-3 rounded-md border bg-white shadow-md">
                        <div class="min-h-50 aspect-h-2 aspect-w-2 w-full overflow-hidden rounded-t-md bg-gray-200 group-hover:opacity-90 lg:h-50">
                        <img :src="(item.product.thumbnail !== null) ? item.product.thumbnail.url : NoImageUrl" alt="" class="border border-gray-100 rounded-t-md h-full w-full object-cover object-center lg:h-full lg:w-full">
                        </div>
                        <div class="mt-3 mx-3 flex justify-between">
                            <div>
                                <h3 class="text-sm text-amber-500">
                                    <router-link :to="{name: 'auction-details', params: { id: item.product.slug}}" class="font-semibold">
                                        <span aria-hidden="true" class="absolute inset-0"></span>
                                        {{ textSubstr(item.product.name) }}
                                    </router-link>
                                </h3>
                            </div>
                        </div>
                        <div class="mx-3 relative">
                            <p class="mt-1 text-sm text-gray-400">Min. Bid: <span class="text-green-600">{{ item.product.currency.prefix+item.min_price.toLocaleString() }}</span></p>
                            <p class="mt-1 text-sm text-gray-400">Time to Bid</p>
                        </div>
                        <div class="mt-2 mx-3 text-2xl text-gray-500 flex justify-between items-center relative">
                            <span class="text-sm font-semibold text-red-500" v-if="isDone">
                                {{ expirationTimer[item.product.slug].days }}d
                                {{ expirationTimer[item.product.slug].hours }}h
                                {{ expirationTimer[item.product.slug].minutes }}m
                                {{ expirationTimer[item.product.slug].seconds }}s
                            </span>
                            <div class="text-sm font-semibold text-gray-200" v-else>...</div>
                            <router-link 
                                :to="{name: 'auction-details', 
                                params: { store: item.product.store.slug, id: item.product.slug }}" 
                                class="rounded-sm bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                                Bid
                            </router-link>
                        </div>
                    </div>
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

        await axiosClient.get('/api/v1/store/'+store+'/auctions'+key)
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
        components: {ShoppingCartIcon, HeartIcon, StarIcon, PlusSmallIcon, ItemsLoader},
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
                            expTimer[item.product.slug] = validateExpiration(item.ended_at);
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
                isDone
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