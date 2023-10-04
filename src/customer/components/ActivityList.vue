<template>
    <section class="mb-5 bg-gray-50">
        <div class="mx-auto">
            <!-- Start coding here -->
            <div class="bg-white relative shadow-sm sm:rounded-md overflow-hidden border border-gray-200">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <h2 class="text-sm font-semibold tracking-tight text-gray-400 block ml-1">Bid Activities</h2>
                </div>
                <div class="overflow-y-auto max-h-96">
                    <table class="w-full text-sm text-left text-gray-500">
                        <tbody>
                            <tr v-if="!reloadList" v-for="item in auctionItems" class="border-b hover:bg-gray-100">
                                <td scope="row" class="px-4 py-3 font-normal text-gray-900 whitespace-nowrap">
                                    <!-- <img :src="(item.auction.product.thumbnail !== null) ? item.auction.product.thumbnail.url : NoImageUrl" alt="" class="border border-gray-200 rounded-md h-10 w-10 object-cover object-center"> -->
                                    <div class="flex">
                                    <div class="flex-shrink-0">
                                        <img class="rounded-md w-16 h-16" :src="(item.auction.product.thumbnail !== null) ? item.auction.product.thumbnail.url : NoImageUrl" alt="Jese image">
                                    </div>
                                    <div class="w-full pl-3">
                                        <div class="text-gray-500 text-sm dark:text-gray-400">
                                            <div class="flex justify-between items-center">
                                                <p class="font-semibold text-gray-700">{{ item.auction.product.name }}</p>
                                                <p class="text-xs font-semibold text-gray-400">Bid: {{ item.price }}</p>
                                            </div>
                                            <div class="text-xs text-gray-500 dark:text-amber-500">{{ moment(item.bidded_at).format("lll") }}</div>
                                            <div class="flex justify-between items-center mt-1">
                                                <span
                                                :class="useAuctionColorCode(item.auction.status)"
                                                class="text-white text-xs font-semibold rounded-md py-1 px-2">{{ useAuctionStatus(item.auction.status) }}</span>
                                                <router-link :to="{name: 'auction-details', params: { store: item.auction.product.store.slug, id: item.auction.product.slug }}"
                                                    v-if="item.auction.status === 1"
                                                    target="_blank"
                                                    class="font-semibold">
                                                    View
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
</template>
<script>
    import { ref } from 'vue';
    import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
    import { PlusSmallIcon } from "@heroicons/vue/24/solid";
    import axiosClient from '../../axios';
    import { useAuctionColorCode } from '../../composables/useAuctionColorCode';
    import { useAuctionStatus } from '../../composables/useAuctionStatus';
    import moment from 'moment';
    import Spinner from '../../components/forms/Spinner.vue';

    const reloadList = ref(false);

    const getTransactions = async (page) => {
        let pagedata = [];
        let resdata = [];
        let pagination = [];

        reloadList.value = true;
        const setPage = '?page='+page;

        await axiosClient.get('/api/v1/customer/transactions/bids'+setPage)
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
        components: { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon, PlusSmallIcon, Spinner },
        async setup() {
            const transactions = await getTransactions(1);
            const auctionItems = ref(transactions[0][0]);

            return {
                pagination: transactions[1][0],
                auctionItems,
                reloadList,
                moment,
                useAuctionColorCode,
                useAuctionStatus
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
        }
    }
</script>