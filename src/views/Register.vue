<template>
<div class="mx-auto px-4 py-8 sm:px-6 bg-gradient-to-b from-slate-600 to-slate-900 h-full md:h-screen lg:h-screen shadow">
    <div class="mx-auto max-w-2xl">
      
    <form @submit.prevent="submit" class="px-8 py-5 rounded-md border bg-white border-slate-200" autocomplete="off">
        <div v-if="!registerSuccess" class="space-y-0">
            <img class="mx-auto h-10 w-auto mb-5" :src="`${siteUrl}/images/ebidmo_text.png`" alt="eBidMo">
            <h2 class="text-center text-2xl font-bold leading-9 tracking-tight mb-10 pb-2 border-b border-slate-200">Sign Up</h2>
            <div class="pb-12 pt-2">
                <h2 class="text-base font-semibold leading-7">Personal Information</h2>
                <div class="mt-2 shadow-sm p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                    Use a valid address where you can receive an email verification.
                </div>
                <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-5">
                    <div class="sm:col-span-4">
                        <InputText v-model="postdata.email" label="Email Address" name="email" type="email" :error="errordata.email"/>
                    </div>
                    <div class="sm:col-span-3">
                        <InputText v-model="postdata.firstname" label="First name" name="first-name" type="text" :error="errordata.firstname"/>
                    </div>
                    <div class="sm:col-span-3">
                        <InputText v-model="postdata.middlename" label="Middle name" name="middle-name" type="text" optional="true" :error="errordata.middlename" placeholder="optional"/>
                    </div>
                    <div class="sm:col-span-3">
                        <InputText v-model="postdata.lastname" label="Last name" name="last-name" type="text" :error="errordata.lastname"/>
                    </div>
                    <div class="sm:col-span-3">
                        <InputText v-model="postdata.phone" label="Phone" name="phone-number" type="text" :error="errordata.phone"/>
                    </div>
                </div>
                <h2 class="text-base font-semibold leading-7">Login Credential</h2>
                <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-4">
                        <InputText v-model="postdata.username" label="Username" name="username" type="text" :error="errordata.username"/>
                    </div>
                    <div class="sm:col-span-3">
                        <InputText v-model="postdata.password" label="Password" name="password" type="password" :error="errordata.password"/>
                    </div>
                    <div class="sm:col-span-3">
                        <InputText v-model="postdata.password_confirmation" label="Confirm Password" name="confirm_password" type="password" :error="errordata.password_confirmation"/>
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

    import SubmitButton from '../components/forms/SubmitButton.vue';
    import InputText from '../components/forms/InputText.vue';
</script>
<script>
export default {
    data() {
        onMounted(() => {
            store.state.user.token && this.$router.push({name: 'home'});
        });

        const registerSuccess = ref(false);
        const loadBtn = ref(false);

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
        
    },
}
</script>