import * as pixabay from './js/pixabay-api.js';
import * as render from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadBtn = document.querySelector('.load-more');

const PICS_PER_PAGE = 15;

let page = 1;
let query = '';

form.addEventListener('submit', handleSearch);
loadBtn.addEventListener('click', handleLoadMore);

function handleSearch(e) {
  e.preventDefault();
  const formData = new FormData(form);
  query = formData.get('search-text').trim();
  if (!query) {
    return noImageAlert();
  }
  page = 1;
  render.clearGallery();
  render.hideLoadMoreButton();
  render.showLoader('.loader');

  setTimeout(async () => {
    try {
      const data = await pixabay.getImagesByQuery(query, page, PICS_PER_PAGE);
      if (data.hits.length === 0) {
        return noImageAlert();
      }
      render.createGallery(data.hits);
      checkEndOfResults(data.totalHits);
      page++;
    } catch (error) {
      iziToast.show({
        message: `Error: ${error}`,
        color: 'red',
        position: 'topRight',
      });
    } finally {
      render.hideLoader('.loader');
      form.reset();
    }
  }, 200);
}

function handleLoadMore() {
  render.hideLoadMoreButton();
  render.showLoader('.under-btn');

  setTimeout(async () => {
    try {
      const data = await pixabay.getImagesByQuery(query, page, PICS_PER_PAGE);
      render.createGallery(data.hits);
      smoothScroll();
      checkEndOfResults(data.totalHits);
      page++;
    } catch (error) {
      iziToast.show({
        message: `Error: ${error}`,
        color: 'red',
        position: 'topRight',
      });
    } finally {
      render.hideLoader('.under-btn');
    }
  }, 200);
}

function checkEndOfResults(totalHits) {
  if (page * PICS_PER_PAGE >= totalHits) {
    endOfSearchAlert();
  } else {
    render.showLoadMoreButton();
  }
}

function smoothScroll() {
  const { height } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

function endOfSearchAlert() {
  iziToast.show({
    message: `We're sorry, but you've reached the end of search results.`,
    color: 'blue',
    position: 'topRight',
  });
}

function noImageAlert() {
  iziToast.show({
    message: `Sorry, there are no images matching your search query. Please try again!`,
    color: 'red',
    position: 'topRight',
  });
}
