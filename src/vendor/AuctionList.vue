<template>
    <div class="bg-gray-100 pb-10">
        <div class="mx-auto sm:py-1">
            <router-view v-if="auctionView" :key="$route.fullPath" :cancel="cancel"
                :reload="reloadProducts" :leave="leaveView" :categories="categories" :brands="brands" :conditions="conditions"></router-view>
            
            <div v-if="!auctionView">
                <div class="flex justify-between items-center">
                    <h2 class="text-sm font-semibold tracking-tight text-gray-500 block ml-1">
                        My Listing
                    </h2>
                </div>
                <!-- table -->
                <section class="mt-5 bg-gray-50">
                    <div class="mx-auto">
                        <!-- Start coding here -->
                        <div class="bg-white relative shadow-md sm:rounded-sm overflow-hidden border border-gray-200">
                            <div
                                class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                                <div class="w-full md:w-1/2">

                                    <label for="simple-search" class="sr-only">Search</label>
                                    <div class="relative w-full">
                                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <MagnifyingGlassIcon class="w-5 h-5 text-gray-500" />
                                        </div>
                                        <input @keyup.enter="searchProduct" @keyup="searchKey" type="text" ref="itemSearch"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                                            placeholder="Search" required="">
                                    </div>

                                </div>
                                <div
                                    class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                    <div class="flex items-center space-x-3 w-full md:w-auto">
                                        <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown"
                                            class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-sm border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                                            type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                                                class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd"
                                                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                            Filter
                                            <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path clip-rule="evenodd" fill-rule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                            </svg>
                                        </button>
                                        <div id="filterDropdown" class="z-10 hidden w-48 p-3 bg-white rounded-sm shadow">
                                            <h6 class="mb-3 text-sm font-medium text-gray-900">Choose brand</h6>
                                            <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                                                <li class="flex items-center" v-for="cat in categories">
                                                    <input :id="cat.id" type="checkbox" :value="cat.id"
                                                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-amber-500 focus:ring-primary-500">
                                                    <label :for="cat.id" class="ml-2 text-sm font-medium text-gray-900">{{
                                                        cat.title }}</label>
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
                                            <th scope="col" class="px-4 py-3">Participants</th>
                                            <th scope="col" class="px-4 py-3">Expiration</th>
                                            <th scope="col" class="px-4 py-3">Status</th>
                                            <th scope="col" class="px-4 py-3">
                                                <span class="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="!reloadList" v-for="item in productItems" class="border-b hover:bg-gray-100">
                                            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                                <img :src="(item.product.thumbnail !== null) ? item.product.thumbnail.url : NoImageUrl"
                                                    alt=""
                                                    class="border border-gray-200 rounded-sm h-10 w-10 object-cover object-center">
                                            </th>
                                            <td class="px-4 py-3">{{ item.product.name }}</td>
                                            <td class="px-4 py-3">{{ item.product.category.title }}</td>
                                            <td class="px-4 py-3">{{ item.product.brand.description }}</td>
                                            <td class="px-4 py-3">{{ item.product.condition.description }}</td>
                                            <td class="px-4 py-3">{{ item.product.currency.prefix + item.min_price }}</td>
                                            <td class="px-4 py-3">{{ item.product.currency.prefix + item.buy_now_price }}</td>
                                            <td class="px-4 py-3">{{ (item.highest !== null) ?
                                                item.product.currency.prefix + item.highest.price : 0 }}</td>
                                            <td class="px-4 py-3">{{ item.min_participants }}/{{ item.participants_count }}</td>
                                            <td class="px-4 py-3">{{ moment(item.ended_at).format("lll") }}</td>
                                            <td class="px-4 py-3"><span
                                                    :class="useAuctionColorCode(item.status)"
                                                    class="text-white text-xs font-semibold rounded-sm py-1 px-2">{{ useAuctionStatus(item.status) }}</span></td>
                                            <td class="px-4 py-3">
                                                <router-link :to="{ name: 'auction-view', params: { id: item.id } }"
                                                    @click="viewAuction"
                                                    class="rounded-sm bg-slate-900 px-2 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                                                    Details
                                                </router-link>
                                            </td>
                                        </tr>
                                        <tr v-else>
                                            <td class="px-4 py-3" colspan="11">
                                                <div class="flex justify-center">
                                                    <ArrowPathIcon class="h-6 w-6 animate-spin" />
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                                aria-label="Table navigation">
                                <span class="text-sm font-normal text-gray-500">
                                    Showing
                                    <span class="font-semibold text-gray-900">{{ pagination.from }}-{{ pagination.to }}</span>
                                    of
                                    <span class="font-semibold text-gray-900">{{ pagination.total }}</span>
                                </span>
                                <ul class="inline-flex items-stretch -space-x-1px">
                                    <li v-for="(page, index) in pagination.links">
                                        <button v-if="index === 0" @click="prevPage(pagination.current, page.url)"
                                            :disabled="page.url === null"
                                            class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                                            <span class="sr-only">Previous</span>
                                            <ChevronLeftIcon class="w-4 h-4"/>
                                        </button>

                                        <button v-else-if="index === (pagination.links.length - 1)"
                                            @click="nextPage(pagination.current, page.url)" :disabled="page.url === null"
                                            class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                                            <span class="sr-only">Next</span>
                                            <ChevronRightIcon class="w-4 h-4"/>
                                        </button>

                                        <a v-else href="#" @click="gotoPage(page.label)"
                                            class="flex items-center justify-center text-sm py-2 px-3 leading-tight font-semibold"
                                            :class="(page.active) ? 'bg-amber-400 border border-gray-500 hover:bg-primary-100 hover:text-primary-700' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'">{{
                                                page.label }}</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>
                <div v-if="!productItems" class="pb-8">
                    <div class="w-full p-3 rounded-md border bg-white shadow-md h-32 flex items-center justify-center">
                        <h2 class="text-gray-300">No available product to show.</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import { ShoppingCartIcon, ArrowPathIcon, MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import { HeartIcon, StarIcon, PlusSmallIcon } from "@heroicons/vue/24/solid";
import { useAuctionStatus } from '../composables/useAuctionStatus';
import { useAuctionColorCode } from '../composables/useAuctionColorCode';
import axiosClient from '../axios';
import { initDrawers } from 'flowbite';
import moment from 'moment';

const productCreate = ref(false);
const productBidCreate = ref(false);
const productEdit = ref(false);
const auctionView = ref(false);
const reloadList = ref(false);
const routeKey = ref(0);
const categories = ref(null);
const brands = ref(null);
const conditions = ref(null);

const getMyProducts = async (page) => {
    let pagedata = [];
    let resdata = [];
    let pagination = [];

    reloadList.value = true;
    const setPage = (page > 1) ? '?page=' + page : '';

    reloadList.value = true;
    await axiosClient.get('/api/v1/auctions' + setPage)
        .then(response => {
            response.data.data.map(function (value, key) {
                pagedata.push(value);
            });

            if (pagedata.length > 0) {
                resdata.push(pagedata);
            }

            pagination.push({
                from: response.data.from,
                to: response.data.to,
                end: response.data.last_page,
                current: response.data.current_page,
                total: response.data.total,
                links: response.data.links
            });
        });

    reloadList.value = false;
    return [resdata, pagination];
}

const searchMyProducts = async (page, searchKey) => {
    let pagedata = [];
    let resdata = [];
    let pagination = [];

    reloadList.value = true;
    const setPage = (page > 1) ? '?page=' + page : '';
    const key = searchKey;

    await axiosClient.get('/api/v1/store/auctions/search/' + key + setPage)
        .then(response => {
            response.data.data.map(function (value, key) {
                pagedata.push(value);
            });

            if (pagedata.length > 0) {
                resdata.push(pagedata);
            }

            pagination.push({
                from: response.data.from,
                to: response.data.to,
                end: response.data.last_page,
                current: response.data.current_page,
                total: response.data.total,
                links: response.data.links
            });
        });

    reloadList.value = false;
    return [resdata, pagination];
}

export default {
    components: { ShoppingCartIcon, HeartIcon, StarIcon, PlusSmallIcon, ArrowPathIcon, MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon },
    async setup() {
        onMounted(async() => {
            initDrawers();   

            let sel_brand = 0;
            let sel_condition = 0;
            let sel_category = 0;

            await axiosClient.get('/api/util/product/categories').
                then(response => {
                    let gb = [];

                    response.data.map(function (value, key) {
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

                    response.data.map(function (value, key) {
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

                    response.data.map(function (value, key) {
                        gb.push({
                            id: value.id,
                            description: value.description,
                            is_active: ((value.id === sel_condition) ? true : false)
                        });
                    });
                    conditions.value = gb;
                });
        });
        const products = await getMyProducts(1);
        const productItems = ref(products[0][0]);

        return {
            moment,
            NoImageUrl: import.meta.env.VITE_NO_IMAGE_URL,
            pagination: products[1][0],
            routeKey,
            productItems,
            productCreate,
            productEdit,
            productBidCreate,
            auctionView,
            reloadList,
            categories,
            conditions,
            brands,
            useAuctionStatus,
            useAuctionColorCode
        }
    },
    methods: {
        async searchProduct() {
            const key = this.$refs.itemSearch.value;
            if (key.length !== 0) {
                const products = await searchMyProducts(1, key);
                this.productItems = products[0][0];
                this.pagination = products[1][0];
            } else {
                this.reloadProducts();
            }
        },
        searchKey() {
            const key = this.$refs.itemSearch.value;
            if (key.length === 0) {
                this.reloadProducts();
            }
        },
        cancel() {
            auctionView.value = false;
            this.$router.push({
                name: 'vendor-auction'
            });
        },
        viewAuction() {
            this.scrollToTop();
            auctionView.value = true;
        },
        textSubstr(text) {
            let new_string = '';
            if (text.length > 28) {
                new_string = String(text).substring(0, 28) + '..';
            } else {
                new_string = String(text).substring(0, 28);
            }
            return new_string;
        },
        async reloadProducts() {
            const products = await getMyProducts(1);
            this.productItems = products[0][0];
            this.pagination = products[1][0];
            initFlowbite();
        },
        async prevPage(page, url) {
            if (url !== null) {
                const setPage = page - 1;
                const products = await getMyProducts(setPage);
                this.productItems = products[0][0];
                this.pagination = products[1][0];
            }
        },
        async nextPage(page, url) {
            if (url !== null) {
                const setPage = page + 1;
                const products = await getMyProducts(setPage);
                this.productItems = products[0][0];
                this.pagination = products[1][0];
            }
        },
        async gotoPage(page) {
            const setPage = parseInt(page);
            const products = await getMyProducts(setPage);
            this.productItems = products[0][0];
            this.pagination = products[1][0];
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        },
        leaveView() {
            auctionView.value = false;
        }
    },
    beforeUnmount() {
        auctionView.value = false;
    }
}
</script>