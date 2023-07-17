<template>
    <div>
    <Suspense>
         <template #default>
            <div>
            <StoreAuctionList :store="props.store" :search="props.search"/>
            </div>
         </template>
         <template #fallback>
            <div class="mx-auto max-w-2xl px-4 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
                <ItemsLoader/>
            </div>
         </template>
      </Suspense>
    </div>
</template>
<script>
import StoreAuctionList from './StoreAuctionList.vue';
import ItemsLoader from './util/ItemsLoader.vue';

   export default {
        props: ['store', 'search'],
        components: { StoreAuctionList, ItemsLoader },
        setup(props) {
            return { props }
        }
   }
</script>