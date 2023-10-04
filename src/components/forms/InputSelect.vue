<template>
    <label :for="this.$props.name" class="block text-sm font-medium leading-6">{{ this.$props.label }}</label>
    <div class="mt-2">
        <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)" :id="this.$props.name" :name="this.$props.name" required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6">
            <option v-for="item in this.$props.list" :value="item.id">{{ item.description }}</option>
        </select>
        <small v-if="this.$props.error !== ''" class="text-red-400">{{ this.$props.error }}</small>
    </div>
</template>
<script>
export default {
    props: ['label', 'name', 'modelValue', 'error', 'list'],
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>