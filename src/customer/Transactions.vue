<template>
    <section class="mt-5">
        <div class="mx-auto">
            <Suspense>
                <template #default>
                    <router-view></router-view>
                </template>
                <template #fallback>
                    <ItemsLoader/>
                </template>
            </Suspense>
        </div>
    </section>
</template>
<script setup>
import { ref } from 'vue';
import TransactionList from './components/TransactionList.vue';
import ItemsLoader from '../vendor/util/ItemsLoader.vue';
</script>