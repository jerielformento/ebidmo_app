<template>
    <label :for="props.name" class="block text-sm font-medium leading-6">{{ props.label }}</label>
    <div class="relative" v-if="props.type === 'password'">
        <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :class="{ 'ring-2 ring-inset ring-red-500': props.error !== '' }"
            :id="props.name" :name="props.name" :type="inputTypePassword" required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6">
        <button @click.prevent="toggleTypePassword" type="button" tabindex="-1"
            class="absolute right-2.5 bottom-2.5 inline-flex flex-shrink-0 justify-center items-center w-5 h-5 ml-[-1px] px-3 py-1.5 text-sm font-semibold leading-6 text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 rounded-r-sm">
            <EyeIcon v-if="inputTypePassword == 'password'" class="absolute right-0 bottom-0 top-0" />
            <EyeSlashIcon v-else class="absolute right-0 bottom-0 top-0" />
        </button>
    </div>
    <div class="mt-2" v-else-if="props.type === 'group_text'">
        <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <span class="text-sm text-gray-400 font-semibold">{{ props.prefix }}</span>
            </div>
            <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :class="{ 'ring-2 ring-inset ring-red-500': props.error !== '' }" required 
            :id="props.name" :name="props.name" type="text" autocomplete="off"
            class="block w-full rounded-md border-0 pl-12 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6">
        </div>
        <small v-if="props.error !== ''" class="text-red-400">{{ props.error }}</small>
    </div>
    <div class="mt-2" v-else>
        <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :class="{ 'ring-2 ring-inset ring-red-500': props.error !== '' }"
            :required="!props.optional"
            :id="props.name" :name="props.name" :type="props.type" autocomplete="off"
            :placeholder="props.placeholder"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6">
        <small v-if="props.error !== ''" class="text-red-400">{{ props.error }}</small>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
</script>
<script>
export default {
    props: ['label', 'error', 'name', 'type', 'placeholder', 'prefix', 'modelValue', 'optional'],
    data(props) {
        const inputTypePassword = ref("password");

        return {
            props,
            inputTypePassword
        }
    },
    methods: {
        toggleTypePassword() {
            this.inputTypePassword = this.inputTypePassword === "password" ? "text" : "password";
        }
    }
}
</script>