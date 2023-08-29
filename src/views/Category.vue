<template>
    <div class="bg-gray-100 w-full h-screen flex flex-col justify-between">
    <HeaderNav/>
    <SearchBar/>
    <Suspense>
        <template #default>
            <div>
            <!-- Listing Panel -->
            <div class="">
                <div>
                    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <section aria-labelledby="products-heading" class="pb-24 pt-6">
                            <h2 id="products-heading" class="sr-only">Products</h2>
                            <div class="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-5 lg:grid-cols-6">
                            <!-- Filters -->
                            <form class="md:h-auto sm:h-auto lg:block">
                                <h3 class="sr-only">Categories</h3>
                                <p class="text-sm font-medium text-gray-900 mb-2">Categories</p>
                                <ul role="list" class="space-y-2 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                    <li class="break-words" :class="filter.category === null ? 'border-2 border-gray-800 bg-amber-400 rounded-md' : 'border-2 border-amber-400 bg-amber-300 rounded-md'">
                                        <a @click="filterCategory(null)" class="px-2 cursor-pointer block">All</a>
                                    </li>
                                    <li v-for="cat in categories" class="break-words" :class="filter.category === cat.id ? 'border-2 border-gray-800 bg-amber-400 rounded-md' : 'border-2 border-amber-400 bg-amber-300 rounded-md'">
                                        <a @click="filterCategory(cat.id)" class="px-2 cursor-pointer block">{{ cat.title }}</a>
                                    </li>
                                </ul>

                                <div class="border-b border-gray-200 py-6">
                                <h3 class="-my-3 flow-root">
                                    <!-- Expand/collapse section button -->
                                    <button type="button" class="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                                    <span class="font-medium text-gray-900">Brands</span>
                                    </button>
                                </h3>
                                <!-- Filter section, show/hide based on section state. -->
                                <div class="pt-6">
                                    <div class="space-y-4">
                                    <div v-for="brand in brands" class="flex items-center min-w-fit">
                                        <input v-if="qbrand === brand.id" checked @click="filterBrand(brand.id)" type="checkbox" :id="`filter-section-${brand.id}`" class="rounded cursor-pointer border-gray-300 text-amber-500 focus:ring-amber-500">
                                        <input v-else @click="filterBrand(brand.id)" type="checkbox" :id="`filter-section-${brand.id}`" class="rounded cursor-pointer border-gray-300 text-amber-500 focus:ring-amber-500">
                                        <label :for="`filter-section-${brand.id}`" class="ml-3 text-sm text-gray-600 break-all cursor-pointer">{{ brand.description }}</label>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </form>

                            <!-- Product grid -->
                            <main class="md:col-span-4 lg:col-span-5">
                                <!-- Your content -->
                                <CategoryList :filter="filter"/>
                            </main>
                            </div>
                        </section>
                    </main>
                </div>
                </div>
                <!-- End of Listing -->
            
            </div>
        </template>
        <template #fallback>
        <div>
        <ItemsLoader/>
        </div>
        </template>
    </Suspense>
    <FooterNav/>
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue';
    import HeaderNav from "./layouts/Header.vue";
    import FooterNav from './layouts/Footer.vue';
    import SearchBar from './layouts/SearchBar.vue';
    import CategoryList from '../components/CategoryList.vue';
    import ItemsLoader from '../components/util/ItemsLoader.vue';
    import axiosClient from '../axios';
    import { useStore } from 'vuex'
    import { computed } from 'vue'
    import { initFlowbite } from 'flowbite'

    const isSort = ref(false);
</script>
<script>
    export default {
        data() {
            const store = useStore();
            const categories = ref(null);
            const brands = ref(null);
            const priceRange = ref(0);
            const filter = ref({
                    category: null,
                    brand: null
                });

            const qcategory = this.$route.query.category ? parseInt(this.$route.query.category) : 0;
            const qbrand = this.$route.query.brand ? parseInt(this.$route.query.brand) : 0;
            
            onMounted(async() => {
                initFlowbite();
                let sel_brand = 0;
                let sel_category = 0;

                await axiosClient.get('/api/util/product/categories').
                    then(response => { 
                        let gb = [];

                        response.data.map(function(value, key) {
                            gb.push({
                                id: value.id,
                                title: value.title,
                                is_active: ((value.id === sel_category) ? true : false)
                            });
                        });
                        categories.value = gb;
                    });

                await axiosClient.get('/api/util/product/brands').
                    then(response => {
                        let gb = [];

                        response.data.map(function(value, key) {
                            gb.push({
                                id: value.id,
                                description: value.description,
                                is_active: ((value.id === sel_brand) ? true : false)
                            });
                        });
                        brands.value = gb;
                    });

                this.filterBrand(qbrand)
                this.filterCategory(qcategory);
            });

            return {
                filter,
                temp_brands: [],
                categories,
                brands,
                user: computed(() => store.state.user),
                price_range: computed(() => priceRange),
                qcategory,
                qbrand
            }
        },
        methods: {
            filterCategory(id) {
                if(id !== 0) {
                    this.filter.category = id;
                }
            },
            filterBrand(id) {
                if(id !== null && id !== 0) {
                    let exist = this.temp_brands.includes(id);
                
                    if(!exist) {
                        this.temp_brands.push(id);
                    } else {
                        let index = this.temp_brands.indexOf(id);
                        this.temp_brands.splice(index, 1);
                    }
                    this.filter.brand = this.temp_brands;
                }
            },
            changePrice() {
                this.price_range.value = parseInt(this.$refs.minmax.value);
            },
            filterPrice() {
                console.log(this.price_range.value);
            }
        }
    }
</script>