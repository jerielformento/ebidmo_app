<template>
    <nav class="bg-slate-800 border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" class="flex items-center">
                <img :src="`${siteUrl}/images/ebidmo_text.png`" class="h-8 mr-3" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
            </a>
            <div v-if="!isGuest" class="flex items-center md:order-2">
                <Notifications/>
                <button type="button"
                    class="flex items-center gap-x-2 mr-3 text-sm bg-gray-800 rounded-full md:mr-0 dark:focus:ring-gray-600"
                    id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown"
                    data-dropdown-placement="bottom">
                    <span class="sr-only">Open user menu</span>
                    <UserCircleIcon class="h-7 w-7 bg-gradient-to-b from-amber-300 to-amber-500 text-gray-800 rounded-full"/>
                    <span class="font-semibold text-sm text-white">{{ JSON.parse(store.state.user.data).firstname }}</span>
                </button>
                <!-- Dropdown menu -->
                <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="user-dropdown">
                    <div class="px-4 py-3">
                        <span class="block text-sm text-gray-900 dark:text-white">{{ JSON.parse(store.state.user.data).fullname }}</span>
                        <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{{ JSON.parse(store.state.user.data).email }}</span>
                    </div>
                    <ul class="py-2" aria-labelledby="user-menu-button">
                        <li class="border-b border-gray-100 pb-2">
                            <router-link :to="{ name: 'vendor-home' }" v-if="userData !== null && userData.store_name !== ''"
                            class="text-white mx-3 bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center block items-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-800">
                                Go to Store
                            </router-link>
                            <router-link :to="{ name: 'vendor-home' }" v-else
                            class="text-white mx-3 bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center block items-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-800">
                                Create Store
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'profile' }"
                                exact-active-class="font-bold"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Customer Profile</router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'settings' }"
                                exact-active-class="font-bold"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</router-link>
                        </li>
                        <li>
                            <a href="#" @click="logout"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
                                out</a>
                        </li>
                    </ul>
                </div>
                <button data-collapse-toggle="navbar-user" type="button"
                    class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-user" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <Bars3Icon class="h-8 w-8"/>
                </button>
            </div>
            <div v-else class="flex items-center md:order-2">
                <ul
                    class="flex flex-wrap font-medium rounded-lg md:flex-row md:space-x-2 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <router-link :to="{ name: 'login' }"
                            active-class="text-gray-50 dark:text-gray-200"
                            class="text-gray-400 hover:text-white font-medium rounded-md text-sm px-4 py-2 text-center mr-3 sm:mr-1 md:mr-0">Log in</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'register' }"
                            active-class="text-gray-50 dark:text-gray-200"
                            class="text-white bg-amber-500 border-2 border-amber-500 hover:bg-amber-400 hover:text-white font-medium rounded-md text-sm px-4 py-2 text-center mr-3 md:mr-0">Sign up</router-link>
                    </li>
                </ul>
            </div>
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                <ul
                    class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar"
                            class="flex items-center justify-between w-full py-2 pl-3 pr-4 rounded-lg text-sm text-gray-400 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto dark:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                            Auctions
                            <ChevronDownIcon class="h-5 w-5 ml-1"/></button>
                        <!-- Dropdown menu -->
                        <div id="dropdownNavbar"
                            class="z-20 w-auto hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                <li>
                                    <router-link :to="{ name: 'auctions' }"
                                        class="flex items-center justify-normal px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        <HomeIcon class="h-6 w-6 mr-3"/>
                                        <div>
                                            <span class="font-semibold">All</span>
                                            <p class="block text-gray-500">View Listed Items</p>
                                        </div>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{ name: 'auctions-live'}"
                                        class="flex items-center justify-normal px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        <FireIcon class="h-6 w-6 mr-3"/>
                                        <div>
                                            <span class="font-semibold">Live</span>
                                            <p class="block text-gray-500">Latest Items</p>
                                        </div>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{ name: 'auctions-future'}"
                                        class="flex items-center justify-normal px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        <MegaphoneIcon class="h-6 w-6 mr-3"/>
                                        <div>
                                            <span class="font-semibold">Future</span>
                                            <p class="block text-gray-500">Upcoming Items</p>
                                        </div>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <router-link :to="{ name: 'marketplace' }"
                            active-class="text-gray-50 dark:text-gray-200"
                            class="block text-sm py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Marketplace</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'vendors' }"
                            active-class="text-gray-50 dark:text-gray-200"
                            class="block text-sm py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Vendors</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'support' }"
                            active-class="text-gray-50 dark:text-gray-200"
                            class="block text-sm py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Support</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import store from '../../store';
import Notifications from './Notifications.vue';
import {
    Bars3Icon,
    ChevronDownIcon,
    UserCircleIcon,
    HomeIcon,
    FireIcon,
    MegaphoneIcon,
    BuildingStorefrontIcon
} from "@heroicons/vue/24/outline";
import { initFlowbite } from 'flowbite';
onMounted(() => {
    initFlowbite();
});
</script>
<script>
export default {
    data() {
        const isGuest = ref(true);
        const userData = ref(null);
        isGuest.value = (store.state.user.token !== null) ? false : true;
        userData.value = (isGuest.value === false) ? JSON.parse(store.state.user.data) : null;

        return {
            siteUrl: import.meta.env.VITE_API_URL,
            localUrl: import.meta.env.VITE_URL,
            isGuest,
            userData
        }
    },
    methods: {
        async logout() {
            await store.dispatch('csrf');
            await store.dispatch('logout');
            this.$router.go();
        }
    }
}
</script>