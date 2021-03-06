import gallery from '../gallery-items.js';
const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImg = document.querySelector('.lightbox__image');
const closeBtn = document.querySelector('button[data-action="close-lightbox"]');
const overlayModal = document.querySelector('.lightbox__overlay');

const galleryMarkup = createGallery();
galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);
let currentImgIndex;
function createGallery(el) {
  el = gallery
    .map(({ preview, original, description }, index) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
    
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index="${(index)}"
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
  currentImgIndex = Number(evt.target.getAttribute('data-index'));
  window.addEventListener('keydown', onCloseEsc);
  window.addEventListener('keydown', onRightBtn);
  window.addEventListener('keydown', onLeftBtn);
}

function onCloseModal() {
  lightboxRef.classList.remove('is-open');
  lightboxImg.src = '';
  window.removeEventListener('keydown', onCloseEsc);
  window.removeEventListener('keydown', onRightBtn);
  window.removeEventListener('keydown', onLeftBtn);
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
function onRightBtn (evt) {
  if (evt.code === 'ArrowRight') {
    currentImgIndex += 1;
    if (currentImgIndex === gallery.length) {
      currentImgIndex = 0;
    }
  }
lightboxImg.src = gallery[currentImgIndex].original;
}

function onLeftBtn (evt) {
  if (evt.code === 'ArrowLeft') {
    currentImgIndex -= 1;
    if (currentImgIndex === -1) {
      currentImgIndex = gallery.length - 1;
    }
  }
  lightboxImg.src = gallery[currentImgIndex].original;
}