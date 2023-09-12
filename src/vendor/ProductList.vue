<template>
    <div class="bg-gray-100 pb-10">
        <div class="mx-auto sm:py-1">
            <router-view 
                v-if="productCreate || productEdit || viewAuction" :key="$route.fullPath" 
                :cancel="cancel" 
                :reload="reloadProducts" 
                :scrollToTop="scrollToTop"
                :categories="categories" 
                :brands="brands" 
                :conditions="conditions"
                :locations="locations"
            ></router-view>
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
                <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div class="w-full md:w-1/2">
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <MagnifyingGlassIcon class="w-5 h-5 text-gray-500"/>
                            </div>
                            <input @keyup.enter="searchProduct" @keyup="searchKey" type="text" ref="itemSearch" class="bg-gray-50 border focus:ring-amber-500 focus:border-amber-500 border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2" placeholder="Search" required="">
                        </div>
                    </div>
                    <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <router-link v-if="!productCreate" :to="{name: 'product-create'}" @click="createProduct" class="flex justify-between items-center rounded-sm bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                            <PlusSmallIcon class="h-5 w-5"/>
                            New Product
                        </router-link>
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
                                <th scope="col" class="px-4 py-3">Date Created</th>
                                <th scope="col" class="px-4 py-3">Status</th>
                                <th scope="col" class="px-4 py-3">
                                    <span class="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="!reloadList" v-for="item in productItems" class="border-b hover:bg-gray-100">
                                <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                    <img :src="(item.thumbnail !== null) ? item.thumbnail.url : NoImageUrl" alt="" class="border border-gray-200 rounded-sm h-10 w-10 object-cover object-center">
                                </th>
                                <td class="px-4 py-3">
                                    
                                    <router-link 
                                        :to="{name: 'product-auction', params: {id: item.slug}}" 
                                        @click="viewAuction" 
                                        class="text-amber-500 hover:underline">
                                        {{ item.name }}
                                    </router-link>
                                </td>
                                <td class="px-4 py-3">{{ item.category.title }}</td>
                                <td class="px-4 py-3">{{ item.brand.description }}</td>
                                <td class="px-4 py-3">{{ item.condition.description }}</td>
                                <td class="px-4 py-3">{{ moment(item.created_at).format("lll") }}</td>
                                <td class="px-4 py-3" v-if="item.auction !== null"><span class="bg-green-400 text-white text-xs font-semibold rounded-sm py-1 px-2">Auctioned</span></td>
                                <td class="px-4 py-3" v-else></td>
                                <td class="px-4 py-3 flex justify-normal items-center space-x-1">
                                    <router-link 
                                        :to="{name: 'product-edit', params: {store: item.store.slug, slug: item.slug}}" 
                                        @click="editProduct" 
                                        class="rounded-sm bg-slate-900 px-2 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                                        Edit
                                    </router-link>
                                    <button v-if="item.auction === null"
                                            @click="setAuction(item.slug)" 
                                            class="rounded-sm bg-green-400 px-2 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                                            Auction
                                    </button>
                                </td>
                            </tr>
                            <tr v-else>
                                <td class="px-4 py-3" colspan="8"><div class="flex justify-center"><Spinner class="h-6 w-6"/></div></td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
                <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                    <span class="text-sm font-normal text-gray-500">
                        Showing
                        <span class="font-semibold text-gray-900">{{ pagination.from }}-{{ pagination.to }}</span>
                        of
                        <span class="font-semibold text-gray-900">{{ pagination.total }}</span>
                    </span>
                    <ul class="inline-flex items-stretch -space-x-1px">
                        <li v-for="(page, index) in pagination.links">

                            <button v-if="index === 0" @click="prevPage(pagination.current, page.url)" :disabled="page.url === null" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                                <span class="sr-only">Previous</span>
                                <ChevronLeftIcon class="w-4 h-4"/>
                            </button>

                            <button v-else-if="index === (pagination.links.length-1)" @click="nextPage(pagination.current, page.url)" :disabled="page.url === null" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                                <span class="sr-only">Next</span>
                                <ChevronRightIcon class="w-4 h-4"/>
                            </button>
                            
                            <a v-else href="#" @click="gotoPage(page.label)" class="flex items-center justify-center text-sm py-2 px-3 leading-tight font-semibold" :class="(page.active) ? 'bg-amber-400 border border-gray-500 hover:bg-primary-100 hover:text-primary-700' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'">{{ page.label }}</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
    </div>
    <AddAuctionModal v-if="createAuction" :cancel="cancel" :reload="reloadProducts" :id="modal.id"/>
</div>
</template>
<script>
    import { ref, onMounted, getCurrentInstance } from 'vue'
    import { ShoppingCartIcon, PencilSquareIcon, MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
    import { HeartIcon, StarIcon, PlusSmallIcon } from "@heroicons/vue/24/solid";
    import axiosClient from '../axios';
    import { initDrawers } from 'flowbite';
    import Spinner from '../components/forms/Spinner.vue';
    import moment from 'moment';
    import AddAuctionModal from './util/AddAuctionModal.vue';
    import storeFilter from '../store/filter';
    const productCreate = ref(false);
    const productEdit = ref(false);
    const auctionView = ref(false);
    const createAuction = ref(false);
    const reloadList = ref(false);
    const routeKey = ref(0);
    const categories = ref(null);
    const brands = ref(null);
    const conditions = ref(null);
    const locations = ref(null);
    
    const getMyProducts = async (page) => {
        let pagedata = [];
        let resdata = [];
        let pagination = [];

        reloadList.value = true;
        const setPage = '?page='+page;

        await axiosClient.get('/api/v1/products'+setPage)
            .then(response => {
                response.data.data.map(function(value, key) {
                    pagedata.push(value);
                });

                if(pagedata.length > 0) {
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
        const setPage = (page > 1) ? '?page='+page : '';
        const key = searchKey;
        
        await axiosClient.get('/api/v1/store/products/search/'+key+setPage)
            .then(response => {
                response.data.data.map(function(value, key) {
                    pagedata.push(value);
                });

                if(pagedata.length > 0) {
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
        components: {Spinner, AddAuctionModal, ShoppingCartIcon, HeartIcon, StarIcon, PlusSmallIcon, PencilSquareIcon, MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon},
        async setup() {
            onMounted(async() => {
                initDrawers(); 
                let sel_brand = 0;
                let sel_condition = 0;
                let sel_category = 0;
                let sel_location = 0;

                
                categories.value = await storeFilter.dispatch('categories', sel_category);
                brands.value = await storeFilter.dispatch('brands', sel_brand);
                conditions.value = await storeFilter.dispatch('conditions', sel_condition);
                locations.value = await storeFilter.dispatch('locations', sel_location);
            });
            const products = await getMyProducts(1);
            const productItems = ref(products[0][0]);
            
            return { 
                modal: {
                    id: '',
                    index: 0
                },
                moment,
                NoImageUrl: import.meta.env.VITE_NO_IMAGE_URL,
                pagination: products[1][0],
                routeKey,
                productItems,
                productCreate,
                productEdit,
                auctionView,
                createAuction,
                reloadList,
                categories,
                conditions,
                brands,
                locations
            }
        },
        methods: {
            async searchProduct() {
                const key = this.$refs.itemSearch.value;
                if(key.length !== 0) {
                    const products = await searchMyProducts(1, key);
                    this.productItems = products[0][0];
                    this.pagination = products[1][0];
                } else {
                    this.reloadProducts();
                }
            },
            searchKey() {
                const key = this.$refs.itemSearch.value;
                if(key.length === 0) {
                    this.reloadProducts();
                }
            }, 
            createProduct() {
                this.scrollToTop();
                routeKey.value += 1;
                productCreate.value = true;
            },
            cancel() {
                productCreate.value = false;
                productEdit.value = false;
                auctionView.value = false;
                createAuction.value = false;
                this.$router.push({
                    name: 'vendor-products'
                });
            },
            editProduct() {
                this.scrollToTop();
                productCreate.value = false;
                auctionView.value = false;
                productEdit.value = true;
            },  
            viewAuction() {
                this.scrollToTop();
                auctionView.value = true;
            },
            setAuction(id) {
                this.modal.id = id;
                createAuction.value = true;
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
                const products = await getMyProducts(1);
                this.productItems = products[0][0];
                this.pagination = products[1][0];
            },
            async prevPage(page, url) {
                if(url !== null) {
                    const setPage = page-1;
                    const products = await getMyProducts(setPage);
                    this.productItems = products[0][0];
                    this.pagination = products[1][0];
                }
            },
            async nextPage(page, url) {
                if(url !== null) {
                    const setPage = page+1;
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
                window.scrollTo(0,0);
            }
        },
        beforeUnmount() {
            productCreate.value = false;
            productEdit.value = false;
            auctionView.value = false;
        }
    }
</script>