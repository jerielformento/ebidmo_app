<template>
    <div>
    <Transition>
        <div class="" v-if="!isLoading">
            <div class="mb-10">
                <!-- Product info -->
                <div class="mx-auto bg-white border border-gray-200 max-w-2xl px-4 pt-5 sm:px-6 lg:max-w-full lg:gap-x-8 lg:px-8 lg:pb-6 lg:pt-5">
                <div class="flex justify-between w-full lg:col-span-2">
                    <!-- Image gallery -->
                    <p class="text-md font-medium text-gray-500 mb-2">Transaction Details</p>
                    <button @click="cancel" type="submit" :disabled="isSubmit" class="flex items-center justify-between border border-gray-200 rounded-sm disabled:opacity-80 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200">
                        <ArrowLongLeftIcon class="h-5 w-5 mr-1" /> Back to list
                    </button>
                </div>
                
                <!-- Options -->
                <div class="grid grid-cols-3 mt-4 gap-x-6 lg:mt-0">
                    <!-- Title and socials -->
                    <div class="pb-5 w-full flex justify-between items-center col-span-3">
                        <h1 class="text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl flex items-center justify-start"><img :src="(productInfo.auction.product !== null) ? productInfo.auction.product.thumbnail.url : NoImageUrl" alt="" draggable="false" class="border border-gray-100 rounded-sm h-10 w-10 object-cover object-center mr-3"> {{ productInfo.auction.product.name }}</h1>
                    </div>

                    <!-- Description and details -->
                    <div class="col-span-3">
                        <h3 class="sr-only">Description</h3>
                        <div class="pb-5 space-y-6 border-b border-gray-200">
                            <p class="text-base text-gray-700" v-html="productInfo.auction.product.details"></p>
                        </div>
                    </div>

                    <div class="py-3 col-span-3 md:col-span-3 lg:col-span-1">
                        <div class="mt-5 col-span-1">
                            <div class="block text-gray-500 mb-1"><h2 class="mb-2 text-gray-600 flex items-center justify-start text-xl"><InformationCircleIcon class="h-6 w-6 mr-2"/> Details</h2></div>
                            <div class="mt-3 grid-cols-1 font-semibold text-sm">
                                <div class="block text-sm mb-1"><span
                                            :class="useAcknowledgementColorCode(productInfo.status)"
                                            class="text-white text-xs font-semibold rounded-sm py-1 px-2">{{ useAcknowledgementStatus(productInfo.status) }}</span></div>
                                <div class="block text-sm"><h3 class="inline-block">Pay Amount:</h3> <span class="text-gray-500">{{ productInfo.auction.highest.price }}</span></div>
                                <div class="block text-sm"><h3 class="inline-block">Currency:</h3> <span class="text-gray-500">{{ productInfo.auction.currency.code }}</span></div>
                                <div class="block text-sm"><h3 class="inline-block">Due Until:</h3> <span class="text-gray-500">{{ moment(productInfo.ended_at).format("lll") }}</span></div>
                            </div>
                        </div>
                    </div>

                    <div class="py-3 col-span-3 md:col-span-3 lg:col-span-1">
                        <div class="mt-5 col-span-1">
                            <div class="block text-gray-500 mb-1"><h2 class="mb-2 text-gray-600 flex items-center justify-start text-xl"><InformationCircleIcon class="h-6 w-6 mr-2"/> Customer Information</h2></div>
                            <div v-if="productInfo.billing !== null" class="mt-3 grid-cols-1 font-semibold text-sm">
                                <div class="block text-sm"><h3 class="inline-block">Username:</h3> <a href="#" class="underline text-amber-500">{{ productInfo.customer.username }}</a></div>
                                <div class="block text-sm"><h3 class="inline-block">Full Name:</h3> <span class="text-gray-500">{{ productInfo.billing.full_name }}</span></div>
                                <div class="block text-sm"><h3 class="inline-block">Shipping Address:</h3> <span class="text-gray-500">{{ productInfo.billing.address }}</span></div>
                                <div class="block text-sm"><h3 class="inline-block">Mobile Number:</h3> <span class="text-gray-500">{{ productInfo.billing.mobile_number }}</span></div>
                            </div>
                            <div v-else class="mt-5">
                                <span class="text-xs block text-gray-500 font-semibold mb-1 ml-1">No information found.</span>
                            </div>
                        </div>
                    </div>

                    <div class="py-3 col-span-3 md:col-span-3 lg:col-span-1">
                        <div class="mt-5 col-span-1">
                            <div class="block text-gray-500 mb-1"><h2 class="mb-2 text-gray-600 flex items-center justify-start text-xl"><InformationCircleIcon class="h-6 w-6 mr-2"/> Payment Information</h2></div>
                            <div v-if="productInfo.payment !== null" class="mt-3 grid-cols-1 font-semibold text-sm">
                                <div class="block text-sm"><h3 class="inline-block">Currency:</h3> <span class="text-gray-500">{{ productInfo.payment.currency }}</span></div>
                                <div class="block text-sm"><h3 class="inline-block">Method:</h3> <span class="text-gray-500">{{ productInfo.payment.payment_method_used }}</span></div>
                                <div class="block text-sm"><h3 class="inline-block">Status:</h3> <span class="text-gray-500">{{ productInfo.payment.status }}</span></div>
                                <div class="block text-sm"><h3 class="inline-block">Amount Paid:</h3> <span class="text-gray-500">{{ productInfo.payment.amount }}</span></div>
                                <div class="block text-sm"><h3 class="inline-block">Transaction Charge (5%):</h3> <span class="text-gray-500">{{ productInfo.payment.amount/100*5 }}</span></div>
                                <div class="block text-lg mt-2"><h3 class="inline-block">Total Payout Amount:</h3> <span class="text-green-500">{{ productInfo.auction.currency.prefix }}{{ (productInfo.payment.amount-(productInfo.payment.amount/100*5)) }}</span></div>
                            </div>
                            <div v-else class="mt-5">
                                <span class="text-xs block text-gray-500 font-semibold mb-1 ml-1">No information found.</span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div v-else class="mt-3 w-full text-gray-500 bg-white p-3 mb-10 border border-gray-200 rounded-sm">
            <div class="mx-auto sm:py-1 flex items-center justify-center">
                <Spinner class="h-6 w-6"/>
            </div>
        </div>
    </Transition>
    </div>
</template>
<script>
    import { StarIcon, ShieldCheckIcon } from "@heroicons/vue/24/solid";
    import { ShareIcon, HeartIcon, ArrowTrendingUpIcon, TrophyIcon, ShoppingBagIcon, ArrowLongLeftIcon, Cog6ToothIcon, InformationCircleIcon, UserCircleIcon } from "@heroicons/vue/24/outline";
    import Spinner from "../../components/forms/Spinner.vue";
    import { ref, onMounted } from 'vue'
    import { useAcknowledgementColorCode } from '../../composables/useAuctionColorCode';
    import { useAcknowledgementStatus } from '../../composables/useAuctionStatus';
    import axiosClient from "../../axios";
    import { toast } from 'vue3-toastify';
    import { useRoute } from "vue-router";
    import moment from 'moment';

    const isSubmit = ref(false);
    const isMounted = ref(false);
    const dateToday  = new Date(); 
    const getCurrentDate = ref(moment(dateToday).format("YYYY-MM-D HH:mm:ss"));

    export default {
        props: {
            cancel: Function,
            reload: Function,
            leave: Function,
        },
        components: {
            Spinner,
            StarIcon,
            ShieldCheckIcon,
            ShareIcon,
            HeartIcon,
            ArrowTrendingUpIcon,
            TrophyIcon,
            ShoppingBagIcon,
            ArrowLongLeftIcon,
            Cog6ToothIcon,
            InformationCircleIcon,
            UserCircleIcon
        },
        data() {
            const route = useRoute();
            const isLoading = ref(true);
            const isEnded = ref(false);
            const productInfo = ref({});
            
            onMounted(async() => {
                const result = await axiosClient.get(`/api/v1/vendor/transactions/details/${route.params.id}`).
                    then(response => {
                        productInfo.value = response.data;
                        isLoading.value = false; 
                    })
                    .catch((errors) => {
                        //window.location = '/404-page-not-found';
                    });

                isMounted.value = true;
            });

            return {
                NoImageUrl: import.meta.env.VITE_NO_IMAGE_URL,
                isLoading,
                isMounted,
                getCurrentDate,
                productInfo,
                isSubmit,
                isEnded,
                moment,
                useAcknowledgementColorCode,
                useAcknowledgementStatus
            }
        },
        methods: {
            async submit() {
                isSubmit.value = true;
                
                console.log(this.postdata);

                await axiosClient.get(import.meta.env.VITE_CSRF_AUTH_URL);
                await axiosClient.post('/api/v1/auctions', this.postdata)
                    .then(response => {
                        toast.success(response.data.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });

                        isSubmit.value = false;
                        this.cancel();
                        this.scrollToTop();
                        this.reload();
                    })
                    .catch((error) => {
                        isSubmit.value = false;
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
            updateCurrentDate() {
                this.postdata.expiration = moment(this.$refs.datepicker.value).format("YYYY-MM-DD HH:mm:ss");
            },
            redirectError() {
                route.push({
                    name: 'home'
                });
            }
        },
        beforeUnmount() {
            console.log("leave...");
            this.leave();
            isMounted.value = false;
        },
    }
</script>