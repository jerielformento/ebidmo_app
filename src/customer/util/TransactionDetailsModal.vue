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
                <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div class="sm:col-span-6">
                        <p>Payment Method: {{ this.$props.info.payment_method_used.toUpperCase() }}</p>
                        <p>Currency: {{ this.$props.info.currency }}</p>
                        <p>Amount: {{ this.$props.info.amount }}</p>
                        <p>Status: {{ this.$props.info.status }}</p>
                        <p>Date: {{ moment(this.$props.info.created_at).format("lll") }}</p>
                    </div>
                </div>
            </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
            <button @click="cancel" type="button" :disabled="isSubmit" class="flex items-center justify-center rounded-sm border disabled:opacity-80 border-gray-200 bg-gray-50 px-4 py-2 text-base font-medium text-slate-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">Close</button>
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
            info: Array
        },
        data(props) {
            const isSubmit = ref(false);
            
            return {
                moment,
                isSubmit
            }
        },
        methods: {
            async submit() {
                this.isSubmit = true;
                
                await axiosClient.get(import.meta.env.VITE_CSRF_AUTH_URL);
                await axiosClient.put('/api/v1/shipments/'+this.$props.id)
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