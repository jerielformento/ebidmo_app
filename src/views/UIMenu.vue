<template>
    <header class="dark:bg-slate-800 text-gray-200 sticky top-0 z-30 shadow-md">
        <p class="flex h-8 items-center justify-center bg-green-600 px-4 text-sm font-medium text-gray-100 sm:px-6 lg:px-8">
            Try eBidMo premium account for only $20</p>
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-2" aria-label="Global">
            <div class="flex lg:flex-1">
                <router-link to="/" class="-m-1.5 p-1.5 inline-flex justify-center items-center">
                    <span class="sr-only">eBidMo</span>
                    <img class="h-8 w-auto" src="http://localhost/images/ebidmo_text.png" alt="eBidMo">
                </router-link>
            </div>
            <div class="flex lg:hidden">
                <button @click="showBurgerMenu = !showBurgerMenu" type="button"
                    class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                    <span class="sr-only">Open main menu</span>
                    <Bars3Icon class="h-6 w-6" />
                </button>
            </div>
            <div class="hidden lg:flex lg:gap-x-10">
                <div class="relative">
                    <button @click.prevent="showSubMenu = !showSubMenu"
                        @blur="!showSubMenuHide ? showSubMenu = false : showSubMenu = true" type="button"
                        class="flex items-center gap-x-1 text-sm font-semibold leading-6 dark:text-gray-400"
                        aria-expanded="false">
                        Auctions
                        <ChevronDownIcon class="h-5 w-5 flex-none text-gray-400" />
                    </button>

                    <!--
            'Product' flyout menu, show/hide based on flyout menu state.
  
            Entering: "transition ease-out duration-200"
              From: "opacity-0 translate-y-1"
              To: "opacity-100 translate-y-0"
            Leaving: "transition ease-in duration-150"
              From: "opacity-100 translate-y-0"
              To: "opacity-0 translate-y-1"
          -->
                    <Transition>
                        <div @mouseover="showSubMenuHide = true" @mouseleave="showSubMenuHide = false" v-if="showSubMenu"
                            id="sub-menu"
                            class="absolute -left-8 top-full z-20 mt-3 w-screen max-w-md overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-gray-900/5">
                            <div class="p-1">
                                <div
                                    class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-orange-50">
                                    <div
                                        class="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-gray-50 group-hover:bg-white">
                                        <FireIcon class="text-red-500" />
                                    </div>
                                    <div class="flex-auto">
                                        <router-link :to="{ name: 'hottest' }" class="block font-semibold text-gray-900">
                                            Hottest Items
                                            <span class="absolute inset-0"></span>
                                        </router-link>
                                        <p class="mt-1 text-gray-600">View all top bid items</p>
                                    </div>
                                </div>
                                <div
                                    class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-orange-50">
                                    <div
                                        class="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-gray-50 group-hover:bg-white">
                                        <StarIcon class="text-yellow-400" />
                                    </div>
                                    <div class="flex-auto">
                                        <router-link :to="{ name: 'popular' }" class="block font-semibold text-gray-900">
                                            Most Popular
                                            <span class="absolute inset-0"></span>
                                        </router-link>
                                        <p class="mt-1 text-gray-600">Top collections review</p>
                                    </div>
                                </div>
                            </div>
                            <!--<div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
              <a href="#" class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                <svg class="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clip-rule="evenodd" />
                </svg>
                Watch demo
              </a>
              <a href="#" class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                <svg class="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clip-rule="evenodd" />
                </svg>
                Contact sales
              </a>
            </div>-->
                        </div>
                    </Transition>
                </div>

                <router-link :to="{ name: 'category' }"
                    class="text-sm font-semibold leading-6 dark:text-gray-400">Categories</router-link>
                <router-link :to="{ name: 'vendors' }"
                    class="text-sm font-semibold leading-6 dark:text-gray-400">Vendors</router-link>
                <router-link :to="{ name: 'sell' }"
                    class="text-sm font-semibold leading-6 dark:text-gray-400">Sell</router-link>
                <router-link :to="{ name: 'support' }"
                    class="text-sm font-semibold leading-6 dark:text-gray-400">Support</router-link>
            </div>
            <div v-if="store.state.user.token" class="hidden lg:flex lg:flex-1 lg:justify-end space-x-0 items-center">
                <!-- <router-link :to="{ name: 'vendor-home' }" class="text-white rounded-md px-2 py-2 text-sm font-medium"
                    aria-current="page" x-state:on="Current" x-state:off="Default"
                    x-state-description="Current: &quot;bg-gray-900 text-white&quot;, Default: &quot;text-gray-300 hover:bg-gray-700 hover:text-white&quot;">
                    <BuildingStorefrontIcon class="h-6 w-6 dark:text-gray-400" />
                </router-link> -->
                <a href="#" @click="showCartMenu = !showCartMenu"
                    class="relative inline-flex items-center text-white rounded-md px-2 py-2 text-sm font-medium"
                    aria-current="page" x-state:on="Current" x-state:off="Default"
                    x-state-description="Current: &quot;bg-gray-900 text-white&quot;, Default: &quot;text-gray-300 hover:bg-gray-700 hover:text-white&quot;">
                    <ShoppingBagIcon class="h-6 w-6 dark:text-gray-400" />
                    <div
                        class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border border-white rounded-full -top-1 -right-1 dark:border-gray-900">
                        2</div>
                </a>
                <a href="#" class="relative inline-flex items-center text-white rounded-md px-2 py-2 text-sm font-medium"
                    aria-current="page" x-state:on="Current" x-state:off="Default"
                    x-state-description="Current: &quot;bg-gray-900 text-white&quot;, Default: &quot;text-gray-300 hover:bg-gray-700 hover:text-white&quot;">
                    <BellIcon class="h-6 w-6 dark:text-gray-400" />
                </a>

                <div class="flex items-center">
                    <!-- Profile dropdown -->
                    <div class="relative">
                        <div>
                            <!-- <button @click="showProfile = !showProfile" type="button" class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span class="sr-only">Open user menu</span>
                  < class="h-8 w-8 rounded-full" />
                </button> -->

                            <a href="#" @click.prevent="showProfile = !showProfile"
                                @blur="!showSubMenuHide ? showProfile = false : showProfile = true"
                                class="relative inline-flex items-center text-white rounded-md px-2 py-2 text-sm font-medium"
                                aria-current="page" x-state:on="Current" x-state:off="Default"
                                x-state-description="Current: &quot;bg-gray-900 text-white&quot;, Default: &quot;text-gray-300 hover:bg-gray-700 hover:text-white&quot;">
                                <UserCircleIcon class="h-6 w-6 dark:text-gray-400" />
                                <span class="ml-2 text-gray-400">{{ JSON.parse(store.state.user.data).firstname }}</span>
                            </a>
                        </div>

                        <!--
                Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              -->
                        <Transition>
                            <div @mouseover="showSubMenuHide = true" @mouseleave="showSubMenuHide = false"
                                v-if="showProfile"
                                class="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                                <!-- Active: "bg-gray-100", Not Active: "" -->
                                <router-link :to="{ name: 'vendor-home' }"
                                    class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100" role="menuitem"
                                    tabindex="-1" id="user-menu-item-0">My Store</router-link>
                                <router-link :to="{ name: 'profile' }"
                                    class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100" role="menuitem"
                                    tabindex="-1" id="user-menu-item-0">Profile</router-link>
                                <router-link :to="{ name: 'settings' }"
                                    class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100" role="menuitem"
                                    tabindex="-1" id="user-menu-item-1">Settings</router-link>
                                <a href="#" @click="logout" class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100"
                                    role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
            <div v-else class="hidden lg:flex lg:flex-1 lg:justify-end space-x-5 items-center">
                <router-link :to="{ name: 'login' }"
                    class="text-sm font-semibold leading-6 dark:text-gray-400">Login</router-link>
                <router-link :to="{ name: 'register' }"
                    class="text-sm font-semibold leading-6 dark:text-gray-400">Sign Up</router-link>
            </div>
        </nav>

        <!-- Mobile menu, show/hide based on menu open state. -->
        <Transition>
            <div v-if="showBurgerMenu" class="lg:hidden relative z-10" role="dialog" aria-modal="true">
                <!-- Background backdrop, show/hide based on slide-over state. -->
                <div class="fixed inset-0 z-10"></div>
                <div
                    class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div class="flex items-center justify-between">
                        <a href="#" class="-m-1.5 p-1.5">
                            <span class="sr-only">Your Company</span>
                            <h2 class="font-semibold text-2xl text-gray-800">Menu</h2>
                        </a>
                        <button @click="showBurgerMenu = false" type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
                            <span class="sr-only">Close menu</span>
                            <XMarkIcon class="h-6 w-6" />
                        </button>
                    </div>
                    <div class="mt-6 flow-root">
                        <div class="-my-6 divide-y divide-gray-500/10">
                            <div class="space-y-2 py-6">
                                <div class="-mx-3">
                                    <button type="button"
                                        class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        aria-controls="disclosure-1" aria-expanded="false">
                                        Auctions
                                        <!--
                  Expand/collapse icon, toggle classes based on menu open state.

                  Open: "rotate-180", Closed: ""
                -->
                                        <ChevronDownIcon class="h-5 w-5 flex-none" />
                                    </button>
                                    <!-- 'Product' sub-menu, show/hide based on menu state. -->
                                    <div class="mt-2 space-y-2" id="disclosure-1">
                                        <router-link :to="{ name: 'hottest' }"
                                            class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Hottest
                                            Items</router-link>
                                        <router-link :to="{ name: 'popular' }"
                                            class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Most
                                            Popular</router-link>
                                    </div>
                                </div>
                                <router-link :to="{ name: 'category' }"
                                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Categories</router-link>
                                <router-link :to="{ name: 'vendors' }"
                                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Vendors</router-link>
                                <router-link :to="{ name: 'sell' }"
                                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Sell</router-link>
                                <router-link :to="{ name: 'support' }"
                                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Support</router-link>
                            </div>
                            <div class="py-6">
                                <router-link :to="{ name: 'vendor' }"
                                    class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Your
                                    Store</router-link>
                                <a href="#"
                                    class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Cart</a>
                                <router-link :to="{ name: 'profile' }"
                                    class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Your
                                    Profile</router-link>
                                <router-link :to="{ name: 'settings' }"
                                    class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Settings</router-link>
                                <a href="#" @click="logout"
                                    class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Sign
                                    out</a>
                                <!-- <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a>
            <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Create Account</a> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
        <!-- end mobile -->

        <!-- Mobile menu, show/hide based on menu open state. -->
        <div class="hidden" role="dialog" aria-modal="true">
            <!-- Background backdrop, show/hide based on slide-over state. -->
            <div class="fixed inset-0 z-10"></div>
            <div
                class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div class="flex items-center justify-between">
                    <a href="#" class="-m-1.5 p-1.5">
                        <span class="sr-only">Your Company</span>
                        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="">
                    </a>
                    <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
                        <span class="sr-only">Close menu</span>
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-gray-500/10">
                        <div class="space-y-2 py-6">
                            <div class="-mx-3">
                                <button type="button"
                                    class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    aria-controls="disclosure-1" aria-expanded="false">
                                    Product
                                    <!--
                    Expand/collapse icon, toggle classes based on menu open state.
  
                    Open: "rotate-180", Closed: ""
                  -->
                                    <svg class="h-5 w-5 flex-none" viewBox="0 0 20 20" fill="currentColor"
                                        aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <!-- 'Product' sub-menu, show/hide based on menu state. -->
                                <div class="mt-2 space-y-2" id="disclosure-1">
                                    <a href="#"
                                        class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Analytics</a>
                                    <a href="#"
                                        class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Engagement</a>
                                    <a href="#"
                                        class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Security</a>
                                    <a href="#"
                                        class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Integrations</a>
                                    <a href="#"
                                        class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Automations</a>
                                    <a href="#"
                                        class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Watch
                                        demo</a>
                                    <a href="#"
                                        class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Contact
                                        sales</a>
                                </div>
                            </div>
                            <a href="#"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</a>
                            <a href="#"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Vendor</a>
                            <a href="#"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Company</a>
                        </div>
                        <div class="py-6">
                            <a href="#"
                                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log
                                in</a>
                            <a href="#"
                                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Sign
                                up</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- search -->
    <div class="bg-white py-5 border-b border-gray-200">
        <div class="mx-auto max-w-2xl px-4 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-16">
            <label for="hs-trailing-button-add-on-with-icon" class="sr-only">Label</label>
            <div class="flex rounded-md shadow-sm relative">
                <input @keyup.enter="searchProduct" @keyup="searchKey" ref="itemSearch" type="text"
                    id="hs-trailing-button-add-on-with-icon" placeholder="Search in eBidMo"
                    name="hs-trailing-button-add-on-with-icon"
                    class="py-3 px-4 block w-full border-gray-200 placeholder:text-gray-400 shadow-sm rounded-sm text-sm focus:z-10 focus:border-amber-400 focus:ring-amber-400 dark:border-gray-100 text-gray-500">
                <button @click="searchProduct" type="button"
                    class="inline-flex flex-shrink-0 justify-center items-center h-[2.875rem] w-[2.875rem] bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 rounded-r-sm">
                    <MagnifyingGlassIcon class="h-6 w-6" />
                </button>
                <div class="absolute w-full z-10 top-10 mt-1 rounded-b-md border border-gray-200 shadow-md">
                    <div v-if="!this.searching" v-for="item in this.search"
                        class="group w-full inline-block bg-white py-1 px-4 hover:bg-gray-50 cursor-pointer">
                        <router-link :to="{ name: 'product-details', params: { store: item.store.slug, id: item.slug } }"
                            class="text-amber-500 bg-gray-500">
                            <div class="w-full">{{ item.name }} <span class="text-xs text-gray-400">{{
                                item.brand.description }}</span>
                            </div>
                        </router-link>
                    </div>
                    <div v-else class="group w-full inline-block bg-white py-1 px-4 hover:bg-gray-50 cursor-pointer">
                        <div class="w-full flex justify-center items-center p-1">
                            <ArrowPathIcon class="animate-spin text-gray-400 h-4 w-4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Transition>
        <div v-if="showCartMenu" class="relative z-40" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <div class="pointer-events-auto w-screen max-w-md z-20">
                            <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div class="flex items-start justify-between">
                                        <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart
                                        </h2>
                                        <div class="ml-3 flex h-7 items-center">
                                            <button @click="showCartMenu = false" type="button"
                                                class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                                <span class="sr-only">Close panel</span>
                                                <XMarkIcon class="h-6 w-6" />
                                            </button>
                                        </div>
                                    </div>

                                    <div class="mt-8">
                                        <div class="flow-root">
                                            <ul role="list" class="-my-6 divide-y divide-gray-200">
                                                <li class="flex py-6">
                                                    <div
                                                        class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        <img src="http://localhost/images/ds.jpg"
                                                            alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                                            class="h-full w-full object-cover object-center">
                                                    </div>
                                                    <div class="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div
                                                                class="flex justify-between text-base font-medium text-gray-900">
                                                                <h3>
                                                                    <a href="#">Demon Slayer</a>
                                                                </h3>
                                                                <p class="ml-4">$90.00</p>
                                                            </div>
                                                            <p class="mt-1 text-sm text-gray-500">Collectibles</p>
                                                        </div>
                                                        <div class="flex flex-1 items-end justify-between text-sm">
                                                            <p class="text-gray-500">Qty 1</p>

                                                            <div class="flex">
                                                                <button type="button"
                                                                    class="font-medium text-orange-400 hover:text-orange-500">Remove</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="flex py-6">
                                                    <div
                                                        class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        <img src="http://localhost/images/zoro.jpg"
                                                            alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                                                            class="h-full w-full object-cover object-center">
                                                    </div>

                                                    <div class="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div
                                                                class="flex justify-between text-base font-medium text-gray-900">
                                                                <h3>
                                                                    <a href="#">Zoro One Piece</a>
                                                                </h3>
                                                                <p class="ml-4">$120.00</p>
                                                            </div>
                                                            <p class="mt-1 text-sm text-gray-500">Collectibles</p>
                                                        </div>
                                                        <div class="flex flex-1 items-end justify-between text-sm">
                                                            <p class="text-gray-500">Qty 1</p>

                                                            <div class="flex">
                                                                <button type="button"
                                                                    class="font-medium text-orange-400 hover:text-orange-500">Remove</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <!-- More products... -->
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div class="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>$210.00</p>
                                    </div>
                                    <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                    <div class="mt-6">
                                        <a href="#"
                                            class="flex items-center justify-center rounded border border-transparent bg-slate-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-950">Checkout</a>
                                    </div>
                                    <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <p>
                                            or
                                            <button type="button" class="font-medium text-orange-400 hover:text-orange-500">
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>
<script setup>
import { ref } from 'vue'
import axiosClient from '../axios';
import router from '../router';
import store from '../store';
import {
    Bars3Icon,
    ChevronDownIcon,
    FireIcon,
    StarIcon,
    BuildingStorefrontIcon,
    ShoppingBagIcon,
    XMarkIcon,
    UserCircleIcon,
    MagnifyingGlassIcon,
    ArrowPathIcon,
    BellIcon
} from "@heroicons/vue/24/outline";

const showSubMenu = ref(false)
const showCartMenu = ref(false)
const showBurgerMenu = ref(false)
const showProfile = ref(false)
const showSubMenuHide = ref(false);

</script>
<script>
export default {
    data() {
        const searchItems = ref(null);

        return {
            search: searchItems.value,
            searching: false
        }
    },
    methods: {
        async logout() {
            await store.dispatch('csrf');
            await store.dispatch('logout');

            this.$router.go();
        },
        searchProduct() {
            console.log("ok");
            this.searching = true;
            const key = this.$refs.itemSearch.value;

            if (key !== '' && key.length > 2) {
                axiosClient.get('/api/v1/product/search/' + key)
                    .then(response => {
                        this.search = response.data;
                        this.searching = false;
                    })
                    .catch((errors) => {
                        this.searching = false;
                    });
            } else {
                this.searching = false;
                this.search = null;
            }
        },
        searchKey() {
            const key = this.$refs.itemSearch.value;
            if (key.length === 0) {
                this.search = null;
            }
        }
    }
}
</script>