import gallery from "./data.js";

const galleryListRef = document.querySelector(".js-gallery");
const modalRef = document.querySelector(".js-lightbox");
const modalImgRef = document.querySelector(".lightbox__image");
const modalBtnCloseRef = document.querySelector(".lightbox__button");

const galleryMarkup = createGalleryMarkup(gallery);

galleryListRef.insertAdjacentHTML("afterbegin", galleryMarkup);

galleryListRef.addEventListener("click", onGalleryItemsClick);
modalRef.addEventListener("click", onModalOverlayCloseClick);
modalBtnCloseRef.addEventListener("click", onModalBtnCloseClick);
window.addEventListener("keyup", onModalCloseByEsc);

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
}

function onModalOverlayCloseClick(event) {
  if (event.target !== modalImgRef) {
    modalRef.classList.remove("is-open");
    modalImgRef.src = "";
  }
}

function onModalBtnCloseClick(event) {
  if (event.target === modalBtnCloseRef) {
    modalRef.classList.remove("is-open");
    modalImgRef.src = "";
  }
}

function onModalCloseByEsc(event) {
  if (event.key === "Escape") {
    modalRef.classList.remove("is-open");
    modalImgRef.src = "";
  }
}
