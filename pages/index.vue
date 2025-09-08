<!-- <script setup lang="ts">
definePageMeta({
    middleware: () => {
        return navigateTo("/movies", { replace: true })
    },
})
</script>

<template>
    <div></div>
</template> -->

<template>
    <div class="w-full bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <UCard class="max-w-4xl mx-auto p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
            <!-- Header -->
            <div class="text-center mb-8">
                <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                    🎬 Movie Search
                </h1>
                <p class="mt-2 text-gray-600 dark:text-gray-400">
                    Search movies by title, release year, or genre. Fill at least one field to continue.
                </p>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Title -->
                    <UFormField label="Movie Title" description="Enter the full or partial movie title"
                        :error="errors.title">
                        <UInput v-model="form.title" placeholder="e.g. Inception" size="lg" icon="i-lucide-film" />
                    </UFormField>

                    <!-- Year -->
                    <UFormField label="Release Year" description="Enter a valid year (1900–2099)" :error="errors.year">
                        <UInput v-model="form.year" type="number" min="1900" max="2099" placeholder="e.g. 2010"
                            size="lg" icon="i-lucide-calendar" />
                    </UFormField>

                    <!-- Genre -->
                    <UFormField label="Genre" description="Choose a genre from the list" :error="errors.genre">
                        <USelectMenu :value-key="'value'" v-model="form.genre" :items="genres" option-attribute="label"
                            value-attribute="value" placeholder="Select Genre" size="lg" icon="i-lucide-tag" />
                    </UFormField>
                </div>

                <!-- General error -->
                <p v-if="errors.general" class="text-red-500 text-sm font-medium text-center">
                    {{ errors.general }}
                </p>

                <!-- Actions -->
                <div class="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <UButton type="submit" color="primary" size="lg" icon="i-lucide-search" class="flex-1 sm:flex-none">
                        Search
                    </UButton>
                    <UButton type="button" color="gray" variant="outline" size="lg" @click="resetForm"
                        class="flex-1 sm:flex-none">
                        Reset
                    </UButton>
                </div>
            </form>
        </UCard>

        <!-- Movie Results Section -->
        <div v-if="isSearching" class="max-w-6xl mx-auto mt-16">
            <div v-if="moviesStore.isSearchingSearchedMovie">

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
            <template v-else-if="moviesStore.searchedMovie?.results?.length">

                <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
                    🎥 Search Results
                </h2>

                <!-- Results -->
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    <MoviesCard v-for="value in moviesStore.searchedMovie?.results ?? []" :key="value.id" :movie="value"
                        class="cursor-pointer transition-transform duration-300 hover:scale-105"
                        @click="onGoToMovieDetail(value.id)" />
                </div>

            </template>
            <!-- Empty State -->
            <div v-else
                class="flex flex-col items-center justify-center py-24 px-6 text-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-black rounded-3xl shadow-xl border border-dashed border-gray-300 dark:border-gray-700">
                <!-- Icon -->
                <div
                    class="flex items-center justify-center w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 mb-8 animate-pulse">
                    <UIcon name="i-lucide-search-x" class="w-12 h-12" />
                </div>

                <!-- Heading -->
                <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    No Movies Found 🔍
                </h3>

                <!-- Subtext -->
                <p class="mt-4 max-w-lg text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                    We couldn’t find any movies matching your search. Try adjusting your filters,
                    double-check the title, or explore by year and genre.
                </p>

                <!-- CTA -->
                <UButton color="primary" size="lg" icon="i-lucide-film"
                    class="mt-8 px-8 py-3 font-semibold rounded-full shadow-lg hover:shadow-primary-500/30"
                    @click="resetForm">
                    🔄 Start a New Search
                </UButton>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
const moviesStore = useMoviesStore()
const form = ref({
    title: '',
    year: '',
    genre: ''
})
const isSearching = ref(false)

const errors = ref({
    title: '',
    year: '',
    genre: '',
    general: ''
})

const genres = [
    { label: 'Action', value: 'action' },
    { label: 'Comedy', value: 'comedy' },
    { label: 'Drama', value: 'drama' },
    { label: 'Thriller', value: 'thriller' },
    { label: 'Sci-Fi', value: 'sci-fi' }
]

// Reset form
function resetForm() {
    isSearching.value = false
    form.value = { title: '', year: '', genre: '' }
    errors.value = { title: '', year: '', genre: '', general: '' }
}

// Validate and submit
async function handleSubmit() {
    errors.value = { title: '', year: '', genre: '', general: '' }

    if (!form.value.title && !form.value.year && !form.value.genre) {
        errors.value.general = '⚠️ Please fill at least one field before searching.'
        return
    }

    if (form.value.year && (Number(form.value.year) < 1900 || Number(form.value.year) > 2099)) {
        errors.value.year = 'Year must be between 1900 and 2099.'
        return
    }

    try {
        isSearching.value = true
        await moviesStore.searchMovie(form.value.title, form.value.year, form.value.genre)
    } catch (error) {
        console.log("🚀 ~ handleSubmit ~ error:", error)

    }
}


function onGoToMovieDetail(id: number) {
    if (!id) return;
    navigateTo(`/movies/${id}`);
}
</script>
