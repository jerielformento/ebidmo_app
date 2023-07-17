<template>
    <div class="bg-gray-100 h-screen flex flex-col justify-between">
    <HeaderNav/>
    <div class="bg-gray-100 pb-10">
        <div class="mx-auto max-w-2xl px-4 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-16">
            <router-view v-if="productCreate" :cancel="cancel"></router-view>
            <div class="flex justify-between items-center">
                <h2 class="text-sm font-semibold tracking-tight text-gray-500 block ml-1">
                Hottest Items
                </h2>
            </div>
        </div>
    </div>
    <FooterNav/>
    </div>
</template>
<script setup>
    import HeaderNav from "./layouts/Header.vue";
    import FooterNav from './layouts/Footer.vue';
</script>
<script>
    export default {
        data() {

        }
    }
</script>