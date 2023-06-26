<template>
    <div class="bg-gray-100 pb-10">
        <div class="mx-auto sm:py-1">
            <router-view 
                v-if="productCreate || productEdit || auctionView" :key="$route.fullPath" 
                :cancel="cancel" 
                :reload="reloadProducts" 
                :categories="categories" 
                :brands="brands" 
                :conditions="conditions"
            ></router-view>
            <div class="flex justify-between items-center">
                <h2 class="text-sm font-semibold tracking-tight text-gray-500 block ml-1">
                My Listing
                </h2>

                <div class="">
                    <div class="flex items-center justify-between">
                    <!-- <router-link v-if="!productCreate" :to="{name: 'product-create'}" @click="createProduct" class="flex justify-between items-center rounded-sm bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                        <PlusSmallIcon class="h-5 w-5"/>
                        New Product
                    </router-link> -->
                </div>
                    <!-- <a href="#" class="text-sm underline text-amber-500 inline-block"><p>View all</p></a>
                    <a href="#" class="ml-2 text-sm underline text-amber-500 inline-block"><p>Top Bids</p></a>
                    <a href="#" class="ml-2 text-sm underline text-amber-500 inline-block"><p>Popular</p></a> -->
                </div>
            </div>
            <!-- table -->
            <section class="mt-5 bg-gray-50">
    <div class="mx-auto">
        <!-- Start coding here -->
        <div class="bg-white relative shadow-md sm:rounded-sm overflow-hidden border border-gray-200">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div class="w-full md:w-1/2">
                    <form class="flex items-center">
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2" placeholder="Search" required="">
                        </div>
                    </form>
                </div>
                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <router-link v-if="!productCreate" :to="{name: 'product-create'}" @click="createProduct" class="flex justify-between items-center rounded-sm bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                        <PlusSmallIcon class="h-5 w-5"/>
                        New Product
                    </router-link>
                    <div class="flex items-center space-x-3 w-full md:w-auto">
                        <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-sm border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200" type="button">
                            <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                            Actions
                        </button>
                        <div id="actionsDropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow">
                            <ul class="py-1 text-sm text-gray-700" aria-labelledby="actionsDropdownButton">
                                <li>
                                    <a href="#" class="block py-2 px-4 hover:bg-gray-100">Mass Edit</a>
                                </li>
                            </ul>
                            <div class="py-1">
                                <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Delete all</a>
                            </div>
                        </div>
                        <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-sm border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                            </svg>
                            Filter
                            <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </button>
                        <div id="filterDropdown" class="z-10 hidden w-48 p-3 bg-white rounded-sm shadow">
                            <h6 class="mb-3 text-sm font-medium text-gray-900">Choose brand</h6>
                            <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                                <li class="flex items-center">
                                    <input id="apple" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500">
                                    <label for="apple" class="ml-2 text-sm font-medium text-gray-900">Apple (56)</label>
                                </li>
                                <li class="flex items-center">
                                    <input id="fitbit" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500">
                                    <label for="fitbit" class="ml-2 text-sm font-medium text-gray-900">Microsoft (16)</label>
                                </li>
                                <li class="flex items-center">
                                    <input id="razor" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500">
                                    <label for="razor" class="ml-2 text-sm font-medium text-gray-900">Razor (49)</label>
                                </li>
                                <li class="flex items-center">
                                    <input id="nikon" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500">
                                    <label for="nikon" class="ml-2 text-sm font-medium text-gray-900">Nikon (12)</label>
                                </li>
                                <li class="flex items-center">
                                    <input id="benq" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500">
                                    <label for="benq" class="ml-2 text-sm font-medium text-gray-900">BenQ (74)</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-sm text-gray-700 bg-gray-50">
                        <tr>
                            <th scope="col" class="px-4 py-3">Image</th>
                            <th scope="col" class="px-4 py-3">Item Name</th>
                            <th scope="col" class="px-4 py-3">Category</th>
                            <th scope="col" class="px-4 py-3">Brand</th>
                            <th scope="col" class="px-4 py-3">Condition</th>
                            <th scope="col" class="px-4 py-3">Min. bid</th>
                            <th scope="col" class="px-4 py-3">Buy now</th>
                            <th scope="col" class="px-4 py-3">High. bid</th>
                            <th scope="col" class="px-4 py-3">Expiration</th>
                            <th scope="col" class="px-4 py-3">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="!reloadList" v-for="item in productItems" class="border-b">
                            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                <img :src="(item.thumbnail !== null) ? item.thumbnail.url : NoImageUrl" alt="" class="border border-gray-100 rounded-sm h-10 w-10 object-cover object-center">
                            </th>
                            <td class="px-4 py-3">{{ item.name }}</td>
                            <td class="px-4 py-3">{{ item.category.title }}</td>
                            <td class="px-4 py-3">{{ item.brand.description }}</td>
                            <td class="px-4 py-3">{{ item.condition.description }}</td>
                            <td class="px-4 py-3">{{ item.currency.prefix+item.bid.min_price }}</td>
                            <td class="px-4 py-3">{{ item.currency.prefix+item.bid.buy_now_price }}</td>
                            <td class="px-4 py-3">{{ (item.bid.highest !== null) ? item.currency.prefix+item.bid.highest.price : 0 }}</td>
                            <td class="px-4 py-3">{{ moment(item.bid.ended_at).format("lll") }}</td>
                            <td class="px-4 py-3">
                                <router-link 
                                    :to="{name: 'product-edit', params: {store: item.store.slug, slug: item.slug}}" 
                                    @click="editProduct" 
                                    class="rounded-sm bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400">
                                    Edit
                                </router-link>
                            </td>
                            <!-- <td class="px-4 py-3 flex items-center justify-end">
                                <button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-sm focus:outline-none" type="button">
                                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                                <div id="apple-imac-27-dropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow">
                                    <ul class="py-1 text-sm text-gray-700" aria-labelledby="apple-imac-27-dropdown-button">
                                        <li>
                                            <a href="#" class="block py-2 px-4 hover:bg-gray-100">Show</a>
                                        </li>
                                        <li>
                                            <router-link :to="{name: 'product-edit', params: {store: item.store.slug, slug: item.slug}}" @click="editProduct" class="block py-2 px-4 hover:bg-gray-100">{{ item.slug}} Edit</router-link>
                                        </li>
                                    </ul>
                                    <div class="py-1">
                                        <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Delete</a>
                                    </div>
                                </div>
                            </td> -->
                        </tr>
                        <tr v-else>
                            <td class="px-4 py-3" colspan="8"><div class="flex justify-center"><ArrowPathIcon class="h-6 w-6 animate-spin"/></div></td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
            <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                <span class="text-sm font-normal text-gray-500">
                    Showing
                    <span class="font-semibold text-gray-900">1-10</span>
                    of
                    <span class="font-semibold text-gray-900">1000</span>
                </span>
                <ul class="inline-flex items-stretch -space-x-px">
                    <li>
                        <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                            <span class="sr-only">Previous</span>
                            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">1</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">2</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page" class="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700">3</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">...</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">100</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                            <span class="sr-only">Next</span>
                            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    </section>
            <div v-if="!productItems" class="pb-8">
                <div class="w-full p-3 rounded-sm border bg-white shadow-md h-32 flex items-center justify-center">
                    <h2 class="text-gray-300">No available product to show.</h2>
                </div>
            </div>
    </div>
</div>
</template>
<script>
    import { ref, onMounted } from 'vue'
    import { ShoppingCartIcon, ArrowPathIcon } from "@heroicons/vue/24/outline";
    import { HeartIcon, StarIcon, PlusSmallIcon } from "@heroicons/vue/24/solid";
    import axiosClient from '../../axios';
    import { routerViewLocationKey, useRouter } from 'vue-router';
    import { initFlowbite } from 'flowbite';
    import moment from 'moment';

    const route = useRouter();
    const productCreate = ref(false);
    const productBidCreate = ref(false);
    const productEdit = ref(false);
    const auctionView = ref(false);
    const reloadList = ref(false);
    const routeKey = ref(0);
    const categories = ref(null);
    const brands = ref(null);
    const conditions = ref(null);

    const getProducts = async () => {
        let pagedata = [];
        let resdata = [];
        let paginate_count = 0;
        
        await axiosClient.get('/api/v1/bids')
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
            });
        return resdata;
    }

    const getMyProducts = async () => {
        let pagedata = [];
        let resdata = [];

        reloadList.value = true;
        await axiosClient.get('/api/v1/products/auction')
            .then(response => {
                response.data.map(function(value, key) {
                    pagedata.push(value);
                });

                if(pagedata.length > 0) {
                    resdata.push(pagedata);
                } 
            });

            
                    
        reloadList.value = false;
        return resdata;
    }

    export default {
        components: {ShoppingCartIcon, HeartIcon, StarIcon, PlusSmallIcon, ArrowPathIcon},
        async setup() {
            onMounted(async() => {
                initFlowbite();

                let sel_brand = 0;
                let sel_condition = 0;
                let sel_category = 0;

                await axiosClient.get('/api/util/product/categories').
                    then(response => { 
                        let gb = [];

                        response.data.map(function(value, key) {
                            gb.push({
                                id: value.id,
                                title: value.title,
                                is_active: ((value.id === sel_category) ? true : false)
                            });
                        });
                        categories.value = gb;
                    });

                await axiosClient.get('/api/util/product/brands').
                    then(response => {
                        let gb = [];

                        response.data.map(function(value, key) {

                            console.log(value.id + "|" + sel_brand);
                            gb.push({
                                id: value.id,
                                description: value.description,
                                is_active: ((value.id === sel_brand) ? true : false)
                            });
                        });
                        brands.value = gb;
                    });
                
                await axiosClient.get('/api/util/product/conditions').
                    then(response => { 
                        let gb = [];

                        response.data.map(function(value, key) {
                            gb.push({
                                id: value.id,
                                description: value.description,
                                is_active: ((value.id === sel_condition) ? true : false)
                            });
                        });
                        conditions.value = gb;
                    });
            });
            const products = await getMyProducts();
            const productItems = ref(products[0]);

            return { 
                moment,
                NoImageUrl: import.meta.env.VITE_NO_IMAGE_URL,
                routeKey,
                productItems,
                productCreate,
                productEdit,
                productBidCreate,
                auctionView,
                reloadList,
                categories,
                conditions,
                brands
            }
        },
        methods: {
            createProduct() {
                routeKey.value += 1;
                productCreate.value = true;
            },
            cancel() {
                productCreate.value = false;
                productEdit.value = true;
                this.$router.push({
                    name: 'vendor-products'
                });
            },
            editProduct() {
                productCreate.value = false;
                productEdit.value = true;
            },  
            createBidProduct() {
                productBidCreate.value = true;
            },
            cancelBid() {
                productBidCreate.value = false;
            },
            viewAuction() {
                auctionView.value = true;
            },
            textSubstr(text) {
                let new_string = '';
                if(text.length > 28) {
                    new_string = String(text).substring(0,28)+'..';
                } else {
                    new_string = String(text).substring(0,28);
                }
                return new_string;
            },
            async reloadProducts() {
                console.log('ok');
                const products = await getMyProducts();
                this.productItems = products[0];
                initFlowbite();
            }
        },
        beforeUnmount() {
            productCreate.value = false;
        }
    }
</script>