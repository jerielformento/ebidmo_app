<template>
    <section class="mt-5 bg-gray-50">
        <div class="mx-auto">
            <!-- Start coding here -->
            <div class="bg-white relative shadow-sm sm:rounded-md overflow-hidden border border-gray-200">
                <Suspense>
                    <div v-if="isLoaded" class="grid grid-cols-1 sm:grid-cols-6 items-start gap-6">
                        <div class="col-span-6 bg-white p-4 rounded-md shadow">
                            <div class="flex items-center">
                                <span class="mr-1 text-lg inline-block font-bold">Billing Information</span>
                            </div>
                            <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                <div class="sm:col-span-6">
                                    <InputText label="Shipping Address (House/Unit/Flr #, Bldg Name, Blk or Lot #)" name="shipping_address" type="text" v-model="postdata.shipping_address" :error="errordata.shipping_address"/>
                                </div>
                                <div class="sm:col-span-3">
                                    <InputText label="Full Name" name="full_name" type="text" v-model="postdata.full_name" :error="errordata.full_name"/>
                                </div>
                                <div class="sm:col-span-3">
                                    <InputText label="Mobile Number" name="mobile_number" type="group_text" prefix="+63" v-model="postdata.mobile_number" :error="errordata.mobile_number"/>
                                </div>
                                <div class="sm:col-span-6 flex justify-end">
                                    <ButtonForm @onClick="submit" text="Save/Update Information" :state="isSubmit" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Suspense>
            </div>
        </div>
    </section>
</template>
<script>
import { ref } from 'vue';
import axiosClient from '../axios';
import store from '../store';
import { toast } from 'vue3-toastify';
import ButtonForm from '../components/forms/Button.vue';
import Spinner from '../components/forms/Spinner.vue';
import InputText from '../components/forms/InputText.vue';
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
    components: { Spinner, ButtonForm, InputText },
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
    },
    beforeUnmount() {
        console.log("leave billing...");
    },
}
</script>