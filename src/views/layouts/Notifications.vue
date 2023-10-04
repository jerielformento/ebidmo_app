<template>
    <button id="dropdownNotificationButton" data-dropdown-toggle="dropdownNotification"
        class="inline-flex items-center text-sm px-2 font-medium text-center text-gray-400 hover:text-gray-100 focus:outline-none dark:hover:text-white dark:text-gray-400"
        type="button">
        <BellIcon class="h-5 w-5" />
        <div class="relative flex">
            <div
                :class="hasNotification ? 'bg-red-500' : ''"
                class="relative inline-flex w-3 h-3 border-2 bg-gray-400 border-white rounded-full -top-2 right-3 dark:border-gray-900">
            </div>
        </div>
    </button>
    <!-- Dropdown menu -->
    <div id="dropdownNotification"
        class="z-20 hidden w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
        aria-labelledby="dropdownNotificationButton">
        <div
            class="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
            Notifications
        </div>
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
            <a v-if="notifications.length !== 0" @click.prevent="readNotification(notification.id, notification.redirect_url, notification.read)" href="#" v-for="notification in notifications" class="flex px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div class="flex-shrink-0">
                    <!-- <EnvelopeIcon v-if="notification.read === 0" class="rounded-md w-8 h-8 text-amber-400"/>
                    <EnvelopeOpenIcon v-else class="rounded-md w-8 h-8 text-gray-300"/> -->
                    <img class="rounded-md w-11 h-11" :src="notification.thumbnail_url" alt="Jese image">
                </div>
                <div class="w-full pl-3">
                    <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                        <div class="flex justify-between items-center">
                        <p v-if="notification.read === 0" class="font-bold text-gray-700">{{ notification.title }}</p>
                        <p v-else class="font-semibold text-gray-400">{{ notification.title }}</p>
                        <div class="text-xs text-gray-400 dark:text-gray-400">{{ moment(notification.created_at).format("lll") }}</div>
                        </div>
                        <span class="">{{ notification.description }}</span>
                    </div>
                </div>
            </a>
            <div v-else class="flex px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div class="w-full">
                    <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                        <span class="">No available message</span>
                    </div>
                </div>
            </div>
        </div>
    <!-- <a href="#"
        class="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
        <div class="inline-flex items-center ">
            <svg class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                <path
                    d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            View all
        </div>
    </a> -->
</div></template>
<script setup>
import { ref, onMounted } from 'vue';
import axiosClient from '../../axios';
import moment from 'moment';
import { BellIcon, EnvelopeIcon, EnvelopeOpenIcon, InboxArrowDownIcon } from '@heroicons/vue/24/solid';
import { toast } from 'vue3-toastify';
</script>
<script>
export default {
    data() {
        const notifications = ref({});
        const polling = ref(null);
        const hasNotification = ref(false);
        const retry = ref(0);

        onMounted(async () => {
            await axiosClient.get('/api/v1/customer/notifications/list')
            .then(response => {
                hasNotification.value = false;
                notifications.value = response.data;

                // check if has unread message
                Object.entries(response.data).forEach(entry => {
                    const [key, value] = entry;
                    if(value.read === 0) {
                        hasNotification.value = true;
                    }
                });
            });
        });

        polling.value = setInterval(async() => {
            console.log("notifications...");

            await axiosClient.get('/api/v1/customer/notifications/list')
            .then(response => {
                retry.value = 0;
                hasNotification.value = false;
                notifications.value = response.data;

                // check if has unread message
                Object.entries(response.data).forEach(entry => {
                    const [key, value] = entry;
                    if(value.read === 0) {
                        hasNotification.value = true;
                    }
                });
            })
            .catch((error) => {
                if(retry.value === 1) {
                    this.clearPolling();
                } else {
                    retry.value = 1;
                }
            });
        }, 10000);
        
        return {
            notifications,
            hasNotification,
            moment,
            polling
        }
    },
    methods: {
        readNotification(id, url, read) {
            if(read === 0) {
                axiosClient.put('/api/v1/customer/notifications/read/'+id)
                .then(response => {
                    window.location.href = url;
                });
            } else {
                window.location.href = url;
            }
        },
        clearPolling() {
            console.log("clear 1");
            clearInterval(this.polling);
        }
    },
    beforeUnmount() {
        console.log("leave notifications...");
        this.retry = 0;
        clearInterval(this.polling);
    },
}
</script>