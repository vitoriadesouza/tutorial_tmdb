import { createRouter, createWebHistory } from 'vue-router';
import MovieDetailsView from '@/views/MovieDetailsView.vue';
import TvDetailsView from '@/views/TvDetailsView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/filmes',
    name: 'Movies',
    component: () => import('../views/MoviesView.vue'),
  },
  {
    path: '/tv',
    name: 'TV',
    component: () => import('../views/TvView.vue'),
  },
  {
    path: '/movie/:movieId',
    name: 'MovieDetails',
    component: MovieDetailsView, 
    props: true,
  },
  {
    path: '/tv/:tvId',
    name: 'tvDetails',
    component: TvDetailsView, 
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;