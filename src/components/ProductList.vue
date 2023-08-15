<template>
    <div class="pb-10">
        <div class="mx-auto max-w-2xl px-2 sm:px-2 sm:py-1 lg:max-w-7xl lg:px-2">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold tracking-tight text-gray-700 block">
                Listed Items
                </h2>

                <div>
                    <a href="#" class="text-sm underline text-amber-500 inline-block"><p>View all</p></a>
                </div>
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
                <div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:gap-x-4 px-1 pb-8">
                    <div v-for="text in items" :key="text.item" class="rounded-md border bg-white shadow-md">
                        <div class="group relative pb-3">
                            <div class="absolute right-1 top-1 z-10 rounded-full cursor-pointer">
                                <HeartIcon @click="activeHeart = !activeHeart" class="h-8 w-8" :class="activeHeart ? 'text-red-500' : 'text-gray-300'"/>
                            </div>
                            <div class="min-h-50 aspect-h-2 aspect-w-2 w-full overflow-hidden rounded-t-md bg-gray-200 group-hover:opacity-90 lg:h-50">
                            <img :src="(text.thumbnail !== null) ? text.thumbnail.url : NoImageUrl" alt="" class="border border-gray-100 rounded-t-md w-full object-cover object-center lg:h-full lg:w-full">
                            </div>
                            <div class="mt-3 px-3 flex justify-between">
                                <div>
                                    <h3 class="text-sm text-amber-500 break-all">
                                        <router-link :to="{name: 'product-details', params: { store: text.store.slug, id: text.slug }}" class="font-semibold">
                                            <span aria-hidden="true" class="absolute inset-0"></span>
                                            {{ textSubstr(text.name) }}
                                        </router-link>
                                    </h3>
                                </div>
                            </div>
                            <div class="mx-3 relative">
                                <p class="mt-1 text-sm block font-semibold text-gray-600">{{ text.store.name }}</p>
                                <p class="mt-1 text-sm text-gray-400">Category: <a href="#" class="text-amber-600 underline">{{ text.category.title }}</a></p>
                                <p class="mt-1 text-sm text-gray-400">Brand: <a href="#" class="text-amber-600 underline">{{ text.brand.description }}</a></p>
                            </div>
                            <div class="mt-1 mx-3 text-2xl text-gray-500 flex md:block lg:flex justify-between items-center relative">
                                <!-- <div class="flex items-center">
                                    <div class="flex items-center">
                                        <StarIcon class="text-yellow-400 h-4 w-4 flex-shrink-0" />
                                        <StarIcon class="text-yellow-400 h-4 w-4 flex-shrink-0" />
                                        <StarIcon class="text-yellow-400 h-4 w-4 flex-shrink-0" />
                                        <StarIcon class="text-yellow-400 h-4 w-4 flex-shrink-0" />
                                        <StarIcon class="text-gray-200 h-4 w-4 flex-shrink-0" />
                                    </div>
                                </div> -->
                                <!-- <router-link 
                                    :to="{name: 'product-details', 
                                    params: { store: text.store.slug, id: text.slug }}" 
                                    class="flex md:block md:text-center mt-2 items-center rounded-sm bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                                    View
                                </router-link> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="swiperItems.length === 0" class="mt-6 pb-8">
                <div class="w-full p-3 rounded-md border bg-white shadow-md h-32 flex items-center justify-center">
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
        components: {Swiper, SwiperSlide, ItemsLoader, ShoppingCartIcon, HeartIcon, StarIcon, PlusSmallIcon},
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