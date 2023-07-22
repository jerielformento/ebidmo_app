<template>
    <button @click="showModal" type="button" class="flex w-full items-center justify-center rounded-sm border border-transparent bg-slate-900 px-8 py-3 text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">{{ props.name }}</button>
    <Modal size="md" v-if="isShowModal" @close="closeModal" class="absolute top-20 z-50">
      <template #header>
        <div class="flex items-center text-lg font-semibold text-gray-700">
          Guest
        </div>
      </template>
      <template #body>
        <div class="text-gray-600">
            <div class="flex justify-center">
                <div class="sm:col-span-4">
                    <label class="block text-xl leading-6">Already have an account?</label>
                </div>
            </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
            <router-link 
                :to="{name: 'register'}" 
                class="ml-2 flex items-center justify-center w-full rounded-sm border disabled:opacity-80 border-transparent bg-slate-900 px-4 py-2 text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">
                Register
            </router-link>
            <router-link 
                :to="{name: 'login'}" 
                class="ml-2 flex items-center justify-center w-full rounded-sm border disabled:opacity-80 border-transparent bg-slate-900 px-4 py-2 text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">
                Login
            </router-link>
        </div>
      </template>
    </Modal>
</template>
<script setup>
import { Modal } from 'flowbite-vue';
import { ref } from 'vue';
</script>
<script>
export default {
    props: ['name'],
    data(props) {
        const isShowModal = ref(false);
        
        return {
            props,
            isShowModal
        }
    },
    methods: {
        closeModal() {
            this.isShowModal = false
        },
        showModal() {
            this.isShowModal = true
        }
    }
}
</script>