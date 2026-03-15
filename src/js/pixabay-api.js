import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';
const PICS_PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
  const { data } = await axios.get('/api/', {
    params: {
      key: '50262492-fe39fd1e0043f380ecc767a24',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: PICS_PER_PAGE,
      page: page,
    },
  });

  return data;
}