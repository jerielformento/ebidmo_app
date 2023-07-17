<template>
    <div class="bg-gray-100 pb-10">
        <div class="mx-auto max-w-2xl px-4 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-16">
            <router-view v-if="productCreate || productEdit" :cancel="cancel"></router-view>
            <div class="flex justify-between items-center">
                <h2 class="text-sm font-semibold tracking-tight text-gray-500 block ml-1">
                Product Listing
                </h2>

                <div class="">
                    <div class="flex items-center justify-between">
                    <router-link v-if="!productCreate" :to="{name: 'product-create'}" @click="createProduct" class="flex justify-between items-center rounded-sm bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                        <PlusSmallIcon class="h-5 w-5"/>
                        New Product
                    </router-link>
                </div>
                    <!-- <a href="#" class="text-sm underline text-amber-500 inline-block"><p>View all</p></a>
                    <a href="#" class="ml-2 text-sm underline text-amber-500 inline-block"><p>Top Bids</p></a>
                    <a href="#" class="ml-2 text-sm underline text-amber-500 inline-block"><p>Popular</p></a> -->
                </div>
            </div>

            <div class="mt-3 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4 px-1 pb-8">
                <div v-for="item in productItems" :key="item.slug">
                    <div class="group relative pb-3 rounded-md border bg-white shadow-md">
                        <div class="min-h-50 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-md bg-gray-200 lg:aspect-none group-hover:opacity-90 lg:h-50">
                        <img :src="(item.thumbnail !== null) ? item.thumbnail.url : NoImageUrl" alt="" class="border border-gray-100 rounded-t-md h-full w-full object-cover object-center lg:h-full lg:w-full">
                        </div>
                        <div class="mt-3 mx-3 flex justify-between">
                            <div>
                                <h3 class="text-sm text-amber-500">
                                    <router-link :to="{name: 'create-auction', params: { id: item.slug}}" class="font-bold">
                                        <span aria-hidden="true" class="absolute inset-0"></span>
                                        {{ item.name }}
                                    </router-link>
                                </h3>
                            </div>
                        </div>
                        <div class="mx-3 relative">
                            <p class="mt-1 text-sm text-gray-500">Brand: <a class="text-amber-600 underline">{{ item.brand.description }}</a></p>
                            <p class="mt-1 text-sm text-gray-500">Condition: <a class="text-amber-600 underline">{{ item.condition.description }}</a></p>
                            <p class="mt-1 text-sm text-gray-500">Quantity: <span class="text-gray-600">{{ item.quantity }}</span></p>
                            <p class="mt-1 text-sm text-gray-500">Sell Price: <span class="text-green-600">{{ item.currency.prefix+item.price.toLocaleString() }}</span></p>
                        </div>
                        <div class="mt-2 mx-3 text-2xl text-gray-500 flex justify-end items-center relative">
                            <router-link :to="{name: 'product-edit', params: { slug: item.slug}}" @click="editProduct" class="rounded-sm bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                                Edit
                            </router-link>
                            <router-link v-if="item.bid === null" :to="{name: 'create-auction', params: { id: item.slug}}" class="ml-1 rounded-sm bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                                Add to Auction
                            </router-link>
                            <router-link v-else :to="{name: 'create-auction', params: { id: item.slug}}" class="ml-1 rounded-sm bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400">
                                Auction Details
                            </router-link>
                        </div>
                    </div>
                </div>
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
    import axiosClient from '../axios';

    const productCreate = ref(false);
    const productBidCreate = ref(false);
    const productEdit = ref(false);

    const getMyProducts = async () => {
        let pagedata = [];
        let resdata = [];

        await axiosClient.get('/api/v1/products')
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
        components: {ShoppingCartIcon, HeartIcon, StarIcon, PlusSmallIcon},
        async setup() {
            const products = await getMyProducts();
            //console.log(products[0]);
            const productItems = ref(products[0]);

            return { 
                NoImageUrl: import.meta.env.VITE_NO_IMAGE_URL,
                productItems,
                productCreate,
                productEdit,
                productBidCreate
            }
        },
        methods: {
            createProduct() {
                productCreate.value = true;
            },
            cancel() {
                productCreate.value = false;
                productEdit.value = true;
                this.$router.push({
                    name: 'vendor'
                });
            },
            editProduct() {
                productEdit.value = true;
            },  
            createBidProduct() {
                productBidCreate.value = true;
            },
            cancelBid() {
                productBidCreate.value = false;
            },
        },
        beforeUnmount() {
            productCreate.value = false;
        }
    }
</script>