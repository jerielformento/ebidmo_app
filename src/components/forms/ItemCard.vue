<template>
    <div class="group relative pb-3">
        <!-- <div class="absolute right-1 top-1 z-10 rounded-full cursor-pointer">
            <HeartIcon @click="activeHeart = !activeHeart" class="h-8 w-8" :class="activeHeart ? 'text-red-500' : 'text-gray-300'"/>
        </div> -->
        <div
            class="min-h-50 aspect-h-2 aspect-w-2 w-full overflow-hidden rounded-t-md bg-gray-200 group-hover:opacity-90 lg:h-50">
            <img :src="(item.thumbnail !== null) ? item.thumbnail.url : NoImageUrl" alt=""
                class="border border-gray-100 rounded-t-md w-full object-cover object-center lg:h-full lg:w-full"
                loading="lazy">
        </div>
        <div class="mt-3 px-3 flex justify-between">
            <div>
                <h3 class="text-sm text-amber-500 break-all">
                    <router-link :to="{ name: 'product-details', params: { store: item.store.slug, id: item.slug } }"
                        class="font-semibold">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        {{ textSubstr(item.name) }}
                    </router-link>
                </h3>
            </div>
        </div>
        <div class="mx-3 relative text-sm gap-y-1">
            <p class="block font-semibold text-gray-600">{{ item.store.name }}</p>
            <p class="text-gray-400">Category: <a href="#" class="text-amber-500 underline">{{ item.category.title }}</a>
            </p>
            <p class="text-gray-400">Brand: <a href="#" class="text-amber-500 underline">{{ item.brand.description }}</a>
            </p>
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
                params: { store: item.store.slug, id: item.slug }}" 
                class="flex md:block md:text-center mt-2 items-center rounded-sm bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                View
            </router-link> -->
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
const item = ref();

export default {
    props: ['item'],
    data(props) {
        item.value = props.item;

        return {

        }
    },
    methods: {
        textSubstr(text) {
            let new_string = '';
            if (item.length > 28) {
                new_string = String(text).substring(0, 28) + '..';
            } else {
                new_string = String(text).substring(0, 28);
            }
            return new_string;
        }
    }
}
</script>