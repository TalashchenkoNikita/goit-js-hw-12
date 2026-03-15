import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const loadBtn = document.querySelector('.load-more');
const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

function itemTemplate(image) {
return `<li class="gallery-item">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}">
      </a>
      <ul class="stats">
        <li class="stats-item"><p class="stat-title">likes</p><p class="stat-value">${image.likes}</p></li>
        <li class="stats-item"><p class="stat-title">views</p><p class="stat-value">${image.views}</p></li>
        <li class="stats-item"><p class="stat-title">comments</p><p class="stat-value">${image.comments}</p></li>
        <li class="stats-item"><p class="stat-title">downloads</p><p class="stat-value">${image.downloads}</p></li>   
      </ul>
    </li>`;
}

export function clearGallery() {
    gallery.innerHTML = "";
}

export function showLoader(loaderClass) {
    const loader = document.querySelector(`${loaderClass}`);
    loader.style.display = 'block';
}

export function hideLoader(loaderClass) {
    const loader = document.querySelector(`${loaderClass}`);
    loader.style.display = 'none';
}

export function showLoadMoreButton() {
    loadBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
    loadBtn.classList.add('hidden');
}

export function createGallery(items) {
  gallery.insertAdjacentHTML("beforeend", items.map(itemTemplate).join(''));
  lightbox.refresh();
}