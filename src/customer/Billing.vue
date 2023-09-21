<template>
    <section class="mt-5 bg-gray-50">
        <div class="mx-auto">
            <!-- Start coding here -->
            <div class="bg-white relative shadow-md sm:rounded-sm overflow-hidden border border-gray-200">
                <div v-if="isLoaded" class="grid grid-cols-1 sm:grid-cols-6 items-start gap-6">
                    <div class="col-span-6 bg-white p-4 rounded-sm shadow">
                        <div class="flex items-center">
                            <span class="mr-1 text-lg inline-block font-bold">Billing Information</span>
                        </div>
                        <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                            <div class="sm:col-span-6">
                                <label for="name" class="block text-sm font-medium leading-6">Shipping Address <span class="text-xs text-gray-400 block">House/Unit/Flr #, Bldg Name, Blk or Lot #</span></label>
                                <div class="mt-2">
                                    <input v-model="postdata.shipping_address" type="text" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                    <small v-if="errordata.shipping_address !== ''" class="text-red-400">{{ errordata.shipping_address }}</small>
                                </div>
                            </div>
                            <div class="sm:col-span-3">
                                <label for="name" class="block text-sm font-medium leading-6">Full Name</label>
                                <div class="mt-2">
                                    <input v-model="postdata.full_name" type="text" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                    <small v-if="errordata.full_name !== ''" class="text-red-400">{{ errordata.full_name }}</small>
                                </div>
                            </div>
                            <div class="sm:col-span-3">
                                <label for="name" class="block text-sm font-medium leading-6">Mobile Number</label>
                                <div class="mt-2">
                                    <div class="relative">
                                        <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                            <span class="text-sm text-gray-400 font-semibold">+63</span>
                                        </div>
                                        <!-- <input type="text" id="input-group-1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com"> -->
                                        <input v-model="postdata.mobile_number" id="input-group-1" type="text" autocomplete="name" required class="block w-full rounded-sm border-0 pl-12 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                    </div>
                                    <small v-if="errordata.mobile_number !== ''" class="text-red-400">{{ errordata.mobile_number }}</small>
                                </div>
                            </div>

                            <div class="sm:col-span-6 flex justify-end">
                                <ButtonForm @onClick="submit" text="Save/Update Information" :state="isSubmit" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { ref, onMounted } from 'vue';
import axiosClient from '../axios';
import store from '../store';
import { toast } from 'vue3-toastify';
import ButtonForm from '../components/forms/Button.vue';
import Spinner from '../components/forms/Spinner.vue';

const isLoaded = ref(false);
const isSubmit = ref(false);

const getBillingInformation = async () => {
    let resdata = [];

    await axiosClient.get('/api/v1/customer/billing/shipping')
        .then(response => {
            resdata = response.data;
            isLoaded.value = true;
        });
        
    return resdata;
}

export default {
    components: { Spinner, ButtonForm },
    async setup() {
        const billing = await getBillingInformation();
        
        return {
            postdata: {
                shipping_address: billing.address ?? '',
                full_name: billing.full_name ?? '',
                mobile_number: billing.mobile_number ?? ''
            },
            errordata: {
                shipping_address: '',
                full_name: '',
                mobile_number: ''
            },
            isLoaded,
            isSubmit
        }
    },
    methods: {
        async submit() {
            isSubmit.value = true;

            await store.dispatch('csrf');
            await axiosClient.post('/api/v1/customer/billing/shipping', {
                    shipping_address: this.postdata.shipping_address,
                    full_name: this.postdata.full_name,
                    mobile_number: this.postdata.mobile_number
                })
                .then(response => {
                    // reset error data
                    Object.entries(this.errordata).forEach(entry => {
                        const [key, value] = entry;
                        this.errordata[key] = '';
                    });

                    toast.success(response.data.message, {
                        position: toast.POSITION.BOTTOM_CENTER,
                    });
                    
                    // refresh page
                    //this.reload();
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
                    
                    //this.reload();
                })
                .finally(() => {
                    isSubmit.value = false;
                    //this.closeModal();
                });
        }
    }
}
</script>