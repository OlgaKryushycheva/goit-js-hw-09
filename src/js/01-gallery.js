import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryEl = document.querySelector('.gallery');

const makeGalleryCard = ({
  preview,
  original,
  description,
}) => `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`;

const markup = galleryItems.map(el => makeGalleryCard(el)).join('');

galleryEl.innerHTML += markup;

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
