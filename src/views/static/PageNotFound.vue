<template>
    <div class="flex flex-col justify-center mt-10 px-6 py-6 lg:px-8">
        <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm px-8 py-5 border-2 border-dashed border-gray-700 rounded-lg">
            <router-link to="/"><img class="mb-5 mx-auto h-32 w-auto" src="http://localhost/images/ebidmo_off.png" alt="eBidMo"></router-link>
            <h2 class="text-3xl text-gray-500 flex items-center justify-center"><XMarkIcon class="h-10 w-10"/>Page Not Found</h2>
            <a href="#" class="mt-3 p-1 text-sm flex justify-center text-center font-semibold leading-6 text-gray-200 items-center">Redirecting ... <ArrowPathIcon class="animate-spin ml-2 h-5 w-5" /></a>
        </div>
    </div>
</template>
<script setup>
    import { XMarkIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';

    setTimeout(function() {
        window.location = '/';
    }, 2000)
</script>