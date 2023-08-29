<template>
    <div class="bg-gray-100 h-screen flex flex-col justify-between">
    <HeaderNav/>
    <SearchBar/>
    <div class="bg-gray-100 pb-10 mt-5">
        <div class="mx-auto max-w-2xl px-4 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-16">
            <router-view v-if="productCreate" :cancel="cancel"></router-view>
            <div class="flex justify-between items-center">
                <div class="w-full p-3 rounded-md border-2 border-dashed h-32 flex items-center justify-center">
                    <h2 class="text-gray-400">This page is currently not available at the moment.</h2>
                </div>
            </div>
        </div>
    </div>
    <FooterNav/>
    </div>
</template>
<script setup>
    import HeaderNav from './layouts/Header.vue';
    import FooterNav from './layouts/Footer.vue';
    import SearchBar from './layouts/SearchBar.vue';
</script>
<script>
    export default {
        data() {

        }
    }
</script>