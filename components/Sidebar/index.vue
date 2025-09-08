<script setup lang="ts">
import { navabarlinks } from '@/utils/util'
const isSideOpen = useSidebar();
defineShortcuts({
    shift_l: () => isSideOpen.value = !isSideOpen.value
})


</script>

<template>

    <USlideover :ui="{
        body: 'flex-1 overflow-y-auto !p-0',
    }
        " side="left" v-model:open="isSideOpen" class="max-w-60" title="Movie DB Menu bar"
        close-icon="i-lucide-arrow-left">

        <template #body>
            <div class="flex flex-col items-start justify-start gap-y-2 px-2 w-full">
                <NuxtLink v-for="link in navabarlinks" :key="link.to" :to="link.to" class="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-base font-medium 
             text-gray-700 hover:bg-gray-100 hover:text-primary-600
             dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-primary-400 
             transition-colors">
                    <UIcon :name="link.icon" class="size-5" />
                    {{ link.label }}
                </NuxtLink>
            </div>
        </template>

    </USlideover>
</template>
