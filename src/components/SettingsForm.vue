<template>

    <div class="bg-gray-100 py-10">
        <main class="p-5">
        <div class="container lg:w-2/3 xl:w-2/3 mx-auto">
            <div class="grid grid-cols-1 sm:grid-cols-5 items-start gap-6">

            <div class="col-span-3 bg-white p-4 rounded-md shadow" v-if="!isLoading">
                <div class="flex items-center">
                    <span class="mr-1 text-lg inline-block font-bold">Account Information</span>
                </div>
                <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                        <label for="name" class="block text-sm font-medium leading-6">First Name</label>
                        <div class="mt-2">
                            <!-- <input v-model="postdata.first_name" id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                            <small class="text-red-400"></small> -->
                            <span class="text-gray-600">{{ postdata.first_name }}</span>
                        </div>
                    </div>
                    <div class="sm:col-span-3">
                        <label for="name" class="block text-sm font-medium leading-6">Last Name</label>
                        <div class="mt-2">
                            <!-- <input id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                            <small class="text-red-400"></small> -->
                            <span class="text-gray-600">{{ postdata.last_name }}</span>
                        </div>
                    </div>
                    <div class="sm:col-span-3">
                        <label for="name" class="block text-sm font-medium leading-6">Middle Name</label>
                        <div class="mt-2">
                            <!-- <input id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                            <small class="text-red-400"></small> -->
                            <span class="text-gray-600">{{ postdata.middle_name }}</span>
                        </div>
                    </div>
                    <div class="sm:col-span-3">
                        <label for="name" class="block text-sm font-medium leading-6">Phone</label>
                        <div class="mt-2">
                            <!-- <input id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                            <small class="text-red-400"></small> -->
                            <span class="text-gray-600">{{ postdata.phone }}</span>
                        </div>
                    </div>
                    <div class="sm:col-span-6">
                        <label for="name" class="block text-sm font-medium leading-6">Email</label>
                        <div class="mt-2">
                            <!-- <input id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                            <small class="text-red-400"></small> -->
                            <span class="text-gray-600">{{ postdata.email }}</span>
                        </div>
                    </div>
                    <div class="sm:col-span-6">
                        <label for="name" class="block text-sm font-medium leading-6">Username</label>
                        <div class="mt-2">
                            <!-- <input id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                            <small class="text-red-400"></small> -->
                            <span class="text-gray-600">{{ postdata.username }}</span>
                        </div>
                    </div>

                    <div class="sm:col-span-6 flex justify-end">
                        <!-- <button type="submit" class="mt-3 mr-2 flex items-center justify-center border border-gray-200 rounded-md disabled:opacity-80 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200">
                            Cancel
                        </button> -->
                        <!-- <button type="submit" class="mt-3 flex items-center justify-center rounded-md disabled:opacity-80 bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                            Submit Verification
                        </button> -->
                    </div>
                </div>
            </div>

            <div class="col-span-2 bg-white p-4 rounded-md shadow">
                <div class="flex items-center">
                    <span class="mr-1 text-lg inline-block font-bold">Security</span>
                </div>
                <div class="mt-5 p-4 border border-gray-200 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
                    role="alert">
                    <div class="text-sm text-gray-400 dark:text-gray-300">
                        No options available at this moment.
                    </div>
                </div>
                <!-- <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                    <div class="sm:col-span-6">
                        <label for="name" class="block text-sm font-medium leading-6">Current Password</label>
                        <div class="mt-2">
                            <input id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                            <small class="text-red-400"></small>
                        </div>
                    </div>
                    <div class="sm:col-span-6">
                        <label for="name" class="block text-sm font-medium leading-6">New Password</label>
                        <div class="mt-2">
                            <input id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                            <small class="text-red-400"></small>
                        </div>
                    </div>
                    <div class="sm:col-span-6">
                        <label for="name" class="block text-sm font-medium leading-6">Confirm New Password</label>
                        <div class="mt-2">
                            <input id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                            <small class="text-red-400"></small>
                        </div>
                    </div>

                    <div class="sm:col-span-6 flex justify-end">
                        <button type="submit" class="mt-3 flex items-center justify-center rounded-md disabled:opacity-80 bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                            Update Password
                        </button>
                    </div>
                </div> -->
            </div>
            </div>
        </div>
        </main>
    </div>

</template>
<script>
import { ref } from 'vue';
import axiosClient from '../axios';
const isLoading = ref(true);

const getAccountInfo = async () => {
    let resdata = [];

    await axiosClient.get('/api/v1/customer')
        .then(response => {
            resdata = response.data;
            isLoading.value = false;
        }); 
        
    return resdata;
}

export default {
    async setup() {
        const accInfo = ref({}); 
        const result = await getAccountInfo();

        return {
            postdata: {
                first_name: result.profile.first_name ?? '',
                last_name: result.profile.last_name ?? '',
                middle_name: result.profile.middle_name ?? '',
                phone: result.profile.phone ?? '',
                email: result.profile.email ?? '',
                username: result.username ?? '',
            },
            isLoading
        }
    }
}
</script>