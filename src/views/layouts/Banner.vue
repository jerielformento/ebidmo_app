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
            <!-- <section class="bg-center bg-no-repeat bg-gradient-to-b from-white to-gray-200 border-y border-gray-100 bg-blend-multiply z-10">
                <div class="px-4 mx-auto text-center py-8 lg:py-16">
                    <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-700 md:text-5xl lg:text-5xl">{{ banner.title }}</h1>
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
            </section> -->
            
            <section class="bg-slate-300 dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
                <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
                    <a href="#" class="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-amber-600 bg-amber-50 rounded-lg dark:bg-amber-900 dark:text-blue-300 hover:bg-amber-100 dark:hover:bg-amber-800">
                        <span class="text-xs bg-amber-500 rounded-lg text-white px-4 py-1.5 mr-3">New</span> <span class="text-sm font-medium">eBidMo is coming to launched! See what's new</span> 
                        <ChevronRightIcon class="h-4 w-4 ml-2"/>
                    </a>
                    <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-700 md:text-5xl lg:text-6xl dark:text-white">{{ banner.title }}</h1>
                    <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">{{ banner.description }}</p>
                    <form class="w-full max-w-md mx-auto">   
                        <label for="default-email" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Email sign-up</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                <EnvelopeIcon class="h-5 w-5 text-gray-400"/>
                            </div>
                            <input type="email" id="default-email" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-sm bg-white focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email here..." required>
                            <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-amber-400 hover:bg-amber-500 focus:ring-2 focus:outline-none focus:ring-amber-300 font-medium rounded-sm text-sm px-4 py-2 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-blue-800">Sign up</button>
                        </div>
                    </form>
                </div>
                <div class="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div>
            </section>
        </swiper-slide>
    </swiper>
</template>
<script>
    import { ref } from 'vue'
    import { ShoppingCartIcon, PlusSmallIcon ,ChevronRightIcon } from "@heroicons/vue/24/outline";
    import { HeartIcon, StarIcon, EnvelopeIcon } from "@heroicons/vue/24/solid";
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
                title: 'The Upcoming #1 Online Auction in the PH',
                description: 'Revolutionizing online auctions with a user-friendly and real-time platform. Experience convenience and excitement in buying and selling, transforming online transactions like never before!',
                img: 'public/ebidmo_no_image.png'
            },
            {
                title: 'Simple Auction Rules',
                description: 'eBidmo emphasizes simple and easy-to-understand auction rules. By providing clear guidelines and transparency in the bidding process, eBidmo ensures fairness and trust among participants, enhancing the overall user experience.',
                img: 'public/ebidmo_no_image.png'
            },
            {
                title: 'Enhanced Local Community and Support',
                description: 'eBidmo fosters a stronger sense of community among Filipino buyers and sellers. This can lead to enhanced support, networking opportunities, and a more personalized experience compared to larger global platforms like eBay.',
                img: 'public/ebidmo_no_image.png'
            }
        ];
    }

    export default {
        components: {Swiper, SwiperSlide, ItemsLoader, ShoppingCartIcon, HeartIcon, StarIcon, PlusSmallIcon, EnvelopeIcon, ChevronRightIcon},
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