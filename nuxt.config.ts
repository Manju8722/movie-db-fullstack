import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || "https://api.themoviedb.org/3",
    },
    apiKey: process.env.API_KEY || "",
    accessToken: process.env.ACCESS_TOKEN || "",
    accountId: process.env.MOVIE_DB_ACCOUNT_ID || "",
    sessionId: process.env.SESSION_ID || "",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
