<template>
    <section class="mt-5 bg-gray-50">
        
        <div class="mx-auto">
            

            <router-view v-if="transactionView" :key="$route.fullPath" :cancel="cancel"
                :reload="reloadItems" :leave="leaveView"></router-view>

            <!-- Start coding here -->
            <div v-else class="bg-white relative shadow-sm sm:rounded-md overflow-hidden border border-gray-200">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <h2 class="text-sm font-semibold tracking-tight text-gray-500 block ml-1">Orders</h2>
                    <div class="w-full md:w-1/2">
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <MagnifyingGlassIcon class="w-5 h-5 text-gray-500"/>
                            </div>
                            <input @keyup.enter="searchProduct" @keyup="searchKey" type="text" ref="itemSearch" class="bg-gray-50 border focus:ring-amber-500 focus:border-amber-500 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2" placeholder="Search Item" required="">
                        </div>
                    </div>
                    <!-- <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <router-link v-if="!productCreate" :to="{name: 'product-create'}" @click="createProduct" class="flex justify-between items-center rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                            <PlusSmallIcon class="h-5 w-5"/>
                            New Product
                        </router-link>
                    </div> -->
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-sm text-gray-700 bg-gray-50">
                            <tr>
                                <th scope="col" class="px-4 py-3">Image</th>
                                <th scope="col" class="px-4 py-3">Item Name</th>
                                <th scope="col" class="px-4 py-3">Winner</th>
                                <th scope="col" class="px-4 py-3">Acknowledge Until</th>
                                <th scope="col" class="px-4 py-3">Total Payment</th>
                                <th scope="col" class="px-4 py-3">Action</th>
                                <th scope="col" class="px-4 py-3">Status</th>
                                <th scope="col" class="px-4 py-3">
                                    <span class="sr-only">Actions</span>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="!reloadList" v-for="item in auctionItems" class="border-b hover:bg-gray-100">
                                <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                    <img :src="(item.auction.product.thumbnail !== null) ? item.auction.product.thumbnail.url : NoImageUrl" alt="" class="border border-gray-200 rounded-md h-10 w-10 object-cover object-center">
                                </th>
                                <td class="px-4 py-3">{{ item.auction.product.name }}</td>
                                <td class="px-4 py-3 font-semibold">{{ item.customer.username }}</td>
                                <td class="px-4 py-3">{{ moment(item.ended_at).format("lll") }}</td>
                                <td class="px-4 py-3 font-semibold">{{ item.auction.currency.prefix }}{{ item.auction.highest.price }}</td>
                                <td class="px-4 py-3"><span
                                            :class="useAcknowledgementColorCode(item.status)"
                                            class="text-white text-xs font-semibold rounded-md py-1 px-2">{{ useAcknowledgementStatus(item.status) }}</span></td>
                                <td class="px-4 py-3"><span
                                            :class="useExpirationColorCode(item.expired)"
                                            class="text-white text-xs font-semibold rounded-md py-1 px-2">{{ useExpirationStatus(item.expired) }}</span></td>
                                <td class="px-4 py-3 flex justify-normal items-center space-x-1">
                                    <router-link :to="{name: 'transaction-view', params: { id: item.url_token }}"
                                        @click="viewTransaction"
                                        class="rounded-md bg-slate-900 px-2 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                                        Details
                                    </router-link>
                                    <button v-if="item.status === 1"
                                            @click="toShip(item.url_token)" 
                                            class="rounded-md bg-green-400 px-2 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                                            Ship Item
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
    <ShipItemModal v-if="shipItem" :cancel="cancel" :reload="reloadItems" :id="modal.id"/>
</template>
<script>
    import { ref } from 'vue';
    import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon, WalletIcon, TruckIcon, CheckCircleIcon } from "@heroicons/vue/24/outline";
    import { PlusSmallIcon } from "@heroicons/vue/24/solid";
    import axiosClient from '../../axios';
    import { useAuctionColorCode, useAcknowledgementColorCode, useExpirationColorCode } from '../../composables/useAuctionColorCode';
    import { useAuctionStatus, useAcknowledgementStatus, useExpirationStatus } from '../../composables/useAuctionStatus';
    import moment from 'moment';
    import ShipItemModal from '../util/ShipItemModal.vue';
    import Spinner from '../../components/forms/Spinner.vue';

    const reloadList = ref(false);
    const transactionView = ref(false);
    const shipItem = ref(false);

    const getTransactions = async (page) => {
        let pagedata = [];
        let resdata = [];
        let pagination = [];

        reloadList.value = true;
        const setPage = '?page='+page;

        await axiosClient.get('/api/v1/vendor/transactions'+setPage)
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
        components: { ShipItemModal, Spinner, MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon, PlusSmallIcon, WalletIcon, TruckIcon, CheckCircleIcon },
        async setup() {
            const transactions = await getTransactions(1);
            const auctionItems = ref(transactions[0][0]);

            return {
                modal: {
                    id: '',
                    index: 0
                },
                shipItem,
                pagination: transactions[1][0],
                auctionItems,
                reloadList,
                transactionView,
                moment,
                useAuctionColorCode,
                useAuctionStatus,
                useAcknowledgementStatus,
                useAcknowledgementColorCode,
                useExpirationColorCode,
                useExpirationStatus
            }
        },
        methods: {
            async reloadItems() {
                const transactions = await getTransactions(1);
                this.auctionItems = transactions[0][0];
                this.pagination = transactions[1][0];
            },
            async prevPage(page, url) {
                if(url !== null) {
                    const setPage = page-1;
                    const transactions = await getTransactions(setPage);
                    this.auctionItems = transactions[0][0];
                    this.pagination = transactions[1][0];
                }
            },
            async nextPage(page, url) {
                if(url !== null) {
                    const setPage = page+1;
                    const transactions = await getTransactions(setPage);
                    this.auctionItems = transactions[0][0];
                    this.pagination = transactions[1][0];
                }
            },
            async gotoPage(page) {
                const setPage = parseInt(page);
                const transactions = await getTransactions(setPage);
                this.auctionItems = transactions[0][0];
                this.pagination = transactions[1][0];
            },
            viewTransaction() {
                this.scrollToTop();
                transactionView.value = true;
            },
            cancel() {
                transactionView.value = false;
                shipItem.value = false;
                this.$router.push({
                    name: 'vendor-transaction'
                });
            },
            toShip(id) {
                this.modal.id = id;
                shipItem.value = true;
            },
            scrollToTop() {
                window.scrollTo(0, 0);
            },
            leaveView() {
                transactionView.value = false;
            },
        }
    }
</script>