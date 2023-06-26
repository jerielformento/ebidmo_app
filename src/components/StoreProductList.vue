<template>
    <div class="bg-gray-100 pb-10">
        <div class="mx-auto max-w-2xl px-4 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-16">
            <router-view v-if="productCreate" :cancel="cancel"></router-view>
            <div class="flex justify-between items-center">
                <h2 class="text-sm font-semibold tracking-tight text-gray-500 block ml-1">
                Product Listing
                </h2>

                <div class="">
                    <div class="flex items-center justify-between">

                    </div>
                </div>
            </div>

            <div class="mt-3 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4 px-1 pb-8">
                <div v-for="item in productItems" :key="item.slug">
                    <div class="group relative pb-3 rounded-md border bg-white shadow-md">
                        <div class="min-h-50 aspect-h-2 aspect-w-2 w-full overflow-hidden rounded-t-md bg-gray-200 group-hover:opacity-90 lg:h-50">
                        <img :src="(item.thumbnail !== null) ? item.thumbnail.url : NoImageUrl" alt="" class="border border-gray-100 rounded-t-md h-full w-full object-cover object-center lg:h-full lg:w-full">
                        </div>
                        <div class="mt-3 mx-3 flex justify-between">
                            <div>
                                <h3 class="text-sm text-amber-500">
                                    <router-link :to="{name: 'product-details', params: { id: item.slug}}" class="font-semibold">
                                        <span aria-hidden="true" class="absolute inset-0"></span>
                                        {{ textSubstr(item.name) }}
                                    </router-link>
                                </h3>
                            </div>
                        </div>
                        <div class="mx-3 relative">
                            <p class="mt-1 text-sm text-gray-400">Brand: <a class="text-amber-600 underline">{{ item.brand.description }}</a></p>
                            <p class="mt-1 text-sm text-gray-400">Condition: <a class="text-amber-600 underline">{{ item.condition.description }}</a></p>
                            <p class="mt-1 text-sm text-gray-400">Sell Price: <span class="text-green-600">{{ item.currency.prefix+item.price.toLocaleString() }}</span></p>
                        </div>
                        <div class="mt-2 mx-3 text-2xl text-gray-500 flex justify-end items-center relative">
                            <button type="submit" onclick="alert(1)" class="rounded-sm bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                                Add to cart
                            </button>
                            <a href="#" class="ml-1 rounded-sm bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400">
                                Add to wishlist
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!productItems" class="pb-8">
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
    import { HeartIcon, StarIcon, PlusSmallIcon } from "@heroicons/vue/24/solid";
    import axiosClient from '../axios';
    import { useRoute } from 'vue-router';

    const productCreate = ref(false);
    const productBidCreate = ref(false);
    const route = useRoute();

    const getMyProducts = async () => {
        let pagedata = [];
        let resdata = [];

        await axiosClient.get('/api/v1/store/'+props.store+'/products')
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
        props: ['store'],
        components: {ShoppingCartIcon, HeartIcon, StarIcon, PlusSmallIcon},
        async setup(props) {
            let pagedata = [];
            let resdata = [];

            await axiosClient.get('/api/v1/store/'+props.store+'/products')
                .then(response => {
                    response.data.map(function(value, key) {
                        pagedata.push(value);
                    });

                    if(pagedata.length > 0) {
                        resdata.push(pagedata);
                    } 
                })
        
            const products = resdata;
            console.log(products[0]);
            const productItems = ref(products[0]);

            return { 
                NoImageUrl: import.meta.env.VITE_NO_IMAGE_URL,
                productItems,
                productCreate,
                productBidCreate,
                props
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
        }
    }
</script>