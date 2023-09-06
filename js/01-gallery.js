import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);
const instance = basicLightbox.create(`
    <div class="modal">
        <img src="" alt="Large image"/>
    </div>
`);

const createGalleryImage = (imgData) => {
  const { small, large, alt } = imgData;

  const container = document.createElement("div");
  container.classList.add("galleryitem");

  const link = document.createElement("a");
  link.classList.add("gallerylink");

  const img = document.createElement("img");
  img.classList.add("galleryimage");
  img.alt = alt;
  img.src = small;
  img.dataset.source = large;

  link.appendChild(img);
  container.appendChild(link);

  return container;
};

const images = Array.from({ length: galleryItems.length }, (_, i) => {
  const imgData = {
    small: galleryItems[i].preview,
    large: galleryItems[i].original,
    alt: galleryItems[i].description,
  };
  return createGalleryImage(imgData);
});

const gallery = document.querySelector("main.gallery");
gallery.append(...images);

gallery.addEventListener("click", (event) => {
  event.preventDefault();
  const clickedElement = event.target;

  if (clickedElement.nodeName !== "IMG") return;

  const alt = clickedElement.alt;
  const largeUrl = clickedElement.dataset.source;

  const modal = instance.element();
  const modalImg = modal.querySelector("img");
  modalImg.src = largeUrl;
  modalImg.alt = alt;

  modalImg.style.maxWidth = "80vw"; // Adjust as needed
  modalImg.style.maxHeight = "80vh"; // Adjust as needed

  instance.show();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && instance.visible()) {
    instance.close();
  }
});
