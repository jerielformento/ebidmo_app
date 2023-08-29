<template>
    <swiper v-if="!searchingItem"
        :modules="modules"
        :space-between="20"
        :loop="true"
        :pagination="{ clickable: true }"
        :autoplay="{
            delay: 7000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        }"
    >
        <swiper-slide v-for="banner in swiperItems" :key="banner">
            <!--<img :src="banner.img" alt="" class="border border-gray-100 rounded-t-md w-full object-cover object-center lg:h-full lg:w-full">
            -->
            <section class="bg-center bg-no-repeat bg-gradient-to-b from-amber-200 to-amber-400 border-y border-gray-100 bg-blend-multiply z-10">
                <div class="px-4 mx-auto text-center py-8 lg:py-16">
                    <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-800 md:text-5xl lg:text-5xl">{{ banner.title }}</h1>
                    <p class="mb-8 text-lg font-normal text-gray-600 lg:text-lg sm:px-16 lg:px-48">{{ banner.description }}</p>
                    <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-sm bg-slate-900 hover:bg-slate-950 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                            Get started
                            <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                        <a href="#" class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-gray-600 rounded-sm border border-gray-500 focus:ring-4 focus:ring-gray-400">
                            Learn more
                        </a>  
                    </div>
                </div>
            </section>
        </swiper-slide>
    </swiper>
</template>
<script>
    import { ref } from 'vue'
    import { ShoppingCartIcon, PlusSmallIcon } from "@heroicons/vue/24/outline";
    import { HeartIcon, StarIcon } from "@heroicons/vue/24/solid";
    import { Autoplay, Pagination, Navigation } from 'swiper'
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import ItemsLoader from '../../components/util/ItemsLoader.vue';
    import axiosClient from '../../axios';
    import 'swiper/css'
    import 'swiper/css/pagination'
    import 'swiper/css/navigation'

    const swiperItems = ref(null);
    const searchingItem = ref(false);

    const getBanner = async () => {
        /* let pagedata = [];
        let resdata = [];
        let paginate_count = 0;
        const categ = (category !== null) ? "?category="+category : "?category=";
        let brands = "";
        if(brand !== null) {
            brand.map(function(item) {
                console.log("&brand[]="+item);
                brands += "&brand[]="+item;
            });
        }

        await axiosClient.get('/api/v1/products/all'+categ+brands)
            .then(response => {
                response.data.map(function(value, key) {
                    if(paginate_count == 5) {
                        resdata.push(pagedata);
                        pagedata = [];
                        pagedata.push(value);
                        paginate_count = 1;
                    } else {
                        pagedata.push(value);
                        paginate_count++;
                    }
                });

                if(pagedata.length > 0) {
                    resdata.push(pagedata);
                }
            }) */
                    
        //await new Promise(resolve => setTimeout(resolve, 3000));
        //return resdata;
        return [{
                title: 'The Upcoming #1 Online Auction in the Philippines',
                description: 'Revolutionizing online auctions with a user-friendly and real-time platform. Experience convenience and excitement in buying and selling, transforming online transactions like never before!',
                img: 'public/ebidmo_no_image.png'
            },
            {
                title: 'Simple Auction Rules',
                description: 'eBidmo emphasizes simple and easy-to-understand auction rules. By providing clear guidelines and transparency in the bidding process, eBidmo ensures fairness and trust among participants, enhancing the overall user experience.',
                img: 'public/ebidmo_no_image.png'
            }];
    }

    export default {
        components: {Swiper, SwiperSlide, ItemsLoader, ShoppingCartIcon, HeartIcon, StarIcon, PlusSmallIcon},
        async setup() {
            const products = await getBanner();
            swiperItems.value = products;

            const activeHeart = ref(false);
            return {
                NoImageUrl: import.meta.env.VITE_NO_IMAGE_URL,
                modules: [Pagination, Autoplay, Navigation], 
                swiperItems,
                activeHeart,
                searchingItem
            }
        },
        methods: {
            textSubstr(text) {
                let new_string = '';
                if(text.length > 28) {
                    new_string = String(text).substring(0,28)+'..';
                } else {
                    new_string = String(text).substring(0,28);
                }
                return new_string;
            }
        }
    }
</script>