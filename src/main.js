import * as pixabay from './js/pixabay-api.js';
import * as render from './js/render-functions.js';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  const request = data.get('search-text');
  if(!request){
    iziToast.show({
        message: `Sorry, there are no images matching your search query. 
        Please try again!`,
        color: "red",
        position:"topRight"
      });
      return;
  }
  render.clearGallery();
  render.showLoader();
  pixabay.getImagesByQuery(request).then(images => {
    if (images.length === 0) {
      iziToast.show({
        message: `Sorry, there are no images matching your search query. 
        Please try again!`,
        color: "red",
        position:"topRight"
      });
      return;
    }
    render.createGallery(images);
  }).catch(error => {   
      iziToast.show({
        message: `Error: ${error}`,
        color: "red",
        position:"topRight"
      })
  }).finally(() => {
      render.hideLoader();
  });
  form.reset();
});
