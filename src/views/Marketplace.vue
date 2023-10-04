<template>
    <div class="bg-gray-100 w-full h-screen flex flex-col justify-between">
    <HeaderNav/>
    <SearchBar/>
    <!-- Listing Panel -->
    <div>
        <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section aria-labelledby="products-heading" class="pb-24 pt-6">
                <h2 id="products-heading" class="sr-only">Products</h2>
                <div class="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-5 lg:grid-cols-6">
                <!-- Filters -->
                <form class="md:h-auto sm:h-auto lg:block">
                    <h3 class="sr-only">Categories</h3>
                    <h3 class="my-4 flow-root">
                        <!-- Expand/collapse section button -->
                        <button type="button" @click="toggleCategory = !toggleCategory" class="flex w-full items-center justify-between text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                        <span class="font-medium text-gray-900">Categories</span>
                        <div>
                            <ChevronUpIcon class="h-4 w-4" v-if="toggleCategory"/>
                            <ChevronDownIcon class="h-4 w-4" v-if="!toggleCategory"/>
                        </div>
                        </button>
                    </h3>
                    <Transition name="slidedown">
                        <div v-if="toggleCategory">
                            <div class="space-y-4">
                                <div v-for="cat in categories" class="flex items-center min-w-fit">
                                    <input v-if="qcategory === cat.id" checked @click="filterCategory(cat.id)" type="checkbox" :id="`filter-category-${cat.id}`" class="rounded cursor-pointer border-gray-300 text-amber-500 focus:ring-amber-500">
                                    <input v-else @click="filterCategory(cat.id)" type="checkbox" :id="`filter-category-${cat.id}`" class="rounded cursor-pointer border-gray-300 text-amber-500 focus:ring-amber-500">
                                    <label :for="`filter-category-${cat.id}`" class="ml-3 text-sm text-gray-600 break-all cursor-pointer">{{ cat.description }}</label>
                                </div>
                            </div>
                        </div>
                    </Transition>

                    
                    <h3 class="my-4 flow-root">
                        <!-- Expand/collapse section button -->
                        <button type="button" @click="toggleBrand = !toggleBrand" class="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                        <span class="font-medium text-gray-900">Brands</span>
                        <div>
                            <ChevronUpIcon class="h-4 w-4" v-if="toggleBrand"/>
                            <ChevronDownIcon class="h-4 w-4" v-if="!toggleBrand"/>
                        </div>
                        </button>
                    </h3>
                    <!-- Filter section, show/hide based on section state. -->
                    <Transition>
                        <div v-if="toggleBrand">
                            <div class="space-y-4">
                                <div v-for="brand in brands" class="flex items-center min-w-fit">
                                    <input v-if="qbrand === brand.id" checked @click="filterBrand(brand.id)" type="checkbox" :id="`filter-brand-${brand.id}`" class="rounded cursor-pointer border-gray-300 text-amber-500 focus:ring-amber-500">
                                    <input v-else @click="filterBrand(brand.id)" type="checkbox" :id="`filter-brand-${brand.id}`" class="rounded cursor-pointer border-gray-300 text-amber-500 focus:ring-amber-500">
                                    <label :for="`filter-brand-${brand.id}`" class="ml-3 text-sm text-gray-600 break-all cursor-pointer">{{ brand.description }}</label>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </form>
                <!-- Product grid -->
                <main class="md:col-span-4 lg:col-span-5">
                    <!-- Your content -->
                    <Suspense>
                        <template #default>
                            <ItemList :filter="filter"/>
                        </template>
                        <template #fallback>
                            <ItemsLoader/>
                        </template>
                    </Suspense>
                </main>
                </div>
            </section>
        </main>
    </div>
    <!-- End of Listing -->
    <FooterNav/>
    </div>
</template>
<script setup>
    import { ref, onMounted, computed } from 'vue';
    import HeaderNav from "./layouts/Header.vue";
    import FooterNav from './layouts/Footer.vue';
    import SearchBar from './layouts/SearchBar.vue';
    import ItemList from '../components/ItemList.vue';
    import ItemsLoader from '../components/util/ItemsLoader.vue';
    import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';
    import { useStore } from 'vuex'
    import { initFlowbite } from 'flowbite'
    import storeFilter from '../store/filter'
    const toggleCategory = ref(true);
    const toggleBrand = ref(true);
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

                categories.value = await storeFilter.dispatch('categories', sel_category);
                brands.value = await storeFilter.dispatch('brands', sel_brand);

                this.filterBrand(qbrand)
                this.filterCategory(qcategory);
            });

            return {
                filter,
                temp_categories: [],
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
                if(id !== null && id !== 0) {
                    let exist = this.temp_categories.includes(id);
                
                    if(!exist) {
                        this.temp_categories.push(id);
                    } else {
                        let index = this.temp_categories.indexOf(id);
                        this.temp_categories.splice(index, 1);
                    }
                    this.filter.category = this.temp_categories;
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