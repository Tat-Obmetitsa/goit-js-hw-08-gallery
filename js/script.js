import gallery from '../gallery-items.js';
const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImg = document.querySelector('.lightbox__image');
const closeBtn = document.querySelector('button[data-action="close-lightbox"]');
const overlayModal = document.querySelector('.lightbox__overlay');

const galleryMarkup = createGallery();
galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);

function createGallery(el, i) {
  i = 0;
  el = gallery
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
    
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index ="${(i += 1)}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');

  return el;
}
galleryRef.addEventListener('click', onImgClick);
function onImgClick(evt) {
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }
}

galleryRef.addEventListener('click', onModalClick);
closeBtn.addEventListener('click', onCloseModal);
overlayModal.addEventListener('click', closeOverlay);

function onModalClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  lightboxRef.classList.add('is-open');
  lightboxImg.src = evt.target.dataset.source;
  document.addEventListener('keydown', onCloseEsc);
}

function onCloseModal() {
  lightboxRef.classList.remove('is-open');
  lightboxImg.src = '';
}

function closeOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    onCloseModal();
  }
}
function onCloseEsc(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
