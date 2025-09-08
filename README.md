# 🎬 Nuxt 3 Movie Search App

A modern movie search and discovery application built with **Nuxt 3**, **Nuxt UI**, and **Tailwind CSS**.  
Users can explore trending movies, search by title/year/genre, and view movie details with a clean and responsive UI.

---

## 🚀 Features

- 🔍 Search movies by **title**, **release year**, and **genre**
- 🎥 Browse trending movies with beautiful movie cards
- 📱 Fully responsive design with **Nuxt UI** + **Tailwind CSS**
- ⚡ State management with **Pinia**
- 🌀 Loading states, skeletons, and empty states for better UX
- 🌙 Light/Dark mode support

---

## 🛠️ Setup

### 1. Clone the repository

```bash
git clone repo link
cd folder name
```

2. Install dependencies
   npm install

3. Configure environment variables

Create a .env file in the project root and add your API key (example using TMDB API):

NUXT_BASE_URL=value
NUXT_API_KEY=value
NUXT_ACCESS_TOKEN=value
NUXT_MOVIE_DB_ACCOUNT_ID=value
NUXT_SESSION_ID=value

4. Run the development server
   npm run dev

Your app will be available at http://localhost:3000

5. Build for production
   npm run build
   npm run preview

6. Run tests (if set up with Vitest or Jest)
   npm run test
