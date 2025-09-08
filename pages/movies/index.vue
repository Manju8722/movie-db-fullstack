<template>
    <div v-if="moviesStore.isSearchingMovielist">

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
    <div v-else-if="moviesStore.listMovies?.results?.length"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <MoviesCard v-for="value in moviesStore.listMovies?.results ?? []" :key="value.id" :movie="value"
            class="cursor-pointer transition-transform duration-300 hover:scale-105"
            @click="onGoToMovieDetail(value.id)" />
    </div>

    <!-- Empty State -->
    <div v-else
        class="flex flex-col items-center justify-center py-28 px-8 text-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-black rounded-3xl shadow-xl border border-dashed border-gray-300 dark:border-gray-700">
        <!-- Animated Icon -->
        <div
            class="flex items-center justify-center w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 mb-8 animate-bounce">
            <UIcon name="i-lucide-clapperboard" class="w-12 h-12" />
        </div>

        <!-- Heading -->
        <h2 class="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            🎬 Ready to Discover Movies?
        </h2>

        <!-- Subtext -->
        <p class="mt-4 max-w-lg text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            It looks like there are no movies available right now. Don’t worry — grab
            some popcorn 🍿 and start exploring our collection of movies tailored just
            for you.
        </p>

        <!-- CTA -->
        <UButton color="primary" size="xl" icon="i-lucide-film"
            class="mt-8 px-8 py-3 font-semibold rounded-full shadow-lg hover:shadow-primary-500/30"
            @click="navigateTo('/movies')">
            Explore Movies
        </UButton>
    </div>
</template>

<script setup lang="ts">
const moviesStore = useMoviesStore();

function onGoToMovieDetail(id: number) {
    if (!id) return;
    navigateTo(`/movies/${id}`);
}
onMounted(moviesStore.getAllMovies);
</script>
