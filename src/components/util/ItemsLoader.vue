<template>
    <div class="py-0.5">
        <div class="mx-auto max-w-2xl lg:max-w-7xl">
            <div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4 px-1 pb-8">
                <div v-for="i in 4" :key="i" class="animate-pulse group relative p-3 rounded-md bg-gray-200 shadow-sm">
                    <div class="absolute right-2 top-2 z-10 rounded-full bg-red-600">
                        
                    </div>
                    <div class="min-h-50 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:h-60">
                    <div class="bg-gray-300 h-full w-full lg:h-full lg:w-full"></div>
                    </div>
                    <div class="mt-4 flex justify-between">
                        <div>
                            <h3 class="text-sm text-amber-500">
                            
                            </h3>
                        </div>
                    </div>
                    <div class="relative">
                        <p class="mt-1 text-sm block font-semibold text-gray-600 bg-gray-300 h-4"></p>
                        <p class="mt-1 text-sm text-gray-500 bg-gray-300 h-4"></p>
                        <p class="mt-1 text-sm text-gray-500 bg-gray-300 h-4"></p>    
                    </div>
                </div>
                
            </div>
    </div>
</div>
</template>
<script>
    export default {

    }
</script>