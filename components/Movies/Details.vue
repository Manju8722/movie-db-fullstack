<template>
    <div class="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
        <UCard class="max-w-6xl mx-auto overflow-hidden shadow-2xl rounded-2xl">
            <!-- Backdrop -->
            <div class="relative w-full h-72 md:h-96 bg-cover bg-center"
                :style="`background-image: url('https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}')`">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div class="absolute bottom-4 left-6 text-white space-y-2">
                    <h1 class="text-3xl md:text-5xl font-bold drop-shadow-md">{{ movie?.title }}</h1>
                    <p v-if="movie?.tagline" class="italic opacity-80">{{ movie.tagline }}</p>
                </div>
            </div>

            <!-- Content -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                <!-- Poster -->
                <div class="flex flex-col items-center md:items-start gap-4">
                    <img v-if="movie?.poster_path" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
                        alt="Poster" class="rounded-xl shadow-lg w-72" />

                    <!-- Account Actions -->
                    <div class="flex gap-3">
                        <!-- Favorite -->
                        <UTooltip text="Add to Favorites">
                            <UButton color="red" variant="ghost" size="lg"
                                :icon="movie?.account_states?.favorite ? 'i-lucide-heart' : 'i-lucide-heart-off'"
                                :class="movie?.account_states?.favorite ? 'text-red-500' : ''"
                                @click="$emit('toggleFavorite')" />
                        </UTooltip>

                        <!-- Watchlist -->
                        <UTooltip text="Add to Watchlist">
                            <UButton color="blue" variant="ghost" size="lg"
                                :icon="movie?.account_states?.watchlist ? 'i-lucide-bookmark-check' : 'i-lucide-bookmark-plus'"
                                :class="movie?.account_states?.watchlist ? 'text-blue-500' : ''"
                                @click="toggleWatchlist" />
                        </UTooltip>

                        <!-- Rated -->
                        <UTooltip :text="movie?.account_states?.rated ? 'Rated' : 'Rate this movie'">
                            <UButton color="yellow" variant="ghost" size="lg" icon="i-lucide-star"
                                :class="movie?.account_states?.rated ? 'text-yellow-400' : ''" @click="rateMovie" />
                        </UTooltip>
                    </div>
                </div>

                <!-- Info -->
                <div class="md:col-span-2 space-y-6">
                    <p class="text-lg leading-relaxed">{{ movie?.overview }}</p>

                    <!-- Movie Meta -->
                    <div class="grid grid-cols-2 gap-y-2 gap-x-6 text-sm md:text-base">
                        <div><span class="font-semibold">Release Date:</span> {{ movie?.release_date }}</div>
                        <div><span class="font-semibold">Runtime:</span> {{ movie?.runtime }} mins</div>
                        <div><span class="font-semibold">Status:</span> {{ movie?.status }}</div>
                        <div><span class="font-semibold">Language:</span> {{ movie?.original_language?.toUpperCase() }}
                        </div>
                        <div><span class="font-semibold">Country:</span> {{ movie?.origin_country?.join(", ") }}</div>
                        <div><span class="font-semibold">Budget:</span> ${{ movie?.budget.toLocaleString() }}</div>
                        <div><span class="font-semibold">Revenue:</span> ${{ movie?.revenue?.toLocaleString() }}</div>
                    </div>

                    <!-- Genres -->
                    <div class="flex flex-wrap gap-2 mt-4">
                        <UBadge v-for="g in movie?.genres" :key="g.id" color="primary" variant="solid" class="text-sm">
                            {{ g.name }}
                        </UBadge>
                    </div>

                    <!-- Rating -->
                    <div class="mt-6 flex items-center gap-2">
                        <UIcon name="i-lucide-star" class="text-yellow-400 w-6 h-6" />
                        <span class="font-bold text-lg">{{ movie?.vote_average.toFixed(1) }}/10</span>
                        <span class="opacity-70">({{ movie?.vote_count }} votes)</span>
                    </div>

                    <!-- Links -->
                    <div class="mt-6 flex gap-4">
                        <UButton v-if="movie?.homepage" color="primary" variant="solid" target="_blank"
                            :href="movie.homepage">
                            Official Website
                        </UButton>
                        <UButton v-if="movie?.imdb_id" color="yellow" variant="outline" target="_blank"
                            :href="`https://www.imdb.com/title/${movie.imdb_id}`">
                            IMDb
                        </UButton>
                    </div>
                </div>
            </div>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import type { MovieDetails } from '#imports'

const props = defineProps<{
    movie: MovieDetails
}>()
const movieStore = useMoviesStore()


const toggleWatchlist = async () => {
    console.log("Toggle watchlist for:", props.movie.id)

}

const rateMovie = async () => {
    console.log("Rate movie:", props.movie.id)
}
</script>
