import Swiper from "swiper/bundle";
export default function slideConfig(selector = ".swiper") {
  document.addEventListener("DOMContentLoaded", () => {
    new Swiper(selector, {
      // Optional parameters
      // direction: "vertical",
      autoplay: true,
      speed: 300,
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
}
