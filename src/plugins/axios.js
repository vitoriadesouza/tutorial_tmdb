import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZWRmMzZiZDMzYzE4ZGY5MWY5YzI5Yzg2MjU2NWFhMCIsIm5iZiI6MTc2MDQ1MDgwOS42NDgsInN1YiI6IjY4ZWU1OGY5ZmNhYzA5YmU4NWEyMWM0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.trr1c3skDY4SPvDN8f4oVzNLJFo4U0XDpFEXBPNTeFo',
  },
});

export default api;
