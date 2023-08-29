<template>
<div class="mx-auto px-4 py-8 sm:px-6 bg-gradient-to-b from-slate-600 to-slate-900 h-full md:h-screen lg:h-screen shadow">
    <div class="mx-auto max-w-2xl">
      
    <form @submit.prevent="submit" class="px-8 py-5 rounded-md border bg-white border-slate-200" autocomplete="off">
        <div v-if="!registerSuccess" class="space-y-0">
            <img class="mx-auto h-10 w-auto mb-5" :src="`${siteUrl}/images/ebidmo_text.png`" alt="eBidMo">
            <h2 class="text-center text-2xl font-bold leading-9 tracking-tight mb-10 pb-2 border-b border-slate-200">Sign Up</h2>
            <div class="pb-12 pt-2">
                <h2 class="text-base font-semibold leading-7">Personal Information</h2>
                <p class="mt-1 text-sm leading-6 text-gray-500">Use a valid address where you can receive an email verification.</p>
                <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-5">
                    <div class="sm:col-span-4">
                        <label for="email" class="block text-sm font-medium leading-6">Email address</label>
                        <div class="mt-2">
                            <input v-model="postdata.email" :class="{ 'ring-2 ring-inset ring-red-500': errordata.email !== ''}" id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6">
                            <small v-if="errordata.email !== ''" class="text-red-400">{{ errordata.email }}</small>
                        </div>
                    </div>
                    <div class="sm:col-span-3">
                        <label for="first-name" class="block text-sm font-medium leading-6">First name</label>
                        <div class="mt-2">
                            <input v-model="postdata.firstname" :class="{ 'ring-2 ring-inset ring-red-500': errordata.firstname !== ''}" id="first-name" name="first-name" type="text" autocomplete="first-name" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6">
                            <small v-if="errordata.firstname !== ''" class="text-red-400">{{ errordata.firstname }}</small>
                        </div>
                    </div>
                    <div class="sm:col-span-3">
                        <label for="middle-name" class="block text-sm font-medium leading-6">Middle name</label>
                        <div class="mt-2">
                            <input v-model="postdata.middlename" :class="{ 'ring-2 ring-inset ring-red-500': errordata.middlename !== ''}" id="middle-name" name="middle-name" type="text" autocomplete="middle-name" placeholder="Optional" class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6">
                            <small v-if="errordata.middlename !== ''" class="text-red-400">{{ errordata.middlename }}</small>
                        </div>
                    </div>
                    <div class="sm:col-span-3">
                        <label for="last-name" class="block text-sm font-medium leading-6">Last name</label>
                        <div class="mt-2">
                            <input v-model="postdata.lastname" :class="{ 'ring-2 ring-inset ring-red-500': errordata.lastname !== ''}" id="last-name" name="last-name" type="text" autocomplete="last-name" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6">
                            <small v-if="errordata.lastname !== ''" class="text-red-400">{{ errordata.lastname }}</small>
                        </div>
                    </div>
                    <div class="sm:col-span-3">
                        <label for="phone-number" class="block text-sm font-medium leading-6">Phone</label>
                        <div class="mt-2">
                            <input v-model="postdata.phone" :class="{ 'ring-2 ring-inset ring-red-500': errordata.phone !== ''}" id="phone-number" name="phone-number" type="text" autocomplete="phone-number" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6">
                            <small v-if="errordata.phone !== ''" class="text-red-400">{{ errordata.phone }}</small>
                        </div>
                    </div>
                </div>
                <h2 class="text-base font-semibold leading-7">Login Credential</h2>
                <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-4">
                        <label for="sdsdasd" class="block text-sm font-medium leading-6">Username</label>
                        <div class="mt-2">
                            <input v-model="postdata.username" :class="{ 'ring-2 ring-inset ring-red-500': errordata.username !== ''}" id="username" name="username" type="text" autocomplete="username" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6">
                            <small v-if="errordata.username !== ''" class="text-red-400">{{ errordata.username }}</small>
                        </div>
                    </div>
                    <div class="sm:col-span-3">
                        <label for="password" class="block text-sm font-medium leading-6">Password</label>
                        <div class="mt-2 relative inset-y-0 right-0 flex rounded-md shadow-sm h-9">
                            <input v-model="postdata.password" :class="{ 'ring-2 ring-inset ring-red-500': errordata.password !== ''}" id="password" name="password" :type="inputTypePassword" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6">
                            <button @click.prevent="toggleTypePassword" type="button" tabindex="-1" class="inline-flex flex-shrink-0 justify-center items-center h-9 w-[2.875rem] bg-gray-50 border border-gray-200 ml-[-1px] px-3 py-1.5 text-sm font-semibold leading-6 text-gray-400 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 rounded-r-sm">
                                <EyeIcon v-if="inputTypePassword == 'password'" />
                                <EyeSlashIcon v-else/>
                            </button>
                        </div>
                        <small v-if="errordata.password !== ''" class="text-red-400">{{ errordata.password }}</small>
                    </div>
                    <div class="sm:col-span-3">
                        <label for="confirm-password" class="block text-sm font-medium leading-6">Confirm Password</label>
                        <div class="mt-2 relative inset-y-0 right-0 flex rounded-md shadow-sm h-9">
                            <input v-model="postdata.password_confirmation" :class="{ 'ring-2 ring-inset ring-red-500': errordata.password !== ''}" id="confirm-password" name="confirm-password" :type="inputTypeConfirmPassword" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6">
                            <button @click.prevent="toggleTypeConfirmPassword" type="button" tabindex="-1" class="inline-flex flex-shrink-0 justify-center items-center h-9 w-[2.875rem] bg-gray-50 border border-gray-200 ml-[-1px] px-3 py-1.5 text-sm font-semibold leading-6 text-gray-400 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 rounded-r-sm">
                                <EyeIcon v-if="inputTypeConfirmPassword == 'password'" />
                                <EyeSlashIcon v-else/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pt-3 border-t border-gray-900/10 flex items-center justify-end gap-x-6">
                <router-link :to="{name: 'login'}" class="text-sm font-semibold leading-6 text-gray-500">Back to Login</router-link>
                <SubmitButton text="Submit" :state="loadBtn"/>
            </div>
        </div>
        <div v-if="registerSuccess" class="space-y-0 text-center">
            <img class="mx-auto h-24 w-auto" src="http://localhost/images/ebidmo.png" alt="eBidMo">
            <h2 class="text-gray-600 flex justify-center items-center text-2xl leading-9 tracking-tight mb-10 pb-2 border-b border-slate-200"><CheckCircleIcon class="h-8 w-8 mr-1 block text-green-500"/> Your account has been created.</h2>
            <div class="pb-6 pt-2">
                <p class="text-gray-400">Please check your email to verify your account.</p>
            </div>
            <router-link :to="{name: 'login'}" @click.prevent="registerSuccess = false" class="text-sm font-semibold leading-6 text-gray-500">Go to Login</router-link>
        </div>
    </form>
    </div>
</div>
</template>
<script setup>
    import { ref, onMounted } from 'vue';
    import store from '../store';
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';
    import { CheckCircleIcon } from "@heroicons/vue/24/solid";
    import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
    import SubmitButton from '../components/forms/SubmitButton.vue';
</script>
<script>
export default {
    data() {
        onMounted(() => {
            store.state.user.token && this.$router.push({name: 'home'});
        });

        const registerSuccess = ref(false);
        const loadBtn = ref(false);
        const inputTypePassword = ref("password"); 
        const inputTypeConfirmPassword = ref("password");

        return {
            siteUrl: import.meta.env.VITE_API_URL,
            postdata: { 
                email: '',
                firstname: '',
                lastname: '',
                middlename: '',
                phone: '',
                username: '',
                password: '',
                password_confirmation: ''
            },
            errordata: {
                email: '',
                firstname: '',
                lastname: '',
                middlename: '',
                phone: '',
                username: '',
                password: '',
                password_confirmation: ''
            },
            inputTypePassword,
            inputTypeConfirmPassword,
            loadBtn,
            registerSuccess
        }   
    },
    methods: {
        async submit() {
            this.loadBtn = true;
            // send request to api
            await store.dispatch('csrf');
            await store.dispatch('register', this.postdata)
                .then(response => {
                    this.registerSuccess = true;
                    
                    toast.success(response.data.message, {
                        position: toast.POSITION.TOP_CENTER,
                    });

                    console.log(response);
                })
                .catch((error) => {
                    const err = error.response;

                    // reset error data
                    Object.entries(this.errordata).forEach(entry => {
                        const [key, value] = entry;
                        this.errordata[key] = '';
                    });

                    // get return object errors and pass to error inputs
                    Object.entries(err.data.errors).forEach(entry => {
                        const [key, value] = entry;
                        this.errordata[key] = value[0];
                    });

                    console.log(this.errordata);
                })
                .finally(() => {
                    this.loadBtn = false;
                });
        },
        toggleTypePassword() {
            this.inputTypePassword = this.inputTypePassword === "password" ? "text" : "password";
        },
        toggleTypeConfirmPassword() {
            this.inputTypeConfirmPassword = this.inputTypeConfirmPassword === "password" ? "text" : "password";
        }
    },
}
</script>