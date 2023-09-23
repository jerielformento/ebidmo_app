<template>
    <button @click="handleClick" :disabled="state" type="button"
        class="flex items-center justify-end rounded-md disabled:opacity-80 bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
        {{ text }}
        <Spinner v-if="state" />
    </button>
</template>
<script>
    import Spinner from './Spinner.vue';

    export default {
        components: { Spinner },
        props: ["text","state"],
        methods: {
            handleClick() {
                this.$emit('onClick');
            }
        }
    }
</script>