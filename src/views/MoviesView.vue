<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import Loading from 'vue-loading-overlay'
import { useGenreStore } from '@/stores/genre'
import { useRouter } from 'vue-router'

const router = useRouter()
const genreStore = useGenreStore()

const isLoading = ref(false)
const movies = ref([])


function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } })
}


const listMovies = async (genreId) => {
  genreStore.setCurrentGenreId(genreId)
  isLoading.value = true

  const response = await api.get('discover/movie', {
    params: {
      with_genres: genreId,
      language: 'pt-BR',
    },
  })

  movies.value = response.data.results
  isLoading.value = false
}


const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')


const isActiveGenre = (genre_id) => {
  return genre_id === genreStore.currentGenreId
}


onMounted(async () => {
  isLoading.value = true
  await genreStore.getAllGenres('movie')
  isLoading.value = false
})
</script>

<template>
  <h1>Filmes</h1>

  
  <ul class="genre-list">
    <li
      v-for="genre in genreStore.genres"
      :key="genre.id"
      @click="listMovies(genre.id)"
      class="genre-item"
      :class="{ active: genre.id === genreStore.currentGenreId }"
    >
      {{ genre.name }}
    </li>
  </ul>

  
  <loading v-model:active="isLoading" is-full-page />

  
  <div class="movie-list">
    <div v-for="movie in movies" :key="movie.id" class="movie-card">
      <img
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        :alt="movie.title"
        @click="openMovie(movie.id)"
      />
      <div class="movie-details">
        <p class="movie-title">{{ movie.title }}</p>
        <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
        <p class="movie-genres">
          <span
            v-for="genre_id in movie.genre_ids"
            :key="genre_id"
            @click="listMovies(genre_id)"
            :class="{ active: isActiveGenre(genre_id) }"
          >
            {{ genreStore.getGenreName(genre_id) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  margin-bottom: 2rem;
}

.genre-item {
  background-color: #387250;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
  transition: 0.2s;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #4e9e5f;
  box-shadow: 0 0 0.5rem #387250;
  transform: scale(1.05);
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.movie-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
  background-color: #1a1a1a;
  color: white;
  transition: 0.3s;
}

.movie-card:hover {
  transform: scale(1.03);
  box-shadow: 0 0 1rem #387250;
}

.movie-card img {
  width: 100%;
  height: 20rem;
  object-fit: cover;
}

.movie-details {
  padding: 0.5rem;
  text-align: center;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}

.movie-release-date {
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 0.3rem;
}

.movie-genres {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.3rem;
}

.movie-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  transition: 0.2s;
}

.movie-genres span:hover {
  cursor: pointer;
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}

.active {
  background-color: #67b086;
  font-weight: bolder;
}

.movie-genres span.active {
  background-color: #abc322;
  color: #000;
  font-weight: bolder;
}
</style>