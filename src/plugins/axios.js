import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzljMmI0ZDg1Y2Y0Mjk5ODgzZmM5NDRhYTM4MDczNSIsIm5iZiI6MTc1OTMyMzgxMS4zMDQ5OTk4LCJzdWIiOiI2OGRkMjZhMzcwMmFiNDc0OTBjNzczMWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hWv6JNLCWaLO0GD-yUXm_5HLQo_5ORPa0bRlJffNRVc`,
  },
});

export default api;