<template>
    <div class="bg-gray-100 h-screen flex flex-col justify-between">
    <HeaderNav/>
    <Suspense>
        <template #default>
            <SettingsForm/>
        </template>
        <template #fallback>
            <div class="flex justify-center">
                <span class="text-gray-400 flex items-center">Loading <Spinner class="ml-2"/></span>
            </div>
        </template>
    </Suspense>
    <FooterNav/>
    </div>
</template>
<script setup>
import HeaderNav from './layouts/Header.vue';
import FooterNav from './layouts/Footer.vue';
import SettingsForm from '../components/SettingsForm.vue';
import Spinner from '../components/forms/Spinner.vue';
</script>