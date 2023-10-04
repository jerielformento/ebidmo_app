<template>
    <Modal size="lg" @close="cancel" class="absolute top-20 z-50">
      <template #header>
        <div class="flex items-center text-lg text-gray-600 font-bold">
          Transaction Details
        </div>
      </template>
      <template #body>
        <div class="rounded-lg dark:bg-gray-800" id="live" role="tabpanel" aria-labelledby="live-tab">
            <div>
                <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 text-sm">
                    <div class="sm:col-span-6 text-gray-500">
                        <p class="text-gray-700 font-semibold mb-2">Payment Information</p>
                        <p>Method: {{ props.info.payment.payment_method_used.toUpperCase() }}</p>
                        <p>Currency: {{ props.info.payment.currency }}</p>
                        <p>Amount: {{ props.info.payment.amount }}</p>
                        <p>Status: {{ props.info.payment.status }}</p>
                        <p>Date: {{ moment(props.info.payment.created_at).format("lll") }}</p>
                    </div>
                    <div v-if="props.info.shipment !== null" class="sm:col-span-6 text-gray-500">
                        <p class="text-gray-700 font-semibold mb-2">Shipping Information</p>
                        <p>Address: {{ props.info.shipment.address }}</p>
                        <p>Full Name: {{ props.info.shipment.full_name }}</p>
                        <p>Contact: {{ props.info.shipment.contact }}</p>
                        <p>Date Shipped: {{ moment(props.info.shipment.created_at).format("lll") }}</p>
                    </div>
                    <div v-else class="sm:col-span-6">
                        <p class="text-gray-400">Pending for shipment</p>
                    </div>
                    <div class="sm:col-span-6">
                        <p>
                            <span :class="useAcknowledgementColorCode(props.info.status)" class="text-white text-xs font-semibold rounded-md py-1 px-2">
                                {{ useAcknowledgementStatus(props.info.status) }}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </template>
    </Modal>
</template>
<script setup>
    import { ref, onMounted } from 'vue';
    import { Modal } from 'flowbite-vue';
    import axiosClient from '../../axios';
    import { toast } from 'vue3-toastify';
    import { initFlowbite } from 'flowbite';
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'
    import moment from 'moment';
    import { useAcknowledgementColorCode } from '../../composables/useAuctionColorCode';
    import { useAcknowledgementStatus } from '../../composables/useAuctionStatus';
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
            info: Object
        },
        data(props) {
            const isSubmit = ref(false);
            
            return {
                props,
                moment,
                isSubmit,
                useAcknowledgementColorCode,
                useAcknowledgementStatus
            }
        },
        methods: {
            async submit() {
                this.isSubmit = true;
                
                await axiosClient.get(import.meta.env.VITE_CSRF_AUTH_URL);
                await axiosClient.put('/api/v1/shipments/'+props.id)
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