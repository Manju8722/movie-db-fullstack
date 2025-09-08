<template>

    <!-- Full-page loading state -->
    <div v-if="movieStore.isSearchingMovieByMovieId && !movieByIdResponse"
        class="flex flex-col items-center justify-center min-h-[70vh] text-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-black rounded-2xl shadow-inner">
        <!-- Spinner -->
        <div class="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-6"></div>

        <!-- Loading text -->
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Fetching Movie Details 🎬
        </h2>
        <p class="mt-3 text-gray-600 dark:text-gray-400">
            Hang tight! We’re loading the movie information for you...
        </p>
    </div>
    <MoviesDetails v-else-if="movieByIdResponse" @toggleFavorite="toggleFavorite" :movie="movieByIdResponse" />

    <!-- Empty State -->
    <div v-else
        class="flex flex-col items-center justify-center min-h-[70vh] text-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-black rounded-2xl shadow-inner border border-dashed border-gray-300 dark:border-gray-700">
        <!-- Icon -->
        <div
            class="flex items-center justify-center w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-6">
            <UIcon name="i-lucide-film-off" class="w-12 h-12" />
        </div>

        <!-- Text -->
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Movie Not Found 🚫
        </h2>
        <p class="mt-3 max-w-md text-gray-600 dark:text-gray-400 text-lg">
            We couldn’t find the movie you’re looking for. It might have been removed or doesn’t exist.
        </p>

        <!-- CTA -->
        <UButton color="primary" size="lg" icon="i-lucide-arrow-left"
            class="mt-6 px-6 py-3 rounded-full shadow-lg hover:shadow-primary-500/30" @click="navigateTo('/movies')">
            Back to Movies
        </UButton>
    </div>

</template>
<script setup lang="ts">
definePageMeta({
    validate: (route) => {
        route.params.id = String(route.params.id || '');
        return Boolean(route.params.id && !isNaN(Number(route.params.id)) && Number(route.params.id) > 0);
    }
})

const route = useRoute();
const movieByIdResponse = ref<MovieDetails | null>(null);
const toggleFavorite = async () => {
    if (!movieByIdResponse.value) return
    try {
        await movieStore.favMovieByMediaId(movieByIdResponse.value?.id, !movieByIdResponse.value?.account_states?.favorite)
        movieByIdResponse.value.account_states = {
            ...movieByIdResponse.value.account_states,
            favorite: !movieByIdResponse.value?.account_states?.favorite
        }
    } catch (error) {
        console.error("Error toggling favorite:", error)
    }
}
const movieStore = useMoviesStore();
onMounted(async () => {
    if (route.params.id) {
        const response = await movieStore.getMovieById(Number(route.params.id));
        console.log("🚀 ~ response:", response)
        if (response !== undefined) movieByIdResponse.value = response;
    }
})
</script>