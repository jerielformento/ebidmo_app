<template>
    <div class="flex flex-col justify-center px-6 lg:px-8 bg-gradient-to-b from-slate-600 to-slate-900 h-screen shadow">
        <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm px-8 py-5 rounded-md bg-white border border-slate-200 shadow-lg">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm pb-3 mb-5 border-b border-slate-200"> 
                <router-link to="/"><img class="mx-auto h-10 w-auto mb-3" :src="`${siteUrl}/images/ebidmo_text.png`" alt="eBidMo"></router-link>
            </div>
            <form @submit.prevent="submit" class="space-y-5" action="#" method="POST">
                <div>
                    <label for="username" class="inline-flex text-sm font-medium leading-6">
                        <UserCircleIcon class="h-6 w-6"/>
                        &nbsp;Email/Username
                    </label>
                <div class="mt-2">
                    <input v-model="postdata.username" id="username" name="username" type="text" autocomplete="username" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6">
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
                    <input v-model="postdata.password" id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6">
                </div>
                <div class="flex items-center justify-between mt-2">
                    <span class="text-sm font-semibold text-gray-700">
                        <input v-model="postdata.remember" class="leading-tight text-amber-400" type="checkbox" id="remember" name="remember">
                        Remember me
                    </span>
                    <div class="text-sm">
                        <router-link :to="{name: 'forgot-password'}" class="font-semibold text-amber-400 hover:text-amber-500">Forgot password?</router-link>
                    </div>
                </div>
                </div>
                <div>
                <SubmitButton class="w-full" text="Sign in" :state="loadBtn"/>
                </div>
            </form>
            <p class="mt-5 text-center text-sm text-gray-500">
                Don't have an account?
                <router-link :to="{name: 'register'}" class="font-semibold text-amber-400 hover:text-amber-500">Sign Up</router-link>
            </p>
            <p class="mt-2 text-center text-sm text-gray-300">
                {{ '━━━━━' }} <span class="text-gray-400 mx-1">or</span> {{ '━━━━━' }}
            </p>
            <p class="mt-2 text-center text-sm text-gray-500">
                <GoogleLogin :callback="callback" prompt/>
            </p>
        </div>
    </div>
    <LoaderModal v-if="authLoader">Authenticating...</LoaderModal>
</template>
<script setup>
    import { ref, onMounted } from 'vue';
    import store from '../store';
    import { useRouter } from 'vue-router';
    import { toast } from 'vue3-toastify';
    import { GoogleLogin, decodeCredential } from 'vue3-google-login';
    import 'vue3-toastify/dist/index.css';
    import LoaderModal from '../components/util/LoaderModal.vue';
    import { UserCircleIcon, LockClosedIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';
    import Spinner from '../components/forms/Spinner.vue';
    import SubmitButton from '../components/forms/SubmitButton.vue';
</script>
<script>
    export default {
    data() {
        onMounted(() => {
            store.state.user.token && this.$router.push({ name: "home" });
        });
        const router = useRouter();
        const authLoader = ref(false);
        const loadBtn = ref(false);
        return {
            siteUrl: import.meta.env.VITE_API_URL,
            callback: (response) => {
                this.authLoader = true;
                console.log("auth...");
                const google = decodeCredential(response.credential);
                console.log(google);
                this.auth(google);
            },
            postdata: {
                username: "",
                password: "",
                remember: false
            },
            errordata: {
                username: "",
                password: "",
                remember: false
            },
            loadBtn,
            authLoader
        };
    },
    methods: {
        async submit() {
            this.loadBtn = true;
            // send request to api
            await store.dispatch("csrf");
            await store.dispatch("login", this.postdata)
                .then(() => {
                this.$router.go();
            })
                .catch((error) => {
                const err = error.response;
                // reset error data
                Object.entries(this.errordata).forEach(entry => {
                    const [key, value] = entry;
                    this.errordata[key] = "";
                });
                toast.error(err.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                });
            })
                .finally(() => {
                this.loadBtn = false;
                this.authLoader = false;
            });
        },
        async auth(request) {
            this.loadBtn = true;
            // send request to api
            await store.dispatch('csrf');
            /*
            'username' => 'required|string|unique:customers',
            'firstname' => 'required|regex:/^[a-zA-Z .]+$/u',
            'lastname' => 'required|regex:/^[a-zA-Z .]+$/u',
            'middlename' => 'sometimes|regex:/^[a-zA-Z ]+$/u|nullable',
            'phone' => 'sometimes|alpha_num',
            'email' => 'required|regex:/^[a-zA-Z.-_@]+$/u|unique:customers_profile,email',
            'password' => 'required|string|confirmed'
            */
            await store.dispatch('auth', {
                username: request.email,
                firstname: request.given_name,
                lastname: request.family_name,
                middlename: '',
                phone: '',
                email: request.email,
                password: '@ebidmoP@$$!!',
                password_confirmation: '@ebidmoP@$$!!'
            })
                .then(response => {
                    this.registerSuccess = true;
                    
                    /* toast.success(response.data.message, {
                        position: toast.POSITION.TOP_CENTER,
                    }); */
                    this.$router.go();
                    

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
    components: { GoogleLogin }
}
</script>