<template>
    <button @click="showModal" type="button" class="flex w-full items-center justify-center rounded-sm border border-transparent bg-slate-900 px-8 py-3 text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">Join Auction</button>
    <Modal size="md" v-if="isShowModal" @close="closeModal" class="absolute top-20 z-50">
      <template #header>
        <div class="flex items-center text-lg text-white">
          Join Auction
        </div>
      </template>
      <template #body>
        <div class="text-gray-200">
            <div class="flex justify-center">
                <div class="sm:col-span-4">
                    <p class="text-sm mb-1">It will start as soon as the required participants have been completed.</p>
                </div>
            </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
            <button @click="closeModal" :disabled="isSubmit" type="button" class="flex items-center justify-center rounded-sm border disabled:opacity-80 border-transparent bg-gray-50 px-4 py-2 text-base font-medium text-slate-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">Close</button>
            <button @click.prevent="submit" :disabled="isSubmit" type="button" class="ml-2 flex items-center justify-center rounded-sm border disabled:opacity-80 border-transparent bg-slate-900 px-4 py-2 text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">
                I Agree
                <ArrowPathIcon class="animate-spin h-5 w-5 ml-1" v-if="isSubmit"/>
            </button>
        </div>
      </template>
    </Modal>
</template>
<script>
import { PlusSmallIcon, MinusSmallIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';
import { Modal } from 'flowbite-vue';
import { ref } from 'vue';
import axiosClient from '../../axios';
import { toast } from 'vue3-toastify';
import store from '../../store';

const isShowModal = ref(false)
const isSubmit = ref(false);
const default_price = ref(0);
const bidprice = ref(0);
const incremental = ref(0);
const bidId = ref(null);
const minprice = ref(0);
const noBid = ref(false);

export default {
    props: {
        reload: Function,
        bid: Number
    },
    components: {
        Modal, PlusSmallIcon, MinusSmallIcon, ArrowPathIcon
    },
    setup(props) {
        bidId.value = props.bid;
        minprice.value = props.mp;
        incremental.value = props.inc;

        if(props.hbid === 0) {
            default_price.value = minprice.value;
            noBid.value = true;
        } else {
            default_price.value = props.hbid;
        }
        
        bidprice.value = default_price.value;

        return {
            isShowModal,
            isSubmit,
            default_price,
            bidprice,
            incremental,
            bidId
        }
    },  
    methods: {
        closeModal() {
            isShowModal.value = false
        },
        showModal() {
            isShowModal.value = true
        },
        async submit() {
            isSubmit.value = true;

                // send request to api
                await store.dispatch('csrf');
                await axiosClient.post('/api/v1/customer/bid/join', {
                        bid_id: bidId.value
                    })
                    .then(response => {
                        toast.success(response.data.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });

                        noBid.value = false;
                        // refresh page
                        this.reload();
                    })
                    .catch((error) => {
                        const err = error.response;

                        toast.error(err.data.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });
                        
                        this.reload();
                    })
                    .finally(() => {
                        isSubmit.value = false;
                        this.closeModal();
                    });
            
                /* console.log("higher");
                toast.error("Bid must be higher than current bid.", {
                    position: toast.POSITION.TOP_CENTER,
                }); */
                isSubmit.value = false;
         
        }
    }
}
</script>