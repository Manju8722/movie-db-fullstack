import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_BASE_URL || "https://api.themoviedb.org/3",
    },
    apiKey: process.env.NUXT_API_KEY || "",
    accessToken: process.env.NUXT_ACCESS_TOKEN || "",
    accountId: process.env.NUXT_MOVIE_DB_ACCOUNT_ID || "",
    sessionId: process.env.NUXT_SESSION_ID || "",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
