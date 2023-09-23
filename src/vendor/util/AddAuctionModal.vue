<template>
    <Modal size="md" @close="cancel" class="absolute top-20 z-50">
      <template #header>
        <div class="flex items-center text-lg text-gray-600 font-bold">
          Create Auction
        </div>
      </template>
      <template #body>
        <!-- Auction -->
        <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                <li class="mr-2" role="presentation">
                    <button @click="changeType(1)" class="inline-block p-2 border-b-2 rounded-t-lg" id="live-tab" data-tabs-target="#live" type="button" role="tab" aria-controls="live" aria-selected="false">Live</button>
                </li>
                <li class="mr-2" role="presentation">
                    <button @click="changeType(2)" class="inline-block p-2 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="future-tab" data-tabs-target="#future" type="button" role="tab" aria-controls="future" aria-selected="false">Future</button>
                </li>
            </ul>
        </div>
        <div id="myTabContent">
            <div class="hidden rounded-lg dark:bg-gray-800" id="live" role="tabpanel" aria-labelledby="live-tab">
                <div>
                    <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 mb-5">
                        <div class="sm:col-span-3">
                            <label for="min-price" class="block text-sm font-medium leading-6">Minimum Bid Price</label>
                            <div class="mt-2">
                                <input v-model="postdata.min_price" id="min-price" name="min-price" type="number" autocomplete="min-price" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                <small v-if="errordata.min_price !== ''" class="text-red-400">{{ errordata.min_price }}</small>
                            </div>
                        </div>
                        <div class="sm:col-span-3">
                            <label for="increment-price" class="block text-sm font-medium leading-6">Incremental Price</label>
                            <div class="mt-2">
                                <input v-model="postdata.increment_price" id="increment-price" name="increment-price" type="number" autocomplete="increment-price" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                <small v-if="errordata.increment_price !== ''" class="text-red-400">{{ errordata.increment_price }}</small>
                            </div>
                        </div>
                        <div class="sm:col-span-6">
                            <label for="buy-now-price" class="block text-sm font-medium leading-6">Buy Now Price <span class="text-gray-400 font-normal">(optional)</span></label>
                            <div class="mt-2">
                                <input v-model="postdata.buy_now_price" id="buy-now-price" name="buy-now-price" type="number" autocomplete="buy-now-price" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                <small v-if="errordata.buy_now_price !== ''" class="text-red-400">{{ errordata.buy_now_price }}</small>
                            </div>
                        </div>
                        <div class="sm:col-span-6">
                            <label for="expiration" class="block text-sm font-medium leading-6">Expiration Date</label>
                            <div class="mt-2">
                                <!--<input v-model="postdata.expiration" @change="updateCurrentDate" ref="datepicker" id="expiration" name="expiration" type="datetime-local" :min="getCurrentDate" autocomplete="expiration" required class="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">-->
                                <VueDatePicker @update:model-value="updateExpirationDate" ref="datepicker" v-model="postdata.end_date" time-picker-inline class="w-full"></VueDatePicker>
                                <small v-if="errordata.end_date !== ''" class="text-red-400">{{ errordata.end_date }}</small>
                            </div>
                        </div>
                        <div class="sm:col-span-6">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="hidden rounded-lg dark:bg-gray-800" id="future" role="tabpanel" aria-labelledby="future-tab">
                <div>
                    <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 mb-5">
                        <div class="sm:col-span-3">
                            <label for="min-price" class="block text-sm font-medium leading-6">Minimum Bid Price</label>
                            <div class="mt-2">
                                <input v-model="postdata.min_price" id="min-price" name="min-price" type="number" autocomplete="min-price" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                <small v-if="errordata.min_price !== ''" class="text-red-400">{{ errordata.min_price }}</small>
                            </div>
                        </div>
                        <div class="sm:col-span-3">
                            <label for="increment-price" class="block text-sm font-medium leading-6">Incremental Price</label>
                            <div class="mt-2">
                                <input v-model="postdata.increment_price" id="increment-price" name="increment-price" type="number" autocomplete="increment-price" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                <small v-if="errordata.increment_price !== ''" class="text-red-400">{{ errordata.increment_price }}</small>
                            </div>
                        </div>
                        <div class="sm:col-span-3">
                            <label for="buy-now-price" class="block text-sm font-medium leading-6">Buy Now Price <span class="text-gray-400 font-normal">(optional)</span></label>
                            <div class="mt-2">
                                <input v-model="postdata.buy_now_price" id="buy-now-price" name="buy-now-price" type="number" autocomplete="buy-now-price" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                <small v-if="errordata.buy_now_price !== ''" class="text-red-400">{{ errordata.buy_now_price }}</small>
                            </div>
                        </div>
                        <div class="sm:col-span-3">
                            <label for="buy-now-price" class="block text-sm font-medium leading-6">Min. Participants <span class="text-gray-400 font-normal">(optional)</span></label>
                            <div class="mt-2">
                                <input v-model="postdata.min_participants" id="min-participants" name="min-participants" placeholder="0" type="number" autocomplete="buy-now-price" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                <small v-if="errordata.min_participants !== ''" class="text-red-400">{{ errordata.min_participants }}</small>
                            </div>
                        </div>
                        <div class="sm:col-span-6">
                            <label for="expiration" class="block text-sm font-medium leading-6">Start Date</label>
                            <div class="mt-2">
                                <!-- <input v-model="postdata.expiration" @change="updateCurrentDate" ref="datepicker" id="expiration" name="expiration" type="datetime-local" :min="getCurrentDate" autocomplete="expiration" required class="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6"> -->
                                <VueDatePicker @update:model-value="updateStartDate" ref="datepickerStart" v-model="postdata.start_date" time-picker-inline class="w-full"></VueDatePicker>
                                <small v-if="errordata.start_date !== ''" class="text-red-400">{{ errordata.start_date }}</small>
                            </div>
                        </div>
                        <div class="sm:col-span-6">
                            <label for="expiration" class="block text-sm font-medium leading-6">End Date</label>
                            <div class="mt-2">
                                <!-- <input v-model="postdata.expiration" @change="updateCurrentDate" ref="datepicker" id="expiration" name="expiration" type="datetime-local" :min="getCurrentDate" autocomplete="expiration" required class="block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6"> -->
                                <VueDatePicker @update:model-value="updateEndDate" ref="datepickerEnd" v-model="postdata.end_date" time-picker-inline class="w-full"></VueDatePicker>
                                <small v-if="errordata.end_date !== ''" class="text-red-400">{{ errordata.end_date }}</small>
                            </div>
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
                Create
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
            console.log(props.index);
            const isSubmit = ref(false);

            return {
                isSubmit,
                postdata: {
                    type: 1,
                    slug: props.id,
                    min_price: '',
                    min_participants: '',
                    buy_now_price: '',
                    increment_price: '',
                    start_date: '',
                    end_date: ''
                },
                errordata: {
                    slug: props.id,
                    min_price: '',
                    min_participants: '',
                    buy_now_price: '',
                    increment_price: '',
                    start_date: '',
                    end_date: ''
                },
            }
        },
        methods: {
            async submit() {
                this.isSubmit = true;
                
                console.log(this.postdata);
                const endpoint = (this.postdata.type === 1) ? '/api/v1/auctions' : '/api/v1/auctions/future';
                
                await axiosClient.get(import.meta.env.VITE_CSRF_AUTH_URL);
                await axiosClient.post(endpoint, this.postdata)
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