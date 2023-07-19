<template>
    <div class="bg-gray-100 h-screen flex flex-col justify-between">
    <HeaderNav/>
    <div class="bg-gray-100 py-10">
        <main class="p-5">
        <div class="container lg:w-2/3 xl:w-2/3 mx-auto">
            <div class="grid grid-cols-1 sm:grid-cols-5 items-start gap-6">
            <div class="col-span-3 bg-white p-4 rounded-sm shadow">
                <div class="flex items-center">
                    <span class="mr-1 text-lg inline-block font-bold">Your Profile</span>
                </div>
                <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                        <label for="name" class="block text-sm font-medium leading-6">First Name</label>
                        <div class="mt-2">
                            <input id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                            <small class="text-red-400"></small>
                        </div>
                    </div>
                    <div class="sm:col-span-3">
                        <label for="name" class="block text-sm font-medium leading-6">Last Name</label>
                        <div class="mt-2">
                            <input id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                            <small class="text-red-400"></small>
                        </div>
                    </div>
                    <div class="sm:col-span-3">
                        <label for="name" class="block text-sm font-medium leading-6">Middle Name</label>
                        <div class="mt-2">
                            <input id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                            <small class="text-red-400"></small>
                        </div>
                    </div>
                    <div class="sm:col-span-3">
                        <label for="name" class="block text-sm font-medium leading-6">Phone</label>
                        <div class="mt-2">
                            <input id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                            <small class="text-red-400"></small>
                        </div>
                    </div>
                    <div class="sm:col-span-6">
                        <label for="name" class="block text-sm font-medium leading-6">Email</label>
                        <div class="mt-2">
                            <input id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                            <small class="text-red-400"></small>
                        </div>
                    </div>
                    <div class="sm:col-span-6">
                        <label for="name" class="block text-sm font-medium leading-6">Username</label>
                        <div class="mt-2">
                            <input id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                            <small class="text-red-400"></small>
                        </div>
                    </div>

                    <div class="sm:col-span-6 flex justify-end">
                        <!-- <button type="submit" class="mt-3 mr-2 flex items-center justify-center border border-gray-200 rounded-sm disabled:opacity-80 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200">
                            Cancel
                        </button> -->
                        <button type="submit" class="mt-3 flex items-center justify-center rounded-sm disabled:opacity-80 bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>

            <div class="col-span-2 bg-white p-4 rounded-sm shadow">
                <div class="flex items-center">
                    <span class="mr-1 text-lg inline-block font-bold">Vendor Information</span>
                </div>
                <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                    <div class="sm:col-span-6">
                        <label for="name" class="block text-sm font-medium leading-6">Store Name</label>
                        <div class="mt-2">
                            <input id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                            <small class="text-red-400"></small>
                        </div>
                    </div>

                    <div class="sm:col-span-6 flex justify-end">
                        <button type="submit" class="mt-3 flex items-center justify-center rounded-sm disabled:opacity-80 bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                            Update Store
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </main>
    </div>
    <FooterNav/>
    </div>
</template>
<script setup>
    import HeaderNav from './layouts/Header.vue';
    import FooterNav from './layouts/Footer.vue';
</script>
<script>
    export default {
        data() {

        }
    }
</script>