<template>
    <div class="bg-gray-100 w-full h-screen flex flex-col justify-between">
    <HeaderNav/>
    <SearchBar/>
    <!-- Listing Panel -->
    <div>
        <div>
            <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <section aria-labelledby="products-heading" class="py-5">
                    <h2 id="products-heading" class="sr-only">Products</h2>
                    <div class="grid grid-cols-1 gap-y-4 gap-x-8 md:grid-cols-5 lg:grid-cols-6">
                    <!-- Filters -->
                    <form class="sm:h-auto md:h-auto lg:block">
                        <!-- <h3 class="sr-only">Filter</h3>                         
                        <label for="minmax" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price Range</label>
                        <span class="text-sm text-gray-600">Starting bid: {{ price_range }}</span>
                        <input ref="minmax" type="range" min="100" max="500" step="100" @input="changePrice" @change="filterPrice" class="w-full bg-gray-300 accent-amber-400 h-2 rounded-lg cursor-pointer dark:bg-gray-700"> -->

                        <h3 class="mb-4 mt-6 flow-root">
                            <!-- Expand/collapse section button -->
                            <button type="button" @click="toggleAuction = !toggleAuction" class="flex w-full items-center justify-between text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                            <span class="font-medium text-gray-900">Filter</span>
                            <div>
                                <ChevronUpIcon class="h-4 w-4" v-if="toggleAuction"/>
                                <ChevronDownIcon class="h-4 w-4" v-if="!toggleAuction"/>
                            </div>
                            </button>
                        </h3>
                        <Transition name="slidedown">
                            <div v-if="toggleAuction">
                                <div class="space-y-4">
                                    <div class="flex items-center min-w-fit">
                                        <input type="radio" @click="filterAuction(null)" id="filter-auction-0" name="filter-auction" value="" class="rounded-full cursor-pointer border-gray-300 text-amber-500 focus:ring-amber-500">
                                        <label for="filter-auction-0" class="ml-3 text-sm text-gray-600 break-all cursor-pointer">All</label>
                                    </div>
                                    <div v-for="atype in auction_types" class="flex items-center min-w-fit">
                                        <input v-if="filter.type === atype.id" checked type="radio" @click="filterAuction(atype.id)" :id="`filter-auction-${atype.id}`" name="filter-auction" :value="atype.id" class="rounded-full cursor-pointer border-gray-300 text-amber-500 focus:ring-amber-500">
                                        <input v-else type="radio" @click="filterAuction(atype.id)" :id="`filter-auction-${atype.id}`" name="filter-auction" :value="atype.id" class="rounded-full cursor-pointer border-gray-300 text-amber-500 focus:ring-amber-500">
                                        <label :for="`filter-auction-${atype.id}`" class="ml-3 text-sm text-gray-600 break-all cursor-pointer">{{ atype.description }}</label>
                                    </div>
                                </div>
                            </div>
                        </Transition>

                        <h3 class="sr-only">Categories</h3>
                        <h3 class="mb-4 mt-6 flow-root">
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
                                        <input @click="filterCategory(cat.id)" type="checkbox" :id="`filter-category-${cat.id}`" class="rounded cursor-pointer border-gray-300 text-amber-500 focus:ring-amber-500">
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
                        <Transition name="slidedown">
                            <div v-if="toggleBrand">
                                <div class="space-y-4">
                                    <div v-for="brand in brands" class="flex items-center min-w-fit">
                                        <input @click="filterBrand(brand.id)" type="checkbox" :id="`filter-brand-${brand.id}`" class="rounded cursor-pointer border-gray-300 text-amber-500 focus:ring-amber-500">
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
                                <AuctionList :filter="filter"/>
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
    </div>
    <FooterNav/>
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue';
    import HeaderNav from "./layouts/Header.vue";
    import FooterNav from './layouts/Footer.vue';
    import SearchBar from './layouts/SearchBar.vue';
    import AuctionList from '../components/AuctionList.vue';
    import ItemsLoader from '../components/util/ItemsLoader.vue';
    import { useStore } from 'vuex'
    import { computed } from 'vue'
    import { initFlowbite } from 'flowbite'
    import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';
    import storeFilter from '../store/filter'
    const toggleAuction = ref(true);
    const toggleCategory = ref(true);
    const toggleBrand = ref(true);
</script>
<script>
    export default {
        data() {
            const store = useStore();
            const auction_types = ref(null);
            const categories = ref(null);
            const brands = ref(null);
            const priceRange = ref(0);
            const filter = ref({
                type: null,
                category: null,
                brand: null
            });

            onMounted(async() => {
                initFlowbite();
                let sel_brand = 0;
                let sel_type = 0;
                let sel_category = 0;

                auction_types.value = await storeFilter.dispatch('auction_types', sel_type);
                categories.value = await storeFilter.dispatch('categories', sel_category);
                brands.value = await storeFilter.dispatch('brands', sel_brand);

                this.filterAuction(1);
            });

            return {
                filter,
                temp_brands: [],
                temp_categories: [],
                auction_types,
                categories,
                brands,
                user: computed(() => store.state.user),
                price_range: computed(() => priceRange)
            }
        },
        methods: {
            filterAuction(id) {
                this.filter.type = id;
            },
            filterCategory(id) {
                let exist = this.temp_categories.includes(id);
                
                if(!exist) {
                    this.temp_categories.push(id);
                } else {
                    let index = this.temp_categories.indexOf(id);
                    this.temp_categories.splice(index, 1);
                }
                this.filter.category = this.temp_categories;
            },
            filterBrand(id) {
                let exist = this.temp_brands.includes(id);
                
                if(!exist) {
                    this.temp_brands.push(id);
                } else {
                    let index = this.temp_brands.indexOf(id);
                    this.temp_brands.splice(index, 1);
                }
                this.filter.brand = this.temp_brands;
            },
            changePrice() {
                this.price_range.value = parseInt(this.$refs.minmax.value);
            },
            filterPrice() {
                console.log(this.price_range.value);
            },
            sliceFilter(filter)
            {
                return filter.charAt(0).toUpperCase()+filter.slice(1);
            }
        }
    }
</script>