import * as pixabay from './js/pixabay-api.js';
import * as render from './js/render-functions.js';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadBtn = document.querySelector('.load-more');
let page = 1;
let request = null;
const PICS_PER_PAGE = 15;
const FIRST_PAGE = 1;

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  request = data.get('search-text');
  if (!request) {
    iziToast.show({
      message: `Sorry, there are no images matching your search query. 
        Please try again!`,
      color: 'red',
      position: 'topRight',
    });
    return;
  }
  page = FIRST_PAGE;
  render.clearGallery();
  render.hideLoadMoreButton();
  render.showLoader();
  pixabay
    .getImagesByQuery(request, page, PICS_PER_PAGE)
    .then(data => {
      if (data.hits.length === 0) {
        noImageAlert();
        return;
      }
      page++;
      render.createGallery(data.hits);
      console.log(data.totalHits - PICS_PER_PAGE);
      if(data.totalHits - PICS_PER_PAGE > 0) {
        render.showLoadMoreButton();
      } else {
        endOfSearchAlert();
      }
    })
    .catch(error => {
      iziToast.show({
        message: `Error: ${error}`,
        color: 'red',
        position: 'topRight',
      });
    })
    .finally(() => {
      render.hideLoader();
      form.reset();
    });
});

loadBtn.addEventListener('click', async e => {
  e.preventDefault();
  pixabay.getImagesByQuery(request, page, PICS_PER_PAGE).then(data => {
    if (data.hits.length === 0) {
      noImageAlert();
      return;
    }
    console.log(data.totalHits - (PICS_PER_PAGE*page));
    if(data.totalHits - (PICS_PER_PAGE*page) < 0) {
      render.hideLoadMoreButton();
      endOfSearchAlert();
    }
    render.createGallery(data.hits);
    page++;
  });
});

function endOfSearchAlert() {
  return iziToast.show({
        message: `We're sorry, but you've reached the end of search results.`,
        color: 'blue',
        position: 'topRight',
      });
}

function noImageAlert() {
  return iziToast.show({
        message: `Sorry, there are no images matching your search query. 
        Please try again!`,
        color: 'red',
        position: 'topRight',
      });
}
