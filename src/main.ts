import Swiper from "swiper/bundle";
//images
import image_asc from "./images/asc.png";
import image_ftools from "./images/ftools.png";
import image_harvardedit from "./images/harvardedit.png";
import image_static from "./images/static-home.png";
import image_portal from "./images/the247openhouse.png";

//utils
import { loadCSS, loadStyles } from "./utilis";

loadCSS();
loadStyles();

const items = [
  {
    name: "Harvardedit",
    image: image_harvardedit,
    link: "https://harvardedit.com",
  },
  {
    name: "Portal dashboard (twilio, signalwire)",
    image: image_portal,
    link: "https://portal.the247openhouse.com",
  },
  {
    name: "FTools",
    image: image_ftools,
    link: "https://appsaeed.github.io/ftools/image-to-text",
  },
  {
    name: "AI Content Creator",
    image: image_asc,
    link: "https://appsaeed.github.io/asc/",
  },
  {
    name: "Static website",
    image: image_static,
    link: "https://appsaeed.github.io/static",
  },
];

const sliderMap = items.map((item) => {
  return `
  <div class="swiper-slide">
    <a href="${item.link}"  traget="_blank" >
      <div class="title">${item.name}</div>
    </a> 
    <img src="${item.image}" alt="${item.name}"/>
  </div>`;
});
document.querySelector<HTMLDivElement>("#sa-portfolio-slider")!.innerHTML = `
<!-- Slider main container -->
<div class="swiper">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
    ${sliderMap}
  </div>
  <!-- If we need navigation buttons -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>

  <div class="swiper-pagination"></div>

</div>
`;

document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".swiper", {
    // Optional parameters
    // direction: "vertical",
    speed: 400,
    spaceBetween: 100,
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    //..pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});
