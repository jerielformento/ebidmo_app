<template>
    <div class="bg-gray-100 w-full h-screen flex flex-col justify-between">
    <HeaderNav/>
    <SearchBar/>
    <Suspense>
        <template #default>
            <div>
            <!-- Listing Panel -->
            <div class="">
                <div>
                    <Banner/>
                    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 class="text-2xl font-bold tracking-tight text-gray-900 sr-only">Listing</h1>
                    <LiveAuctionList/>
                    <ProductList/>
                    </main>
                </div>
                </div>
                <!-- End of Listing -->
            </div>
        </template>
        <template #fallback>
        <div>
        <ItemsLoader/>
        <ItemsLoader/>
        </div>
        </template>
    </Suspense>
    <FooterNav/>
    </div>
</template>
<script setup>
    import HeaderNav from "./layouts/Header.vue";
    import FooterNav from './layouts/Footer.vue';
    import SearchBar from './layouts/SearchBar.vue';
    import Banner from './layouts/Banner.vue';
    import LiveAuctionList from '../components/LiveAuctionList.vue';
    import ProductList from '../components/ProductList.vue';
    import ItemsLoader from '../components/util/ItemsLoader.vue';
    import { useStore } from 'vuex'
    import { computed } from 'vue'
</script>
<script>
    export default {
        data() {
            const store = useStore();

            return {
                user: computed(() => store.state.user),
            }
        }
    }
</script>