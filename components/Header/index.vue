<script setup lang="ts">
import { navabarlinks } from '@/utils/util'

import { useSidebar } from '#imports'

const isSideOpen = useSidebar()
</script>

<template>
    <header
        class="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:bg-gray-900/80 dark:border-gray-800">
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

            <!-- Left Section: Logo + Sidebar Toggle -->
            <div class="flex items-center gap-4">
                <!-- Sidebar Toggle -->
                <UButton variant="ghost" size="sm" icon="i-lucide-menu" class="lg:hidden" @click="isSideOpen = true" />

                <!-- Logo -->
                <NuxtLink to="/"
                    class="flex items-center gap-2 text-xl font-bold tracking-tight text-primary-600 dark:text-primary-400">
                    <i class="i-lucide-film w-6 h-6" />
                    MovieDB
                </NuxtLink>
            </div>

            <!-- Center Section: Navigation -->
            <nav class="hidden lg:flex items-center gap-6 text-sm font-medium">
                <NuxtLink v-for="link in navabarlinks" :key="link.to" :to="link.to"
                    class="transition-colors hover:text-primary-500" active-class="text-primary-600 font-semibold">
                    {{ link.label }}
                </NuxtLink>
            </nav>

            <!-- Right Section: Actions -->
            <div class="flex items-center gap-3">
                <!-- Theme Toggle -->
                <UButton variant="ghost" size="sm" icon="i-lucide-sun" class="dark:hidden"
                    @click="$colorMode.preference = 'dark'" />
                <UButton variant="ghost" size="sm" icon="i-lucide-moon" class="hidden dark:inline-flex"
                    @click="$colorMode.preference = 'light'" />

                <!-- Profile / Login Button -->
                <UButton to="/login" size="sm" class="hidden sm:inline-flex">
                    Login
                </UButton>

                <!-- Profile / signup Button -->
                <UButton to="/signup" size="sm" variant="outline" class="hidden sm:inline-flex">
                    Signup
                </UButton>
            </div>
        </div>
    </header>
</template>
