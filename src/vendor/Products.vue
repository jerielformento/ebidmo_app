<template>
    <div>
    <h2 class="text-2xl mb-2">Products</h2>
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