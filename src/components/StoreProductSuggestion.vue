<template>
    <div class="bg-gray-100 pb-5">
        <div class="mx-auto max-w-2xl px-4 sm:px-6 sm:py-1 lg:max-w-full lg:pr-10 lg:pl-0">
            <div class="flex justify-between items-center border-t border-gray-200 pt-5">
                <h2 class="text-sm font-semibold tracking-tight text-gray-400 block ml-1">
                Other from Store
                </h2>
            </div>
            <div v-if="!searchingItem" class="mt-3 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4 px-1 pb-8">
                <div v-for="item in productItems" :key="item.slug">
                    <div class="group relative pb-3 rounded-md border bg-white shadow-sm">
                        <div class="min-h-50 aspect-h-2 aspect-w-2 w-full overflow-hidden rounded-t-md bg-gray-200 group-hover:opacity-90 lg:h-50">
                        <img :src="(item.thumbnail !== null) ? item.thumbnail.url : NoImageUrl" alt="" class="border border-gray-100 rounded-t-md h-full w-full object-cover object-center lg:h-full lg:w-full">
                        </div>
                        <div class="mt-3 mx-3 flex justify-between">
                            <div>
                                <h3 class="text-sm text-amber-500">
                                    <a :href="`/product/${item.store.slug}/${item.slug}`"  class="font-semibold">
                                        <span aria-hidden="true" class="absolute inset-0"></span>
                                        {{ textSubstr(item.name) }}
                                    </a>
                                </h3>
                            </div>
                        </div>
                        <div class="mx-3 relative">
                            <p class="mt-1 text-sm text-gray-400">Brand: <a class="text-amber-600 underline">{{ item.brand.description }}</a></p>
                            <p class="mt-1 text-sm text-gray-400">Condition: <a class="text-amber-600 underline">{{ item.condition.description }}</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="mt-3 gap-y-10 pb-8 max-w-full">
                <ItemsLoader />
            </div>
            <div v-if="!productItems" class="pb-8">
                <div class="w-full p-3 rounded-md border bg-white shadow-sm h-32 flex items-center justify-center">
                    <h2 class="text-gray-300">No available product to show.</h2>
                </div>
            </div>
    </div>
</div>
</template>
<script>
    import { ref } from 'vue'
    import ItemsLoader from './util/ItemsLoader.vue';
    import axiosClient from '../axios';

    const productItems = ref(null);
    const searchingItem = ref(false);
    const isInvalid = ref(false);

    

    const getProductSuggestion = async (item) => {
        let itemdata = [];
        let resdata = [];
        searchingItem.value = true;

        await axiosClient.get(`/api/v1/products/${item.store}/suggestion`).
            then(response => {
                response.data.map(function(value, key) {
                    if(value.slug !== item.product) {
                        itemdata.push(value);
                    }
                });
                resdata.push(itemdata);
            })
            .catch((errors) => {
                //window.location = '/404-page-not-found';
                isInvalid.value = true;
            });

        searchingItem.value = false;
                    
        return resdata[0];
    }

    export default {
        props: ['store','product'],
        components: { ItemsLoader },
        async setup(props) {
            const resdata = await getProductSuggestion(props);
            productItems.value = resdata;

            return { 
                NoImageUrl: import.meta.env.VITE_NO_IMAGE_URL,
                productItems,
                searchingItem
            }
        },
        methods: {
            textSubstr(text) {
                let new_string = '';
                if(text.length > 18) {
                    new_string = String(text).substring(0,18)+'..';
                } else {
                    new_string = String(text).substring(0,18);
                }
                return new_string;
            }
        }
    }
</script>