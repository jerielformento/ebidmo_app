<template>
    <Modal size="md" @close="cancel" class="absolute top-20 z-50">
      <template #header>
        <div class="flex items-center text-lg text-gray-600 font-bold">
          Image
        </div>
      </template>
      <template #body>
        <div class="text-gray-600">
            <div class="flex">
                Delete selected image?
            </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
            <button @click="cancel" type="button" :disabled="isSubmit" class="flex items-center justify-center rounded-md border disabled:opacity-80 border-gray-200 bg-gray-50 px-4 py-2 text-base font-medium text-slate-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">Close</button>
            <button @click="submit" type="button" :disabled="isSubmit" class="ml-2 flex items-center justify-center rounded-md border disabled:opacity-80 border-transparent bg-slate-900 px-4 py-2 text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">
                Confirm
                <ArrowPathIcon v-if="isSubmit" class="animate-spin h-5 w-5 ml-1"/>
            </button>
        </div>
      </template>
    </Modal>
</template>
<script setup>
    import { ref, onMounted } from 'vue';
    import { Modal } from 'flowbite-vue';
    import { ArrowPathIcon } from '@heroicons/vue/24/outline';
    import axiosClient from '../../axios';
</script>
<script>
    export default {
        props: {
            cancel: Function,
            deleteSubmit: Function,
            id: Number,
            index: Number
        },
        data(props) {
            
            console.log(props.index);
            const isSubmit = ref(false);

            return {
                isSubmit
            }
        },
        methods: {
            async submit() {
                this.isSubmit = true;
                
                await axiosClient.delete('api/v1/products/image/' + this.$props.id)
                    .then(response => {
                        console.log(this.$props.index);
                        this.deleteSubmit(this.$props.index);
                        this.cancel();
                    });
            }
        }
    }
</script>