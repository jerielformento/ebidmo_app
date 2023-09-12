<template>
   <section class="mt-5">
       <div class="mx-auto">
           <Suspense>
               <template #default>
                   <TransactionList/>
               </template>
               <template #fallback>
                   <ItemsLoader/>
               </template>
           </Suspense>
       </div>
   </section>
</template>
<script setup>
import { ref } from 'vue';
import TransactionList from './components/TransactionList.vue';
import ItemsLoader from './util/ItemsLoader.vue';
</script>