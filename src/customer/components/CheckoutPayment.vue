<template>
    <div>
        Payment Method
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { ShieldCheckIcon, ShieldExclamationIcon } from "@heroicons/vue/24/solid";
import { Pagination, Navigation, Thumbs } from 'swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue';
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import axiosClient from '../../axios';
import { useRoute } from 'vue-router';
import ButtonForm from '../../components/forms/Button.vue';
</script>
<script>
export default {
    data() {
        const isCheckout = ref(false);
        const thumbsSwiper = ref(null);
        const setThumbsSwiper = (swiper) => {
            thumbsSwiper.value = swiper;
        };

        const isMounted = ref(false);
        const isInvalid = ref(false);
        const route = useRoute();
        const productInfo = ref({});
        const productImages = ref({});
        const isLoading = ref(true);

        onMounted(async() => {
            await axiosClient.get(`/api/v1/customer/transactions/checkout/${route.params.id}`).
                    then(response => {
                        console.log(response.data);
                        productInfo.value = response.data;
                        productImages.value = response.data.auction.product.images
                        isLoading.value = false; 
                        isMounted.value = true;
                    })
                    .catch((errors) => {
                        //window.location = '/404-page-not-found';
                    }); 
        });

        const swiperItems = ref(productImages);

        return {
            modules: [Pagination, Navigation, Thumbs], 
            Thumbs,
            thumbsSwiper,
            setThumbsSwiper,
            swiperItems,
            productInfo,
            isLoading,
            isMounted,
            isInvalid,
            isCheckout,
            route
        }
    },
    methods: {
        checkout() {
            //console.log(this.$route.path);
            /* const options = {
                method: 'POST',
                headers: {
                    'X-BUSINESS-API-KEY': 'da60790b3c460c9f04556ae969f2105c53555527ca83de9b9b5826c08f20b3d5',
                    'Content-Type': 'application/json'
                },
                body: '{"amount":50,"currency":"PHP","redirect_url":'+import.meta.env.VITE_URL+this.$route.path+'}'
            };

            fetch('https://securecheckout.sandbox.hit-pay.com/payment-request/@testbid', options)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(err => console.error(err)); */
                this.isCheckout = true;
                axiosClient.get(`/api/v1/payment/transaction/${this.route.params.id}`)
                .then(function(response) {
                // Parsing the response and redirecting the customer for authentication
                console.log(response.data.url);
                const checkout_url = response.data.url;

                    // Option 1: similar behavior as an HTTP redirect
                    //window.location.replace(checkout_url);

                    // Option 2: similar behavior as clicking on a link
                    
                    window.location.href = checkout_url;
                }).finally(() => {
                    this.isCheckout = false;
                });
        }
    },
}
</script>
<style scoped>
    .swiper-thumbs .swiper-slide-thumb-active {
        border:2px solid #ff9f0e;
    }
    .swiper-thumbs .swiper-slide:not(.swiper-slide-thumb-active) {
        opacity:0.8;
    }
</style>