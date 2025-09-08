<template>
    <div v-if="moviesStore.isSearchingFavourite">

        <!-- Skeleton State -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 animate-pulse">
            <div v-for="n in 8" :key="n"
                class="flex flex-col rounded-2xl overflow-hidden shadow-md bg-gray-200 dark:bg-gray-800">
                <!-- Poster -->
                <div class="h-60 w-full bg-gray-300 dark:bg-gray-700"></div>

                <!-- Content -->
                <div class="p-4 space-y-3">
                    <div class="h-5 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div class="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div class="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
            </div>
        </div>

        <!-- Optional Spinner Centered -->
        <div class="flex justify-center py-20">
            <UProgress animation="pulse" color="primary" size="xl"
                class="w-24 h-24 rounded-full border-4 border-t-transparent border-primary-500 animate-spin" />
        </div>

    </div>
    <div v-else-if="moviesStore.favouriteMovies?.results?.length"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <MoviesCard v-for="value in moviesStore.favouriteMovies?.results ?? []" :key="value.id" :movie="value"
            class="cursor-pointer transition-transform duration-300 hover:scale-105"
            @click="onGoToMovieDetail(value.id)" />
    </div>

    <!-- Empty State -->
    <div v-else
        class="flex flex-col items-center justify-center py-24 px-6 text-center bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-inner border border-dashed border-gray-300 dark:border-gray-600">
        <!-- Icon -->
        <div
            class="flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6">
            <UIcon name="i-lucide-heart" class="w-10 h-10" />
        </div>

        <!-- Text -->
        <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-200">
            No Favorites Yet ❤️
        </h3>
        <p class="mt-3 max-w-md text-gray-600 dark:text-gray-400">
            Looks like you haven’t added any movies to your favorites. Start exploring
            and save the movies you love!
        </p>

        <!-- CTA -->
        <UButton color="primary" size="lg" icon="i-lucide-plus-circle" class="mt-6" @click="navigateTo('/movies')">
            Browse Movies
        </UButton>
    </div>
</template>

<script setup lang="ts">
const moviesStore = useMoviesStore();
onMounted(moviesStore.getAllFavoriteMovies)
function onGoToMovieDetail(id: number) {
    if (!id) return;
    navigateTo(`/movies/${id}`);
}       
</script>