<template>
      <div>
    <h2 class="text-2xl mb-2">Auction</h2>
      <Suspense>
         <template #default>
            <div>
            <AuctionList/>
         </div>
         </template>
         <template #fallback>
            <ItemsLoader/>
         </template>
      </Suspense>
    </div>
</template>
<script setup>
import AuctionList from './AuctionList.vue';
import ItemsLoader from './util/ItemsLoader.vue';
</script>
<script>
   export default {
      
   }
</script>