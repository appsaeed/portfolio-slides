//utils
import items from "./items";
import slideConfig from "./slideConfig";
import { later, loadLibCSS, loadStyles } from "./utilis";
later(1, loadLibCSS);
slideConfig();

const sliderMap = items.map((item) => {
  return `
  <div class="swiper-slide">
    <a href="${item.link}"  traget="_blank" >
      <div class="title">${item.name}</div>
    </a> 
    <img src="${item.image}" alt="${item.name}"/>
  </div>`;
});

//style functions to css string
const styleStrings = loadStyles();

const htmlString = `
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

//main selector
const selector = document.querySelector("#sa-portfolio-slider");
//instert string html to dom
selector!.innerHTML = `${styleStrings} ${htmlString}`;
