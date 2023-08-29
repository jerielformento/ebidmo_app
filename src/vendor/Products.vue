<template>
    <div>
    <Suspense>
         <template #default>
            <div>
            <ProductList/>
         </div>
         </template>
         <template #fallback>
            <ItemsLoader/>
         </template>
      </Suspense>
    </div>
</template>
<script setup>
import ProductList from './ProductList.vue';
import ItemsLoader from './util/ItemsLoader.vue';
</script>
<script>
   export default {
      
   }
</script>