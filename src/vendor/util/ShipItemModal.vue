<template>
    <Modal size="md" @close="cancel" class="absolute top-20 z-50">
      <template #header>
        <div class="flex items-center text-lg text-gray-600 font-bold">
          Process Shipment
        </div>
      </template>
      <template #body>
        <div class="rounded-lg dark:bg-gray-800" id="live" role="tabpanel" aria-labelledby="live-tab">
            <div>
                <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 mb-5">
                    <div class="sm:col-span-6">
                        <div class="p-4 text-sm shadow-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                            <span class="font-medium">Note:</span> This will let the customer know that you ship the item using the specified courier.
                        </div>
                    </div>
                    <div class="sm:col-span-6">
                        <label for="location" class="block text-sm font-medium leading-6">External Courier Used</label>
                        <div class="mt-2">
                            <select v-model="postdata.courier" id="location" name="location" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                <option v-for="courier in couriers" :value="courier.id">{{ courier.description }}</option>
                            </select>
                            <small v-if="errordata.location !== ''" class="text-red-400">{{ errordata.location }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
            <button @click="cancel" type="button" :disabled="isSubmit" class="flex items-center justify-center rounded-md border disabled:opacity-80 border-gray-200 bg-gray-50 px-4 py-2 text-base font-medium text-slate-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">Close</button>
            <button @click="submit" type="button" :disabled="isSubmit" class="ml-2 flex items-center justify-center rounded-md border disabled:opacity-80 border-transparent bg-green-400 px-4 py-2 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2">
                Ship
                <Spinner v-if="isSubmit"/>
            </button>
        </div>
      </template>
    </Modal>
</template>
<script setup>
    import { ref, onMounted } from 'vue';
    import { Modal } from 'flowbite-vue';
    import axiosClient from '../../axios';
    import Spinner from '../../components/forms/Spinner.vue';
    import { toast } from 'vue3-toastify';
    import { initFlowbite } from 'flowbite';
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'
    import moment from 'moment';
    import storeFilter from '../../store/filter';
    const dateToday  = new Date(); 
    const getCurrentDate = ref(moment(dateToday).format("YYYY-MM-D HH:mm:ss"));
    const date = ref(new Date());
    onMounted(() => {
        initFlowbite();    
    });
    
</script>
<script>
    export default {
        components: {VueDatePicker},
        props: {
            cancel: Function,
            reload: Function,
            id: String,
        },
        data(props) {
            const couriers = ref(null);
            const isSubmit = ref(false);
            const sel_courier = 0;

            onMounted(async () => {
                couriers.value = await storeFilter.dispatch('couriers', sel_courier);  
            });

            return {
                isSubmit,
                postdata: {
                    courier: ''
                },
                errordata: {
                    courier: ''
                },
                couriers
            }
        },
        methods: {
            async submit() {
                this.isSubmit = true;
                
                await axiosClient.get(import.meta.env.VITE_CSRF_AUTH_URL);
                await axiosClient.post('/api/v1/shipments', {
                    courier: this.postdata.courier,
                    transaction: this.$props.id
                })
                    .then(response => {
                        toast.success(response.data.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });

                        this.isSubmit = false;
                        this.cancel();
                        this.scrollToTop();
                        this.reload();
                    })
                    .catch((error) => {
                        this.isSubmit = false;
                        const err = error.response;

                        toast.error(err.data.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });

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
                    })
                    .finally(() => {

                    });
            },
            updateExpirationDate() {
                this.postdata.end_date = moment(this.$refs.datepicker.value).format("YYYY-MM-DD HH:mm:ss");
                console.log(this.postdata.end_date);
            },
            updateStartDate() {
                this.postdata.start_date = moment(this.$refs.datepickerStart.value).format("YYYY-MM-DD HH:mm:ss");
                console.log(this.postdata.start_date);
            },
            updateEndDate() {
                this.postdata.end_date = moment(this.$refs.datepickerEnd.value).format("YYYY-MM-DD HH:mm:ss");
                console.log(this.postdata.end_date);
            },
            changeType(id) {
                this.postdata.type = id;
            },
            scrollToTop() {
                window.scrollTo(0,0);
            },
        }
    }
</script>