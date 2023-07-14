<template>
    <div class="flex flex-col justify-center px-6 lg:px-8 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 h-screen shadow">
        <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm px-8 py-5 rounded-md bg-white border border-slate-200 shadow-lg">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm pb-3 mb-5 border-b border-slate-200"> 
                <router-link to="/"><img class="mx-auto h-28 w-auto mb-3" src="http://localhost/images/ebidmo.png" alt="eBidMo"></router-link>
            </div>
            <form @submit.prevent="submit" class="space-y-5" action="#" method="POST">
                <div>
                    <label for="username" class="inline-flex text-sm font-medium leading-6">
                        <UserCircleIcon class="h-6 w-6"/>
                        &nbsp;Email
                    </label>
                <div class="mt-2">
                    <input v-model="postdata.username" id="username" name="username" type="text" autocomplete="username" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                </div>
                </div>
        
                <div>
                <div class="flex items-center justify-between">
                    <label for="password" class="inline-flex text-sm font-medium leading-6">
                        <LockClosedIcon class="h-6 w-6"/>
                        &nbsp;Password
                    </label>
                </div>
                <div class="mt-2">
                    <input v-model="postdata.password" id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                </div>
                <div class="flex items-center justify-between mt-2">
                    <span class="text-sm font-semibold text-gray-700">
                        <input v-model="postdata.remember" class="leading-tight text-orange-400" type="checkbox" id="remember" name="remember">
                        Remember me
                    </span>
                    <div class="text-sm">
                        <router-link :to="{name: 'forgot-password'}" class="font-semibold text-orange-400 hover:text-orange-500">Forgot password?</router-link>
                    </div>
                </div>
                </div>
                <div>
                <button type="submit" :disabled="loadBtn" class="flex w-full justify-center items-center rounded-sm bg-slate-900 disabled:opacity-80 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                    Sign in
                    <ArrowPathIcon class="animate-spin h-5 w-5 ml-1" v-if="loadBtn"/>
                </button>
                <!-- <p class="block text-center text-gray-400 text-sm mt-3">Or continue with</p>
                <div class="flex items-center justify-between space-x-2 mt-2">
                    <div class="bg-red-500 text-gray-100 hover:text-white shadow font-bold text-sm py-2 px-4 rounded flex justify-start items-center cursor-pointer w-64">
                        <svg viewBox="0 0 24 24" class="fill-current mr-3 w-6 h-5" xmlns="http://www.w3.org/2000/svg"><path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/></svg>
                        <span class="border-l border-red-400 h-6 w-1 block"></span>
                        <span class="pl-3">google</span>
                    </div>
                    <div class="bg-blue-500 text-gray-100 hover:text-white shadow text-sm font-bold py-2 px-4 rounded flex justify-start items-center cursor-pointer w-64">
                        <svg viewBox="0 0 24 24" class="fill-current mr-3 w-6 h-6" xmlns="http://www.w3.org/2000/svg"><path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z"/></svg>
                        <span class="border-l border-blue-400 h-6 w-1 block mr-1"></span>
                        <span class="pl-3">facebook</span>
                    </div>
                </div> -->
                </div>
            </form>
            <p class="mt-5 text-center text-sm text-gray-500">
                Don't have an account?
                <router-link :to="{name: 'register'}" class="font-semibold text-orange-400 hover:text-orange-500">Sign Up</router-link>
            </p>
        </div>
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue';
    import axiosClient from '../axios';
    import store from '../store';
    import { useRouter } from 'vue-router';
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';
    import { UserCircleIcon, LockClosedIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';
    import router from '../router';
</script>
<script>
    export default {
        data() {
            onMounted(() => {
                store.state.user.token && this.$router.push({name: 'home'});
            });

            const router = useRouter();
            const loadBtn = ref(false);

            return {
                postdata: { 
                    username: '',
                    password: '',
                    remember: false
                },
                errordata: { 
                    username: '',
                    password: '',
                    remember: false
                },
                loadBtn
            }
        },
        methods: {
            async submit() {
                this.loadBtn = true;

                // send request to api
                await store.dispatch('csrf');
                await store.dispatch('login', this.postdata)
                    .then(() => {
                        this.$router.go();
                    })
                    .catch((error) => {
                        const err = error.response;

                        // reset error data
                        Object.entries(this.errordata).forEach(entry => {
                            const [key, value] = entry;
                            this.errordata[key] = '';
                        });

                        toast.error(err.data.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });
                    })
                    .finally(() => {
                        this.loadBtn = false;
                    })
            },
        },
    }
</script>