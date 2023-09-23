<template>
    <div class="pb-10">
        <div class="mx-auto max-w-2xl px-2 sm:px-2 sm:py-1 lg:max-w-7xl lg:px-2">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold tracking-tight text-gray-700 block">
                Listed Items
                </h2>
            </div>
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
            <div v-for="items in swiperItems" :key="items">
                <div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-4 px-1 pb-8">
                    <div v-for="item in items" :key="item.item" class="rounded-md border bg-white shadow-sm">
                        <ItemCard :item="item"/>
                    </div>
                </div>
            </div>
            <div v-if="swiperItems.length === 0" class="mt-6 pb-8">
                <div class="w-full p-3 rounded-md border bg-white shadow-sm h-32 flex items-center justify-center">
                    <h2 class="text-gray-300">No available product to show.</h2>
                </div>
            </div>
    </swiper>
    <div v-else>
        <ItemsLoader />
    </div>
    </div>
</div>
</template>
<script>
    import { ref } from 'vue'
    import { ShoppingCartIcon, PlusSmallIcon } from "@heroicons/vue/24/outline";
    import { HeartIcon, StarIcon } from "@heroicons/vue/24/solid";
    import { Autoplay, Pagination, Navigation } from 'swiper'
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import ItemsLoader from './util/ItemsLoader.vue';
    import ItemCard from './forms/ItemCard.vue';
    import axiosClient from '../axios';
    import 'swiper/css'
    import 'swiper/css/pagination'
    import 'swiper/css/navigation'

    const swiperItems = ref(null);
    const searchingItem = ref(false);

    const getProducts = async (category, brand) => {
        let pagedata = [];
        let resdata = [];
        let paginate_count = 0;
        //const categ = (category !== null) ? "?category="+category : "?category=";

        let categories = "";
        if(category !== null) {
            category.map(function(item) {
                categories += "&category[]="+item;
            });
        }
        let brands = "";
        if(brand !== null) {
            brand.map(function(item) {
                brands += "&brand[]="+item;
            });
        }

        await axiosClient.get('/api/v1/products/all?filter='+categories+brands)
            .then(response => {
                response.data.map(function(value, key) {
                    if(paginate_count == 4) {
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
            })
                    
        //await new Promise(resolve => setTimeout(resolve, 3000));
        return resdata;
    }

    export default {
        props: ['filter'],
        watch: {
            'filter.category': {
                async handler(newVal, oldVal) {
                    searchingItem.value = true;
                    // newVal = updated month_id
                    let brand = this.$props.filter.brand;
                    const products = await getProducts(newVal, brand);
                    swiperItems.value = products;
                    searchingItem.value = false;
                },
                deep: true
            },
            'filter.brand': {
                async handler(newVal, oldVal) {
                    searchingItem.value = true;
                    // newVal = updated month_id
                    let category = this.$props.filter.category;
                    const products = await getProducts(category, newVal);
                    swiperItems.value = products;
                    searchingItem.value = false;
                },
                deep: true
            }
        },
        components: {Swiper, SwiperSlide, ItemsLoader, ItemCard, ShoppingCartIcon, HeartIcon, StarIcon, PlusSmallIcon},
        async setup(props) {
            const products = await getProducts(null, null);
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