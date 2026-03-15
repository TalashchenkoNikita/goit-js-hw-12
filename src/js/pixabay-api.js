import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

export function getImagesByQuery(query, page, perPage) {
  return axios
    .get('/api/', {
      params: {
        key: '50262492-fe39fd1e0043f380ecc767a24',
        q: `${query}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: `${perPage}`,
        page: `${page}`,
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {   
      console.log(error);
    });
}
