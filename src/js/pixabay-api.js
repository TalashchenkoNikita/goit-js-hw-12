import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

export function getImagesByQuery(query) {
  return axios
    .get('/api/', {
      params: {
        key: '50262492-fe39fd1e0043f380ecc767a24',
        q: `${query}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
      },
    })
    .then(response => {
      return response.data.hits;
    })
    .catch(error => {   
      console.log(error);
    });
}
