<template>
    <div class="flex flex-col justify-center bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 h-screen shadow">
        <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm bg-white px-8 py-6 rounded-md border border-slate-200">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 class="mt-2 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900 mb-10 pb-2 border-b border-gray-100">
                    Forgot Password
                </h2>
            </div>
            <form class="space-y-3" action="#" method="POST">
                <div class="flex items-center justify-between">
                    <label for="username" class="inline-flex text-sm font-medium leading-6 text-gray-900">
                        <PaperAirplaneIcon class="h-6 w-6"/>
                        &nbsp;Email Address
                    </label>
                    <div class="text-sm">
                        <router-link :to="{name: 'login'}" class="font-semibold text-orange-400 hover:text-orange-500">Back to login</router-link>
                    </div>
                </div>
                <div class="mt-2">
                    <input id="email-address" name="email-address" type="text" autocomplete="email-address" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                </div>
                <button type="submit" class="flex w-full justify-center items-center rounded-sm bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600">
                    Submit
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import { onMounted } from 'vue';
    import store from '../store';
    import { PaperAirplaneIcon } from '@heroicons/vue/24/outline';
    export default {
        components: {
            PaperAirplaneIcon
        },
        setup() {
            onMounted(() => {
                store.state.user.token && this.$router.push({name: 'home'});
            });
        }
    }
</script>