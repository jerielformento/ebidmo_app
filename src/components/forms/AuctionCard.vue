<template>
    <div class="group relative pb-3">
        <div class="absolute right-2 top-2 z-10 rounded-full">
            <span :class="useAuctionColorCode(item.status)"
                class="text-white text-xs font-semibold rounded-sm py-1 px-2 bg-opacity-80">{{ useAuctionStatus(item.status) }}</span>
        </div>
        <div class="min-h-50 aspect-h-2 aspect-w-2 w-full overflow-hidden rounded-t-md bg-gray-200 group-hover:opacity-90 lg:h-50">
            <img :src="(item.product.thumbnail !== null) ? item.product.thumbnail.url : NoImageUrl" alt="" class="border border-gray-100 rounded-t-md w-full object-cover object-center lg:h-full lg:w-full">
        </div>
        <div class="mt-3 mx-3 flex justify-between">
            <div>
                <h3 class="text-sm text-amber-500 break-all">
                <router-link :to="{name: 'auction-details', params: { store: item.product.store.slug, id: item.product.slug }}" class="font-semibold">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    {{ textSubstr(item.product.name) }}
                </router-link>
                </h3>
            </div>
        </div>
        <div class="relative mx-3">
            <p class="mt-1 text-sm block font-semibold text-gray-700">{{ item.product.store.name }}</p>
            <p class="mt-1 text-sm text-gray-400">Starting bid: <span class="text-green-500">{{ item.product.currency.prefix+item.min_price.toLocaleString() }}</span></p>
            <p class="mt-1 text-sm text-gray-400" v-if="item.type === 1 && item.status == 2">Starts in</p>   
            <p class="mt-1 text-sm text-gray-400" v-else-if="item.type === 2">Participants: {{ item.min_participants }}/{{ item.participants_count }}</p>   
            <p class="mt-1 text-sm text-gray-400" v-if="item.status == 1">Ending in</p>   
        </div>
        <div class="text-2xl mx-3 text-gray-500 flex justify-between lg:justify-between lg:flex md:block md:justify-stretch items-center relative">
            <p class="pt-2 md:py-2 text-sm font-semibold text-red-500">
                {{ checkTimerExpiration(timer) }}
            </p>
        </div>
    </div>
</template>
<script>
    import { ref } from 'vue';
    import { useAuctionColorCode } from '../../composables/useAuctionColorCode';
    import { useAuctionStatus } from '../../composables/useAuctionStatus';
    const item = ref();
    const timer = ref();
    const endedAuction = ref(false);

    export default {
        props: ['item', 'timer'],
        components: { useAuctionColorCode, useAuctionStatus },
        data(props) {
            
            return {
                endedAuction,
                useAuctionColorCode,
                useAuctionStatus
            }
        },
        methods: {
            textSubstr(text) {
                let new_string = '';
                if(text.length > 20) {
                    new_string = String(text).substring(0,20)+'..';
                } else {
                    new_string = String(text).substring(0,20);
                }
                return new_string;
            },
            checkTimerExpiration(time) {
                if(time.days < 0 || time.hours < 0 || time.minutes < 0 || time.seconds < 0) {
                    endedAuction.value = true;
                    return 'Ended';
                } else {
                    return time.days + 'd ' + time.hours + 'h ' + time.minutes + 'm ' + time.seconds + 's';
                }
            }
        },
        beforeUnmount() {
            console.log("leave...");
        },
    }
</script>