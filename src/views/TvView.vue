<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay'
import { useGenreStore } from '@/stores/genre';

const isLoading = ref(false);

const getGenreName = (id) => {
  return genreStore.genres.find((genre) => genre.id === id)?.name || 'Desconhecido';
};

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

const genreStore = useGenreStore();

const tv = ref([]);

const listTv = async (genreId) => {
  isLoading.value = true;
  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  });
  tv.value = response.data.results
  isLoading.value = false;
  
};

onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('tv');
  isLoading.value = false;
});
</script>

<template>
  <h1>Programas de TV</h1>
  <ul class="genre-list">
  <li
  v-for="genre in genreStore.genres"
  :key="genre.id"
  @click="listTv(genre.id)"
  class="genre-item"
>
  {{ genre.name }}
</li>
  </ul>
  <loading v-model:active="isLoading" is-full-page />
  <div class="tv-list">
    <div v-for="show in tv" :key="show.id" class="tv-card">
      <img :src="`https://image.tmdb.org/t/p/w500${show.poster_path}`" :alt="show.original_name">
       <div class="tv-details">
      <p class="tv-title">{{ show.original_name }}</p>
      <p class="tv-release-date">{{ formatDate(show.first_air_date) }}</p>
      <p class="tv-genres">
        <span
    v-for="genre_id in show.genre_ids"
    :key="genre_id"
    @click="listTv(genre_id)"
  >
    {{ getGenreName(genre_id) }}
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

.tv-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.tv-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
  background-color: #1a1a1a;
  color: white;
  transition: 0.3s;
}

.tv-card:hover {
  transform: scale(1.03);
  box-shadow: 0 0 1rem #387250;
}

.tv-card img {
  width: 100%;
  height: 20rem;
  object-fit: cover;
}

.tv-details {
  padding: 0.5rem;
  text-align: center;
}

.tv-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}

.tv-release-date {
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 0.3rem;
}

.tv-genres {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.3rem;
}

.tv-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  transition: 0.2s;
}

.tv-genres span:hover {
  cursor: pointer;
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}

.active {
  background-color: #67b086;
  font-weight: bolder;
}

.tv-genres span.active {
  background-color: #abc322;
  color: #000;
  font-weight: bolder;
}
</style>