<template>
    <MoviesDetails @toggleFavorite="toggleFavorite" :movie="movieByIdResponse" v-if="movieByIdResponse" />
    <div v-else>
        Loading...
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
        if (response !== undefined) movieByIdResponse.value = response;
    }
})
</script>