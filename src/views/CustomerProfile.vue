<template>
    <div class="bg-gray-100 h-screen flex flex-col justify-between">
    <HeaderNav/>
    <nav class="bg-slate-600 dark:bg-gray-700">
        <div class="max-w-screen-xl px-4 py-3 mx-auto">
            <div class="flex items-center">
                <ul class="flex flex-row font-medium mr-6 space-x-2 text-sm">
                    <li>
                        <router-link :to="{ name: 'customer-dashboard' }" 
                        exact-active-class="bg-slate-700"
                        class="py-1.5 p-2 text-gray-200 hover:bg-slate-500 rounded-md dark:text-white" 
                        aria-current="page">Home</router-link>
                    </li>
                    <!-- <li>
                        <router-link :to="{ name: 'customer-won' }" 
                        exact-active-class="bg-slate-700"
                        class="py-1.5 p-2 text-gray-200 hover:bg-slate-500 rounded-md dark:text-white">Won Auctions</router-link>
                    </li> -->
                    <li>
                        <router-link :to="{ name: 'transaction-home' }" 
                        active-class="bg-slate-700"
                        class="py-1.5 p-2 text-gray-200 hover:bg-slate-500 rounded-md dark:text-white">Transactions</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'customer-billing' }" 
                        active-class="bg-slate-700"
                        class="py-1.5 p-2 text-gray-200 hover:bg-slate-500 rounded-md dark:text-white">Billing</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <main class="p-5 h-full">
        <div class="container max-w-screen-xl mx-auto">
            <!-- Breadcrumb -->
            <nav
                     class="flex px-3 py-2 mb-4 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                     aria-label="Breadcrumb">
                     <ol class="inline-flex items-center space-x-0 md:space-x-2">
                        <li class="inline-flex items-center">
                           <router-link :to="{ name: 'customer-dashboard' }"
                              class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-amber-500 dark:text-gray-400 dark:hover:text-white">
                              <HomeIcon class="h-5 w-5 mr-1" /> Home
                           </router-link>
                        </li>
                        <li aria-current="page" v-if="route.matched[1].meta.title != route.meta.title">
                           <div class="flex items-center">
                              <ChevronRightIcon class="h-4 w-4"/>
                              <router-link :to="{ name: 'transaction-home' }" class="ml-1 text-sm font-medium text-gray-700 hover:text-amber-500 md:ml-2 dark:text-gray-400">
                                 {{ route.matched[1].meta.title }} 
                              </router-link>
                           </div>
                        </li>
                        <li aria-current="page">
                           <div class="flex items-center">
                              <ChevronRightIcon class="h-4 w-4"/>
                              <span class="ml-1 text-sm font-medium text-gray-400 md:ml-2 dark:text-gray-400">
                                 {{ route.meta.title }}
                              </span>
                           </div>
                        </li>
                     </ol>
                  </nav>
            <Suspense>
                <router-view></router-view>
            </Suspense>
        </div>
    </main>
    </div>
</template>
<script setup>
    import HeaderNav from './layouts/Header.vue';
    import { useRoute } from 'vue-router';
    import { HomeIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
    const route = useRoute();
</script>