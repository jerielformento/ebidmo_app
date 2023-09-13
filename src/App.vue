<template>
    <router-view></router-view>
</template>
<script>
    import { computed, reactive } from 'vue'
    import { useHead } from '@vueuse/head'

    export default {
        setup() {
            const siteData = reactive({
                'title': 'eBidMo - Online Auction',
                'description': 'Online Auction in the Philippines'
            })

            useHead({
                title: computed(() => siteData.title),
                meta: [
                    {
                        name: 'description',
                        content: computed(() => siteData.description),
                    }
                ]
            })
        }
    }
</script>
<style>

</style>