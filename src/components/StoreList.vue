<template>
    <div class="bg-gray-100 pb-10">
        <div class="mx-auto max-w-2xl px-4 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-16">
            <router-view v-if="productCreate" :cancel="cancel"></router-view>
            <div class="flex justify-between items-center">
                <h2 class="text-sm font-semibold tracking-tight text-gray-500 block ml-1">
                Store Listing
                </h2>

                <div class="">
                    <!-- <a href="#" class="text-sm underline text-amber-500 inline-block"><p>View all</p></a>
                    <a href="#" class="ml-2 text-sm underline text-amber-500 inline-block"><p>Top Bids</p></a>
                    <a href="#" class="ml-2 text-sm underline text-amber-500 inline-block"><p>Popular</p></a> -->
                </div>
            </div>

            <div class="mt-3 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4 px-1 pb-8">
                <div v-for="store in storeList" :key="store.id">
                    <div class="group relative p-3 rounded-sm border bg-white shadow-md">
                        <div class="min-h-50 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-100 lg:aspect-none group-hover:opacity-90 lg:h-50 flex items-center">
                        <!--<img src="#" alt="" class="border h-full w-full object-cover object-center lg:h-full lg:w-full">-->
                            <BuildingStorefrontIcon class="text-gray-400"/>
                        </div>
                        <div class="mt-4 flex justify-between">
                            <div>
                                <h3 class="text-sm text-amber-500">
                                    <router-link :to="{name: 'vendor-details', params: { store: store.slug}}" class="font-semibold flex items-center">
                                        <span aria-hidden="true" class="absolute inset-0"></span>
                                        <span class="mr-1">{{ store.name }}</span>
                                        <ShieldCheckIcon v-if="store.verified === 1" class="h-5 w-5 text-green-500"/>
                                        <ShieldExclamationIcon v-else class="h-5 w-5 text-gray-400"/>
                                    </router-link>
                                </h3>
                            </div>
                        </div>
                        <div class="relative">
                            <p class="text-sm font-normal text-gray-400">100 Followers</p>
                            <!-- <p class="mt-1 text-sm text-gray-500">Brand: <a class="text-amber-600 underline">{{ item.brand.description }}</a></p>
                            <p class="mt-1 text-sm text-gray-500">Condition: <a class="text-amber-600 underline">{{ item.condition.description }}</a></p>
                            <p class="mt-1 text-sm text-gray-500">Quantity: <span class="text-gray-600">{{ item.quantity }}</span></p> -->
                        </div>
                        <div class="mt-1 text-2xl text-gray-500 flex justify-between items-center relative">
                            <div class="flex">
                                    <div class="flex items-center">
                                        <!-- Active: "text-gray-900", Default: "text-gray-200" -->
                                        <StarIcon class="text-yellow-400 h-5 w-5 flex-shrink-0" />
                                        <StarIcon class="text-yellow-400 h-5 w-5 flex-shrink-0" />
                                        <StarIcon class="text-yellow-400 h-5 w-5 flex-shrink-0" />
                                        <StarIcon class="text-yellow-400 h-5 w-5 flex-shrink-0" />
                                        <StarIcon class="text-gray-200 h-5 w-5 flex-shrink-0" />
                                        <span class="text-sm font-semibold ml-1">4.0</span>
                                    </div>
                                </div>
                                <button type="submit" onclick="alert(1)" class="rounded-sm bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                                    Visit Store
                                </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!storeList" class="pb-8">
                <div class="w-full p-3 rounded-sm border bg-white shadow-md h-32 flex items-center justify-center">
                    <h2 class="text-gray-300">No available product to show.</h2>
                </div>
            </div>
    </div>
</div>
</template>
<script>
    import { ref } from 'vue'
    import { ShoppingCartIcon } from "@heroicons/vue/24/outline";
    import { HeartIcon, StarIcon, PlusSmallIcon, BuildingStorefrontIcon, ShieldCheckIcon, ShieldExclamationIcon } from "@heroicons/vue/24/solid";
    import axiosClient from '../axios';
    
    const productCreate = ref(false);
    const productBidCreate = ref(false);
    
    const getStoreList = async () => {
        let pagedata = [];
        let resdata = [];

        await axiosClient.get('/api/v1/stores')
            .then(response => {
                response.data.map(function(value, key) {
                    pagedata.push(value);
                });

                if(pagedata.length > 0) {
                    resdata.push(pagedata);
                } 
            })
                    
        //await new Promise(resolve => setTimeout(resolve, 3000));
        return resdata;
    }

    export default {
        components: {ShoppingCartIcon, HeartIcon, StarIcon, PlusSmallIcon, BuildingStorefrontIcon, ShieldCheckIcon, ShieldExclamationIcon},
        async setup() {
            const stores = await getStoreList();
            //console.log(products[0]);
            const storeList = ref(stores[0]);

            return { 
                storeList,
                productCreate,
                productBidCreate
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
        }
    }
</script>