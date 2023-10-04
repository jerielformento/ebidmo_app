

<template>
    <section class="mb-5">
        <div class="mx-auto">
            <!-- Start coding here -->
            <div v-if="!hasStore"
                        class="shadow-sm p-4 mb-4 text-blue-800 border border-blue-200 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
                        role="alert">
                        <div class="flex items-center">
                            <span class="sr-only">Info</span>
                            <h3 class="text-lg font-medium">Apply now as vendor?</h3>
                        </div>
                        <div class="mt-2 mb-4 text-sm">
                            Uploading your own products, set an auction, and more...
                        </div>
                        <div class="flex">
                            <router-link :to="{ name: 'vendor-home' }"
                                class="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Create store
                            </router-link>
                        </div>
                    </div>
            <div class="bg-white relative shadow-sm sm:rounded-md overflow-hidden border border-gray-200">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <h2 class="text-sm font-semibold tracking-tight text-gray-400 block ml-1">News & Information</h2>
                </div>
                <main class="space-y-3 mt-0 m-3">
                    <div v-if="hasStore"
                        class="p-4 border border-gray-200 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
                        role="alert">
                        <div class="flex items-center">
                            <span class="sr-only">Info</span>
                            <h3 class="text-lg font-medium text-gray-800 dark:text-gray-300">Vendor Account</h3>
                        </div>
                        <div class="mt-2 mb-4 text-sm text-gray-800 dark:text-gray-300">
                            Manage products, set auctions, view transactions, and more...
                        </div>
                        <div class="flex">
                            <router-link :to="{ name: 'vendor-home' }"
                            class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-800">
                                Go to store
                            </router-link>
                        </div>
                    </div>
                    <div
                        class="p-4 border border-gray-200 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
                        role="alert">
                        <div class="flex items-center">
                            <span class="sr-only">Info</span>
                            <h3 class="text-lg font-medium text-gray-800 dark:text-gray-300">Setup your billing information</h3>
                        </div>
                        <div class="mt-2 mb-4 text-sm text-gray-800 dark:text-gray-300">
                            Provide your information such as shipping address, mobile number, etc. for future transaction process.
                        </div>
                        <div class="flex">
                            <router-link :to="{ name: 'customer-billing' }"
                            class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-800">
                                Go to Billing
                            </router-link>
                        </div>
                    </div>
                </main>
            </div>

        </div>
    </section>
</template>
<script setup>
import store from '../../store';
</script>
<script>
export default {
    data() {
        const userData = JSON.parse(store.state.user.data);
        const hasStore = (userData.store_name === '') ? false : true;

        return {
            hasStore
        }
    }
}
</script>