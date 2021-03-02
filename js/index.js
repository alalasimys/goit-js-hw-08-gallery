import gallery from "./data.js";

const galleryListRef = document.querySelector(".js-gallery");
const modalRef = document.querySelector(".js-lightbox");
const modalImgRef = document.querySelector(".lightbox__image");
const modalBtnCloseRef = document.querySelector(".lightbox__button");

const galleryMarkup = createGalleryMarkup(gallery);

galleryListRef.insertAdjacentHTML("afterbegin", galleryMarkup);

const listGalleryItemRef = document.querySelector(".gallery__item");

galleryListRef.addEventListener("click", onGalleryItemsClick);
modalRef.addEventListener("click", onModalOverlayCloseClick);
modalBtnCloseRef.addEventListener("click", onModalBtnCloseClick);
window.addEventListener("keyup", onModalCloseByEsc);
window.addEventListener("keyup", onKeyboardSliderClick);

function createGalleryMarkup(items) {
  return items
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
          alt="${description}"
        />
      </a>
    </li>`;
    })
    .join("");
}

function onGalleryItemsClick(event) {
  event.preventDefault();
  const isImgEl = event.target.classList.contains("gallery__image");
  if (!isImgEl) {
    return;
  }

  modalRef.classList.add("is-open");

  modalImgRef.src = event.target.dataset.source;
  modalImgRef.alt = event.target.alt;

  listGalleryItemRef.classList.add("active");
}

function onKeyboardSliderClick(event) {
  const activeListGalleryItemRef = document.querySelector(".active");

  if (event.key === "ArrowRight") {
    activeListGalleryItemRef.classList.remove("active");
    let activeEl = activeListGalleryItemRef.nextSibling;
    if (!activeEl) {
      activeEl = listGalleryItemRef;
    }
    activeEl.classList.add("active");
    const activeImgRef = activeEl.querySelector(".gallery__image");
    modalImgRef.src = activeImgRef.dataset.source;
  }

  if (event.key === "ArrowLeft") {
    activeListGalleryItemRef.classList.remove("active");
    let activeEl = activeListGalleryItemRef.previousSibling;
    if (!activeEl) {
      activeEl = galleryListRef.lastChild;
    }
    activeEl.classList.add("active");
    const activeImgRef = activeEl.querySelector(".gallery__image");
    modalImgRef.src = activeImgRef.dataset.source;
  }
}

function closeModalWindowFn() {
  modalRef.classList.remove("is-open");
  modalImgRef.src = "";
}

function onModalOverlayCloseClick(event) {
  if (event.target !== modalImgRef) {
    closeModalWindowFn();
  }
}

function onModalBtnCloseClick(event) {
  if (event.target === modalBtnCloseRef) {
    closeModalWindowFn();
  }
}

function onModalCloseByEsc(event) {
  if (event.key === "Escape") {
    closeModalWindowFn();
  }
}
