<script setup lang="ts">
defineProps<{
    movie: {
        id: number
        title: string
        overview: string
        release_date: string
        poster_path: string | null
        vote_average: number
        popularity: number
    }
}>()
</script>

<template>
    <UCard class="overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl dark:bg-gray-900">
        <!-- Poster -->
        <img v-if="movie?.poster_path" :src="`https://image.tmdb.org/t/p/w500${movie?.poster_path}`" :alt="movie?.title"
            class="h-72 w-full object-cover" />

        <!-- Movie Info -->
        <div class="p-4 flex flex-col gap-2">
            <h3 class="text-lg font-semibold leading-tight text-gray-900 dark:text-gray-100">
                {{ movie?.title }}
            </h3>

            <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                {{ movie?.overview }}
            </p>

            <div class="flex items-center justify-between mt-2 text-sm">
                <span class="text-gray-700 dark:text-gray-300">
                    📅 {{ new Date(movie?.release_date).toLocaleDateString() }}
                </span>
                <span
                    class="inline-flex items-center gap-1 rounded-md bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                    ⭐ {{ movie?.vote_average.toFixed(1) }}
                </span>
            </div>
        </div>
    </UCard>
</template>
