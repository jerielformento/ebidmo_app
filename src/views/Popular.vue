<template>
    <div class="bg-gray-100 h-screen flex flex-col justify-between">
    <UIMenu/>
    <div class="bg-gray-100 pb-10">
        <div class="mx-auto max-w-2xl px-4 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-16">
            <router-view v-if="productCreate" :cancel="cancel"></router-view>
            <div class="flex justify-between items-center">
                <h2 class="text-sm font-semibold tracking-tight text-gray-500 block ml-1">
                Most Popular
                </h2>
            </div>
        </div>
    </div>
    <FooterNav/>
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import UIMenu from './UIMenu.vue';
    import FooterNav from './Footer.vue';
    import StoreList from '../components/StoreList.vue';
    import ItemsLoader from '../components/ItemsLoader.vue';
    import { toast } from 'vue3-toastify';
    import { StarIcon, ShieldCheckIcon } from "@heroicons/vue/24/solid";
    import { BellIcon, MagnifyingGlassIcon, CheckIcon, ArrowPathIcon } from "@heroicons/vue/24/outline";
    import axiosClient from '../axios';
    import store from '../store';
</script>
<script>
    export default {
        data() {

        }
    }
</script>