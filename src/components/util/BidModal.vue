<template>
    <button @click="showModal" type="button" class="flex w-full items-center justify-center rounded-sm border border-transparent bg-slate-900 px-8 py-3 text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">Place your bid</button>
    <Modal size="md" v-if="isShowModal" @close="closeModal" class="absolute top-20 z-50">
      <template #header>
        <div class="flex items-center text-lg text-gray-600 font-semibold">
          Place Your Bid
        </div>
      </template>
      <template #body>
        <div class="text-gray-600">
            <div class="flex">
                <div class="custom-number-input">
                    <label for="custom-input-number" class="w-full text-md">
                        <span class="text-md block text-gray-600 font-semibold">Starting from the minimum/highest bid</span>
                        <span class="text-sm block text-gray-500">Current highest bid: {{ default_price }}</span>
                        <span class="text-sm block text-gray-500">Incremental cost: {{ incremental }}</span>
                    </label>
                    <div class="flex w-full rounded-lg relative bg-transparent mt-1">
                        <button @click="decrement" type="button" class="bg-amber-500 text-gray-600 hover:text-gray-700 hover:bg-amber-400 h-full w-20 rounded-l cursor-pointer outline-none">
                            <MinusSmallIcon class="text-white"/>
                        </button>
                        <input type="number" class="text-center w-full font-semibold text-lg disabled:border-gray-200 disabled:bg-gray-50 md:text-basecursor-default flex items-center text-gray-600 outline-none" name="custom-input-number" :value="bidprice" disabled>
                        <button @click="increment" type="button" class="bg-amber-500 text-gray-600 hover:text-gray-700 hover:bg-amber-400 h-full w-20 rounded-r cursor-pointer">
                            <PlusSmallIcon class="text-white"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
            <button @click="closeModal" :disabled="isSubmit" type="button" class="flex items-center justify-center rounded-sm border disabled:opacity-80 border-gray-200 bg-gray-50 px-4 py-2 text-base font-medium text-slate-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">Close</button>
            <button @click.prevent="submit" :disabled="isSubmit" type="button" class="ml-2 flex items-center justify-center rounded-sm border disabled:opacity-80 border-transparent bg-slate-900 px-4 py-2 text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">
                Submit
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
const auctionId = ref(null);
const minprice = ref(0);
const noBid = ref(false);

export default {
    props: {
        reload: Function,
        hbid: Number, 
        inc: Number, bid: Number, mp: Number
    },
    components: {
        Modal, PlusSmallIcon, MinusSmallIcon, ArrowPathIcon
    },
    setup(props) {
        auctionId.value = props.bid;
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
            auctionId
        }
    },  
    methods: {
        closeModal() {
            isShowModal.value = false
        },
        showModal() {
            isShowModal.value = true
        },
        increment() {
            bidprice.value += incremental.value;
            console.log(auctionId.value);
        },
        decrement() {
            if(bidprice.value > default_price.value) {
                bidprice.value -= incremental.value;
            }

            console.log(bidprice.value);
        },
        async submit() {
            isSubmit.value = true;
            console.log(bidprice.value + " " + default_price.value + " " + minprice.value);

            if((bidprice.value > default_price.value) || (noBid.value === true)) {
                if(default_price.value === 0) {
                    bidprice.value = minprice.value;
                }
                // send request to api
                await store.dispatch('csrf');
                await axiosClient.post('/api/v1/customer/bid', {
                        auction_id: auctionId.value,
                        price: bidprice.value
                    })
                    .then(response => {
                        toast.success(response.data.message, {
                            position: toast.POSITION.BOTTOM_CENTER,
                        });

                        noBid.value = false;
                        // refresh page
                        this.reload();
                    })
                    .catch((error) => {
                        const err = error.response;

                        toast.error(err.data.message, {
                            position: toast.POSITION.BOTTOM_CENTER,
                        });
                        
                        this.reload();
                    })
                    .finally(() => {
                        isSubmit.value = false;
                        this.closeModal();
                    });
            } else {
                console.log("higher");
                toast.error("Bid must be higher than current bid.", {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
                isSubmit.value = false;
            }
        }
    }
}
</script>
<style>
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .custom-number-input input:focus {
        outline: none !important;
    }

    .custom-number-input button:focus {
        outline: none !important;
    }
</style>